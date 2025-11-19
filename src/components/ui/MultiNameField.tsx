import { FC, useState } from "react";
import { Field, useForm } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { Plus, Trash2, Users, Eye } from "lucide-react";

interface MultiNameFieldProps {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  errorMessage?: string;
}

export const MultiNameField: FC<MultiNameFieldProps> = ({
  name,
  label,
  placeholder,
  required = true,
  errorMessage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const form = useForm();
  const fieldArrayName = `${name}_array`;

  // Get current field values
  const formValues = form.getState().values || {};
  const fieldValue = formValues[name];
  const arrayValue = formValues[fieldArrayName] || [];
  const hasMultipleNames = Array.isArray(arrayValue) && arrayValue.length > 0;

  const handleSaveNames = () => {
    // Combine all names into a single string
    const names = arrayValue
      .filter((item: any) => item?.text?.trim())
      .map((item: any) => item.text.trim())
      .join(", ");

    form.change(name, names);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    // Initialize array from current value if exists
    if (fieldValue && (!arrayValue || arrayValue.length === 0)) {
      const names = fieldValue
        .split(",")
        .map((n: string) => ({ text: n.trim() }));
      form.change(fieldArrayName, names);
    } else if (!arrayValue || arrayValue.length === 0) {
      form.change(fieldArrayName, [{ text: "" }]);
    }
    setIsModalOpen(true);
  };

  const handleViewNames = () => {
    if (fieldValue && (!arrayValue || arrayValue.length === 0)) {
      const names = fieldValue
        .split(",")
        .map((n: string) => ({ text: n.trim() }));
      form.change(fieldArrayName, names);
    }
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive mr-1">*</span>}
      </Label>

      <div className="flex gap-2">
        <Field
          name={name}
          validate={
            required ? (value) => (value ? undefined : errorMessage) : undefined
          }
        >
          {({ input, meta }) => (
            <div className="flex-1 space-y-1">
              <Input
                {...input}
                id={name}
                placeholder={placeholder}
                className={
                  meta.error && meta.touched ? "border-destructive" : ""
                }
              />
              {meta.error && meta.touched && (
                <p className="text-sm text-destructive">
                  {errorMessage || meta.error}
                </p>
              )}
            </div>
          )}
        </Field>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleOpenModal}
          title="إضافة أسماء متعددة"
        >
          <Users className="h-4 w-4" />
        </Button>

        {hasMultipleNames && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleViewNames}
            title="عرض الأسماء"
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>إدارة {label}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <FieldArray name={fieldArrayName}>
              {({ fields }) => (
                <div className="space-y-4">
                  {fields.map((fieldName, index) => (
                    <div key={fieldName} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${fieldName}.text`}>
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
                      <Field name={`${fieldName}.text`}>
                        {({ input }) => (
                          <Input {...input} placeholder={`أدخل اسم ${label}`} />
                        )}
                      </Field>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fields.push({ text: "" })}
                    className="w-full"
                  >
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة {label} جديد
                  </Button>
                </div>
              )}
            </FieldArray>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              إلغاء
            </Button>
            <Button type="button" onClick={handleSaveNames}>
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>عرض وتعديل {label}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <FieldArray name={fieldArrayName}>
              {({ fields }) => (
                <div className="space-y-4">
                  {fields.map((fieldName, index) => (
                    <div key={fieldName} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${fieldName}.text`}>
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
                      <Field name={`${fieldName}.text`}>
                        {({ input }) => (
                          <Input {...input} placeholder={`أدخل اسم ${label}`} />
                        )}
                      </Field>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fields.push({ text: "" })}
                    className="w-full"
                  >
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة {label} جديد
                  </Button>
                </div>
              )}
            </FieldArray>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsViewModalOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              type="button"
              onClick={() => {
                handleSaveNames();
                setIsViewModalOpen(false);
              }}
            >
              حفظ التعديلات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
