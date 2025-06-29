// components/form/FormWrapper.tsx

import React from "react";
import { FieldValues, useForm, Path } from "react-hook-form";
import { FieldConfig } from "../../types/FieldConfig";
import Input from "../ui/Input";
import Button from "../ui/Button";

type FormWrapperProps<T extends FieldValues> = {
  fields: FieldConfig<T>[];
  onSubmit: (data: T) => void;
};

const FormWrapper = <T extends FieldValues>({
  fields,
  onSubmit,
}: FormWrapperProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md w-full"
    >
      {fields.map((field) => {
        const { name, type, label, required, validation, options } = field;

        // Label component with optional asterisk
        const renderLabel = () => (
          <label className="font-medium text-sm">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        );

        // Dropdown (select)
        if (type === "select" && options) {
          return (
            <div key={String(name)} className="flex flex-col gap-1">
              {renderLabel()}
              <select
                {...register(name as Path<T>, {
                  required: required ? "Bu alan zorunludur" : false,
                  pattern: validation,
                  minLength:
                    required && field.minLength
                      ? {
                          value: field.minLength,
                          message: `${label} en az ${field.minLength} karakter olmalıdır.`,
                        }
                      : undefined,
                })}
                className="border rounded px-3 py-2"
              >
                <option value="">Seçiniz</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors[name as keyof T] && (
                <p className="text-red-500 text-xs">
                  {(errors[name as keyof T] as any).message}
                </p>
              )}
            </div>
          );
        }

        // Checkbox
        if (type === "checkbox") {
          return (
            <div key={String(name)} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={String(name)}
                {...register(name as Path<T>)}
                className="h-4 w-4"
              />
              <label htmlFor={String(name)} className="text-sm font-medium">
                {label}
              </label>
            </div>
          );
        }

        // Diğer inputlar
        return (
          <div key={String(name)} className="flex flex-col gap-1">
            {renderLabel()}
            <Input
              type={type}
              error={(errors[name as keyof T] as any)?.message}
              {...register(name as Path<T>, {
                required: required ? "Bu alan zorunludur" : false,
                pattern: validation,
                minLength:
                  required && field.minLength
                    ? {
                        value: field.minLength,
                        message: `${label} en az ${field.minLength} karakter olmalıdır.`,
                      }
                    : undefined,
              })}
            />
          </div>
        );
      })}

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormWrapper;
