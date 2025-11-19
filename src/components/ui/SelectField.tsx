import { FC, ReactNode } from "react";
import { Label } from "./label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { Field } from "react-final-form";

type SelectFieldProps = {
  label?: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  children: ReactNode;
};

export const SelectField: FC<SelectFieldProps> = ({
  label,
  name,
  placeholder = "اختر...",
  errorMessage,
  required = true,
  children,
}) => {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className="space-y-2">
          {label && (
            <Label htmlFor={name}>
              {label} {required && <span className="text-destructive">*</span>}
            </Label>
          )}
          <Select value={input.value} onValueChange={input.onChange}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>{children}</SelectContent>
          </Select>
          {meta.error && meta.touched && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}
        </div>
      )}
    </Field>
  );
};
