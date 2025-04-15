
import { Form } from "@/components/ui/form";
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
      <Form.FormField
        control={form.control}
        name="skill"
        render={({ field }) => (
          <Form.FormItem>
            <Form.FormLabel>Primary Skill</Form.FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <Form.FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your skill" />
                </SelectTrigger>
              </Form.FormControl>
              <SelectContent>
                {skillOptions.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />

      <Form.FormField
        control={form.control}
        name="aadhaar"
        render={({ field }) => (
          <Form.FormItem>
            <Form.FormLabel>Aadhaar Number (Optional)</Form.FormLabel>
            <Form.FormControl>
              <Input placeholder="XXXX-XXXX-XXXX" {...field} />
            </Form.FormControl>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />

      <div className="space-y-2">
        <Form.FormLabel>Your Photo</Form.FormLabel>
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
