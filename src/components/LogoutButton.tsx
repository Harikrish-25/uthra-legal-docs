import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const LogoutButton = () => {
  const { logout, user } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        Welcome, <span className="font-medium text-foreground">{user?.username}</span>
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={logout}
        className="flex items-center gap-2 hover:bg-destructive hover:text-white transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;