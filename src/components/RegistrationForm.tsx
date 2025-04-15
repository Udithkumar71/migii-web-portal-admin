
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "./Loader";
import { createWorker, sendOtp } from "@/lib/mockApi";

const registrationFormSchema = z.object({
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

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const skillOptions = [
  "Carpentry", "Masonry", "Plumbing", "Electrical", "Painting", 
  "Welding", "Farming", "Gardening", "Driving", "Cooking", 
  "Cleaning", "Tailoring", "Security", "Construction", "Factory Work"
];

const RegistrationForm = () => {
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
      // For demo purposes, we're just creating a local URL
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
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
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = () => {
    // In a real app, we would verify with the backend
    if (otp === "123456") {
      return true;
    }
    toast.error("Invalid OTP. For demo, use 123456");
    return false;
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (values: RegistrationFormValues) => {
    if (step === 2 && !photoUrl) {
      toast.error("Please upload your photo");
      return;
    }

    if (step === 3 && !verifyOtp()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (step === 3) {
        // Final submission
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
        // Navigate to success page or show success modal
        navigate(`/registration-success?id=${worker.uniqueId}`);
      } else {
        // Go to next step
        nextStep();
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md animate-scale-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Worker Registration</h2>
      
      {/* Step indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex flex-col items-center ${
              s === step ? "text-migii-primary" : s < step ? "text-green-500" : "text-gray-300"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                s === step
                  ? "bg-migii-primary text-white"
                  : s < step
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {s < step ? "✓" : s}
            </div>
            <span className="text-xs">
              {s === 1 ? "Personal Info" : s === 2 ? "Photo & ID" : "Verification"}
            </span>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="10-digit mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="originState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State of Origin</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="skill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Skill</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your skill" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {skillOptions.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aadhaar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhaar Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="XXXX-XXXX-XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Your Photo</FormLabel>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-500 text-sm text-center">No photo uploaded</span>
                    )}
                  </div>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="max-w-xs"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Please upload a recent photo
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Registration Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Name:</div>
                  <div>{form.getValues("name")}</div>
                  <div className="text-gray-600">Age:</div>
                  <div>{form.getValues("age")}</div>
                  <div className="text-gray-600">Phone:</div>
                  <div>{form.getValues("phone")}</div>
                  <div className="text-gray-600">State:</div>
                  <div>{form.getValues("originState")}</div>
                  <div className="text-gray-600">Skill:</div>
                  <div>{form.getValues("skill")}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <FormLabel>Phone Verification</FormLabel>
                  {!otpSent && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleSendOtp}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader size="sm" /> : "Send OTP"}
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={!otpSent}
                  maxLength={6}
                />
                <p className="text-xs text-gray-500">
                  {otpSent
                    ? "OTP sent to your phone. For demo use: 123456"
                    : "Click 'Send OTP' to receive a verification code"}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader size="sm" />
              ) : step === 3 ? (
                "Complete Registration"
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
