
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/Loader";
import { type UseFormReturn } from "react-hook-form";
import { type RegistrationFormValues } from "@/hooks/useRegistrationForm";

interface VerificationStepProps {
  form: UseFormReturn<RegistrationFormValues>;
  otp: string;
  otpSent: boolean;
  isSubmitting: boolean;
  onOtpChange: (value: string) => void;
  onSendOtp: () => void;
}

export const VerificationStep = ({
  form,
  otp,
  otpSent,
  isSubmitting,
  onOtpChange,
  onSendOtp,
}: VerificationStepProps) => {
  const FormLabel = Form.FormLabel;
  const values = form.getValues();

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Registration Summary</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-600">Name:</div>
          <div>{values.name}</div>
          <div className="text-gray-600">Age:</div>
          <div>{values.age}</div>
          <div className="text-gray-600">Phone:</div>
          <div>{values.phone}</div>
          <div className="text-gray-600">State:</div>
          <div>{values.originState}</div>
          <div className="text-gray-600">Skill:</div>
          <div>{values.skill}</div>
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
              onClick={onSendOtp}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader size="sm" /> : "Send OTP"}
            </Button>
          )}
        </div>
        <Input
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => onOtpChange(e.target.value)}
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
  );
};
