
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianStates } from "@/constants/formOptions";
import { type UseFormReturn } from "react-hook-form";
import { type RegistrationFormValues } from "@/hooks/useRegistrationForm";

interface PersonalInfoStepProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export const PersonalInfoStep = ({ form }: PersonalInfoStepProps) => {
  return (
    <>
      <Form.FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <Form.FormItem>
            <Form.FormLabel>Full Name</Form.FormLabel>
            <Form.FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </Form.FormControl>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />

      <Form.FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <Form.FormItem>
            <Form.FormLabel>Age</Form.FormLabel>
            <Form.FormControl>
              <Input type="number" placeholder="Enter your age" {...field} />
            </Form.FormControl>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />

      <Form.FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <Form.FormItem>
            <Form.FormLabel>Phone Number</Form.FormLabel>
            <Form.FormControl>
              <Input placeholder="10-digit mobile number" {...field} />
            </Form.FormControl>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />

      <Form.FormField
        control={form.control}
        name="originState"
        render={({ field }) => (
          <Form.FormItem>
            <Form.FormLabel>State of Origin</Form.FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <Form.FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
              </Form.FormControl>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />
    </>
  );
};
