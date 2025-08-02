import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, User, Lock, Camera, Upload, Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface DocumentActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  documentName: string;
  actionType: 'scan' | 'upload';
  onActionComplete: () => void;
}

const DocumentActionModal = ({ 
  isOpen, 
  onClose, 
  serviceName, 
  documentName, 
  actionType,
  onActionComplete 
}: DocumentActionModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'auth' | 'action'>('auth');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [successMessage, setSuccessMessage] = useState('');
  const { user, login, register, isAuthenticated } = useAuth();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Check if user is already authenticated
  useState(() => {
    if (isAuthenticated) {
      setStep('action');
    }
  });

  if (!isOpen) return null;

  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setSuccessMessage('');
    try {
      const success = await login(data.username, data.password);
      if (success) {
        setStep('action');
        loginForm.reset();
      } else {
        loginForm.setError("root", {
          message: "Invalid username or password",
        });
      }
    } catch (error) {
      loginForm.setError("root", {
        message: "Login failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setSuccessMessage('');
    try {
      const result = await register(data.username, data.password, data.confirmPassword);
      if (result.success) {
        setSuccessMessage(result.message);
        registerForm.reset();
        // Auto switch to login after successful registration
        setTimeout(() => {
          setAuthMode('login');
          setSuccessMessage('');
        }, 2000);
      } else {
        registerForm.setError("root", {
          message: result.message,
        });
      }
    } catch (error) {
      registerForm.setError("root", {
        message: "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = () => {
    if (actionType === 'scan') {
      handleScan();
    } else {
      handleUpload();
    }
  };

  const handleScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      
      setTimeout(() => {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        
        alert(`✅ Document scanned successfully!\n\nService: ${serviceName}\nDocument: ${documentName}\nUser: ${user?.username}`);
        onActionComplete();
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Camera error:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,application/pdf';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        alert(`✅ Document uploaded successfully!\n\nFile: ${file.name}\nService: ${serviceName}\nDocument: ${documentName}\nUser: ${user?.username}`);
        onActionComplete();
        onClose();
      }
    };
    input.click();
  };

  const handleClose = () => {
    setStep('auth');
    setAuthMode('login');
    setSuccessMessage('');
    loginForm.reset();
    registerForm.reset();
    onClose();
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setSuccessMessage('');
    loginForm.clearErrors();
    registerForm.clearErrors();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        {step === 'auth' && !isAuthenticated && (
          <>
            <CardHeader className="text-center pb-6 relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="absolute right-2 top-2 p-2"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <CardTitle className="text-xl font-bold text-foreground">
                {authMode === 'login' ? 'Login Required' : 'Create Account'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {authMode === 'login' 
                  ? `Please login to ${actionType} documents` 
                  : 'Create your account to continue'
                }
              </p>
              <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                <p className="text-xs font-medium text-foreground">Action Details:</p>
                <p className="text-xs text-muted-foreground">Service: {serviceName}</p>
                <p className="text-xs text-muted-foreground">Document: {documentName}</p>
                <p className="text-xs text-muted-foreground">Action: {actionType === 'scan' ? 'Scan Document' : 'Upload Document'}</p>
              </div>
            </CardHeader>

            <CardContent>
              {/* Success Message */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 text-center">{successMessage}</p>
                </div>
              )}

              {/* Login Form */}
              {authMode === 'login' && (
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username" className="text-sm font-medium">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-username"
                        type="text"
                        placeholder="Enter username"
                        className="pl-10 h-11"
                        {...loginForm.register("username")}
                      />
                    </div>
                    {loginForm.formState.errors.username && (
                      <p className="text-xs text-destructive">{loginForm.formState.errors.username.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="pl-10 pr-10 h-11"
                        {...loginForm.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-xs text-destructive">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  {loginForm.formState.errors.root && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-xs text-destructive text-center">{loginForm.formState.errors.root.message}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login & Continue"}
                  </Button>
                </form>
              )}

              {/* Register Form */}
              {authMode === 'register' && (
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username" className="text-sm font-medium">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="Choose a username"
                        className="pl-10 h-11"
                        {...registerForm.register("username")}
                      />
                    </div>
                    {registerForm.formState.errors.username && (
                      <p className="text-xs text-destructive">{registerForm.formState.errors.username.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 h-11"
                        {...registerForm.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {registerForm.formState.errors.password && (
                      <p className="text-xs text-destructive">{registerForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 h-11"
                        {...registerForm.register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {registerForm.formState.errors.confirmPassword && (
                      <p className="text-xs text-destructive">{registerForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>

                  {registerForm.formState.errors.root && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-xs text-destructive text-center">{registerForm.formState.errors.root.message}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              )}

              {/* Switch Auth Mode */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={switchAuthMode}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  {authMode === 'login' 
                    ? "Don't have an account? Create one" 
                    : "Already have an account? Login"
                  }
                </button>
              </div>

              {/* Demo Credentials - only show in login mode
              {authMode === 'login' && (
                <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center mb-1">Demo Admin:</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Username: <code className="bg-muted px-1 rounded">admin</code></span>
                    <span className="text-muted-foreground">Password: <code className="bg-muted px-1 rounded">admin123</code></span>
                  </div>
                </div>
              )} */}
            </CardContent>
          </>
        )}

        {(step === 'action' || isAuthenticated) && (
          <>
            <CardHeader className="text-center pb-6 relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="absolute right-2 top-2 p-2"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <CardTitle className="text-xl font-bold text-foreground">
                {actionType === 'scan' ? 'Scan Document' : 'Upload Document'}
              </CardTitle>
              <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                <p className="text-sm font-medium text-foreground">Document Details:</p>
                <p className="text-sm text-muted-foreground">Service: {serviceName}</p>
                <p className="text-sm text-muted-foreground">Document: {documentName}</p>
                <p className="text-sm text-muted-foreground">User: {user?.username}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button
                onClick={handleAction}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium flex items-center justify-center gap-3"
              >
                {actionType === 'scan' ? (
                  <>
                    <Camera className="w-5 h-5" />
                    Start Camera & Scan
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Choose File & Upload
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                {actionType === 'scan' 
                  ? 'Camera will open to scan your document' 
                  : 'File picker will open to select document'
                }
              </p>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default DocumentActionModal;