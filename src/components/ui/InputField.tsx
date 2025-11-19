import { FC } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Field } from "react-final-form";

type InputFieldProps = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  errorMessage?: string;
};

// Validator function for required fields
const requiredValidator = (value: any) => {
  return value ? undefined : "This field is required";
};

export const InputField: FC<InputFieldProps> = ({
  label,
  name,
  placeholder = "",
  type = "text",
  required = true,
  errorMessage,
}) => {
  return (
    <Field validate={required ? requiredValidator : undefined} name={name}>
      {({ input, meta }) => {
        return (
          <div className="space-y-2">
            {label && (
              <Label htmlFor={name}>
                {label}
                {required && <span className="text-destructive">*</span>}
              </Label>
            )}
            <Input {...input} id={name} type={type} placeholder={placeholder} />
            {meta.error && meta.touched && (
              <p className="text-sm text-destructive">
                {errorMessage || meta.error}
              </p>
            )}
          </div>
        );
      }}
    </Field>
  );
};
