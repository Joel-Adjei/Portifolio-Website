import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HiPaperAirplane, HiMail, HiPhone, HiSparkles } from "react-icons/hi";
import { toast } from "sonner";
import { useSendMessage } from "@/hooks/queries";
import { useFormik } from "formik";
import * as yup from "yup";

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ isOpen, onOpenChange }: ContactModalProps) => {
  const { mutateAsync } = useSendMessage();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      subject: "",
      email: "",
      message: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
      subject: yup.string().required("Subject is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      message: yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await mutateAsync(values);
        toast.success("Message sent successfully! I'll get back to you soon.");
        onOpenChange(false);
      } catch (error) {
        toast.error("Failed to send message. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[970px] p-0 overflow-hidden border-none bg-background/80 backdrop-blur-xl shadow-2xl">
        <div className="relative">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />

          <div className="grid md:grid-cols-[270px_1fr]">
            {/* Sidebar info */}
            <div className="bg-primary/5 p-8 flex-col justify-between border-r border-border/50 hidden md:flex">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <HiSparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 hero-text">Let's Talk</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Have a project in mind? Let's create something extraordinary
                  together.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <HiMail className="h-4 w-4 text-primary" />
                  <span className="truncate">joeladjei01@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <HiPhone className="h-4 w-4 text-primary" />
                  <span>+233 531 547-562</span>
                </div>
              </div>
            </div>

            {/* Form content */}
            <div className="p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold hero-text">
                  Send a Message
                </DialogTitle>
                <DialogDescription>
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-xs uppercase tracking-wider font-semibold text-muted-foreground"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Joel"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      className="bg-secondary/50 border-border/50 focus:border-primary/50 smooth-transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-xs uppercase tracking-wider font-semibold text-muted-foreground"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Adjei"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      className="bg-secondary/50 border-border/50 focus:border-primary/50 smooth-transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs uppercase tracking-wider font-semibold text-muted-foreground"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="bg-secondary/50 border-border/50 focus:border-primary/50 smooth-transition"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="text-xs uppercase tracking-wider font-semibold text-muted-foreground"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="How can I help you?"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className="bg-secondary/50 border-border/50 focus:border-primary/50 smooth-transition"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-xs uppercase tracking-wider font-semibold text-muted-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    rows={4}
                    className="bg-secondary/50 border-border/50 focus:border-primary/50 smooth-transition resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full h-12 mt-4 glow-effect group overflow-hidden relative"
                >
                  <span
                    className={`flex items-center justify-center transition-all duration-300 ${formik.isSubmitting ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"}`}
                  >
                    Send Message
                    <HiPaperAirplane className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  {formik.isSubmitting && (
                    <span className="absolute inset-0 flex items-center justify-center animate-in fade-in slide-in-from-bottom-2">
                      Sending...
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
