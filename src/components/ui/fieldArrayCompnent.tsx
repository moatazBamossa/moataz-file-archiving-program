import { FC } from "react";
import { FieldArray } from "react-final-form-arrays";
import { Label } from "./label";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./button";
import { InputField } from "./InputField";
interface IFieldArrayCompnentProps {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  errorMessage: string;
}

export const FieldArrayCompnent: FC<IFieldArrayCompnentProps> = (props) => {
  const { name, placeholder, required, label, errorMessage } = props;
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <div className="space-y-4">
          {fields.map((name, index) => (
            <div key={name} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`${name}.text`}>
                  {label} {index + 1}
                </Label>
                {(fields.length ?? 0) > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => fields.remove(index)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <InputField
                placeholder={placeholder}
                name={`${name}.text`}
                required={required}
                errorMessage={errorMessage}
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => fields.push({ text: "" })}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            إضافة {label} جديد
          </Button>
        </div>
      )}
    </FieldArray>
  );
};
