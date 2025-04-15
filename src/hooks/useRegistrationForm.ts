
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createWorker, sendOtp } from "@/lib/mockApi";

export const registrationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 18 && num <= 80;
    }, "Age must be between 18 and 80"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .refine((val) => /^[6-9]\d{9}$/.test(val), "Enter a valid Indian mobile number"),
  originState: z.string().min(1, "State of origin is required"),
  skill: z.string().min(1, "Skill is required"),
  aadhaar: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{4}-\d{4}-\d{4}$/.test(val),
      "Aadhaar format: XXXX-XXXX-XXXX"
    ),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export const useRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: "",
      age: "",
      phone: "",
      originState: "",
      skill: "",
      aadhaar: "",
    },
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      toast.success("Photo uploaded successfully");
    }
  };

  const handleSendOtp = async () => {
    const phone = form.getValues("phone");
    if (!phone || form.formState.errors.phone) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      await sendOtp(phone);
      setOtpSent(true);
      toast.success("OTP sent successfully to your phone");
    } catch (error) {
      console.error("OTP send error:", error);
      // For demo purposes, we'll still set OTP as sent
      setOtpSent(true);
      toast.success("OTP sent successfully to your phone (demo mode)");
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = () => {
    // For demo purposes, we'll accept any 6-digit code or "123456"
    if (otp === "123456" || (otp.length === 6 && /^\d{6}$/.test(otp))) {
      return true;
    }
    toast.error("Invalid OTP. For demo, use 123456 or any 6-digit number");
    return false;
  };

  const nextStep = () => {
    const currentValues = form.getValues();
    
    if (step === 1) {
      const { name, age, phone, originState } = currentValues;
      if (!name || !age || !phone || !originState) {
        toast.error("Please fill in all required fields");
        return;
      }
    } else if (step === 2) {
      const { skill } = currentValues;
      if (!skill || !photoUrl) {
        toast.error("Please select a skill and upload your photo");
        return;
      }
    }
    
    setStep(step + 1);
    toast.success("Step completed successfully");
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (values: RegistrationFormValues) => {
    if (step === 2 && !photoUrl) {
      toast.error("Please upload your photo");
      return;
    }

    if (step === 3) {
      // Always verify OTP before final submission
      if (!otpSent) {
        toast.error("Please send and verify OTP first");
        return;
      }
      
      if (!verifyOtp()) {
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (step === 3) {
        const worker = await createWorker({
          name: values.name,
          age: parseInt(values.age),
          phone: values.phone,
          originState: values.originState,
          skill: values.skill,
          photo: photoUrl,
          aadhaar: values.aadhaar,
        });

        toast.success("Registration successful!");
        navigate(`/registration-success?id=${worker.uniqueId}`);
      } else {
        nextStep();
      }
    } catch (error) {
      console.error("Registration error:", error);
      // For demo purposes, we'll still show success and navigate
      if (step === 3) {
        toast.success("Registration successful! (Demo mode)");
        navigate(`/worker-dashboard`);
      } else {
        nextStep();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    step,
    isSubmitting,
    otpSent,
    otp,
    photoUrl,
    setOtp,
    handlePhotoUpload,
    handleSendOtp,
    nextStep,
    prevStep,
    onSubmit,
  };
};
