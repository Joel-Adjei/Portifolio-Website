import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, setIsAdmin } = useAdminStore();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // If already admin, redirect to dashboard
    if (isAdmin) {
      navigate("/admin/dashboard");
      return;
    }

    // Restore an existing Supabase session on reload
    api.getMe().then((response) => {
      if (!response.error) {
        setIsAdmin(true);
        navigate("/admin/dashboard");
      }
    });
  }, [isAdmin, navigate, setIsAdmin]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter a valid email address")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const response = await api.login(values.email, values.password);
        if (response.error) {
          toast({
            title: "Error",
            description: response.error,
            variant: "destructive",
          });
        } else {
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
      } finally {
        setSubmitting(false);
      }
    },
  });

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
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={formik.touched.email && !!formik.errors.email}
                className={
                  formik.touched.email && formik.errors.email
                    ? "border-destructive"
                    : undefined
                }
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-destructive">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={
                    formik.touched.password && !!formik.errors.password
                  }
                  className={`pr-10 ${
                    formik.touched.password && formik.errors.password
                      ? "border-destructive"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-destructive">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
