import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Shield, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const UserManagement = () => {
  const { user, getAllUsers } = useAuth();
  const [showUsers, setShowUsers] = useState(false);

  // Only show to admin users
  if (!user || user.role !== 'admin') {
    return null;
  }

  const users = getAllUsers();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Management
          </CardTitle>
          <p className="text-muted-foreground">View all registered users</p>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-muted-foreground">
              Total Users: <span className="font-semibold text-foreground">{users.length}</span>
            </div>
            <Button
              onClick={() => setShowUsers(!showUsers)}
              variant="outline"
            >
              {showUsers ? 'Hide Users' : 'Show Users'}
            </Button>
          </div>

          {showUsers && (
            <div className="space-y-3">
              {users.map((userData) => (
                <div
                  key={userData.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      userData.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {userData.role === 'admin' ? (
                        <Shield className="w-5 h-5" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{userData.username}</div>
                      <div className="text-sm text-muted-foreground capitalize">{userData.role}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(userData.createdAt)}
                    </div>
                    <div className="text-xs text-muted-foreground">Created</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;