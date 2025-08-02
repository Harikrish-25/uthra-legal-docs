import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Menu, X, Phone, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 relative">
        <div className="flex items-center justify-between h-12 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-secondary rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
              <span className="text-xs sm:text-base lg:text-lg font-bold text-foreground leading-tight">Uthra</span>
              <span className="text-xs sm:text-base lg:text-lg font-bold text-foreground leading-tight">Job Centre</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Contact
            </button>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white mr-4"
              onClick={() => window.location.href = 'tel:+919790272078'}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            
            {/* User Status */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{user?.username}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-xs"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Login required for document actions
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-4">
                  <button 
                    onClick={() => {
                      scrollToSection('about');
                      setIsMenuOpen(false);
                    }}
                    className="text-left py-2 px-3 text-foreground hover:text-primary hover:bg-primary-light rounded-lg transition-colors duration-200 font-medium"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('services');
                      setIsMenuOpen(false);
                    }}
                    className="text-left py-2 px-3 text-foreground hover:text-primary hover:bg-primary-light rounded-lg transition-colors duration-200 font-medium"
                  >
                    Services
                  </button>
                  <button 
                    onClick={() => {
                      scrollToSection('contact');
                      setIsMenuOpen(false);
                    }}
                    className="text-left py-2 px-3 text-foreground hover:text-primary hover:bg-primary-light rounded-lg transition-colors duration-200 font-medium"
                  >
                    Contact
                  </button>
                  <Button 
                    className="mt-2 w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-2"
                    onClick={() => {
                      scrollToSection('contact');
                      setIsMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                  
                  {/* Mobile User Status */}
                  {isAuthenticated ? (
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-primary">{user?.username}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={logout}
                          className="text-xs"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t text-center">
                      <p className="text-xs text-muted-foreground">
                        Login required for document actions
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;