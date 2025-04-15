
import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { StepIndicator } from "./registration/StepIndicator";
import { PersonalInfoStep } from "./registration/PersonalInfoStep";
import { PhotoAndSkillStep } from "./registration/PhotoAndSkillStep";
import { VerificationStep } from "./registration/VerificationStep";

const RegistrationForm = () => {
  const {
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
  } = useRegistrationForm();

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md animate-scale-in">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Worker Registration</h2>
      
      <StepIndicator currentStep={step} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && <PersonalInfoStep form={form} />}
          
          {step === 2 && (
            <PhotoAndSkillStep 
              form={form} 
              photoUrl={photoUrl} 
              onPhotoUpload={handlePhotoUpload} 
            />
          )}

          {step === 3 && (
            <VerificationStep
              form={form}
              otp={otp}
              otpSent={otpSent}
              isSubmitting={isSubmitting}
              onOtpChange={setOtp}
              onSendOtp={handleSendOtp}
            />
          )}

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep} disabled={isSubmitting}>
                {isSubmitting ? <Loader size="sm" /> : "Continue"}
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting || !otpSent}>
                {isSubmitting ? <Loader size="sm" /> : "Complete Registration"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
