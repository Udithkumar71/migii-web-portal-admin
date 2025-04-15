
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "./Loader";
import { loginWithOtp, sendOtp, verifyWorkerExists } from "@/lib/mockApi";

const phoneRegex = /^[6-9]\d{9}$/;

const loginFormSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .refine((val) => phoneRegex.test(val), "Enter a valid Indian mobile number"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleSendOtp = async () => {
    const { phone } = form.getValues();
    if (!phone || !phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      // First check if the worker exists
      const exists = await verifyWorkerExists(phone);
      if (!exists) {
        toast.error("No worker found with this phone number. Please register first.");
        setIsSubmitting(false);
        return;
      }

      // If worker exists, send OTP
      await sendOtp(phone);
      setOtpSent(true);
      toast.success("OTP sent successfully to your phone");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    const { phone } = form.getValues();
    
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await loginWithOtp(phone, otp);
      if (result.success) {
        toast.success("Login successful!");
        // In a real app, we would set auth tokens here
        navigate("/worker-dashboard");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md animate-scale-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Worker Login</h2>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="10-digit mobile number" {...field} disabled={otpSent} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!otpSent ? (
            <Button
              type="button"
              className="w-full"
              onClick={handleSendOtp}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader size="sm" className="mr-2" /> : null}
              Send OTP
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <FormLabel>Enter OTP</FormLabel>
                <Input
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
                <p className="text-xs text-gray-500">
                  For demo purposes, use OTP: 123456
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOtpSent(false)}
                  disabled={isSubmitting}
                >
                  Change Number
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handleVerifyOtp}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader size="sm" className="mr-2" /> : null}
                  Login
                </Button>
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => navigate("/register")}
            >
              Register here
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
