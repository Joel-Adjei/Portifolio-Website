import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAdminStore } from "@/stores/adminStore";
import { api } from "@/lib/api";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, setIsAdmin } = useAdminStore();

  useEffect(() => {
    // If already admin, redirect to dashboard
    if (isAdmin) {
      navigate("/admin/dashboard");
      return;
    }

    // Check if token exists and is valid
    const token = localStorage.getItem("adminToken");
    if (token) {
      api.getMe().then((response) => {
        if (!response.error) {
          setIsAdmin(true);
          navigate("/admin/dashboard");
        }
      });
    }
  }, [isAdmin, navigate, setIsAdmin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.login(email, password);
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else {
        localStorage.setItem("adminToken", response.data!.token);
        setIsAdmin(true);
        toast({
          title: "Success",
          description: "Signed in successfully!",
        });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Sign In</CardTitle>
          <CardDescription>
            Enter your admin email and password to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
