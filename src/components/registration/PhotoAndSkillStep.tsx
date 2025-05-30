
import React from "react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { skillOptions } from "@/constants/formOptions";
import { type UseFormReturn } from "react-hook-form";
import { type RegistrationFormValues } from "@/hooks/useRegistrationForm";

interface PhotoAndSkillStepProps {
  form: UseFormReturn<RegistrationFormValues>;
  photoUrl: string;
  onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PhotoAndSkillStep = ({ form, photoUrl, onPhotoUpload }: PhotoAndSkillStepProps) => {
  return (
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
              onChange={onPhotoUpload}
              className="max-w-xs"
            />
            <p className="text-xs text-gray-500 mt-1">
              Please upload a recent photo
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
