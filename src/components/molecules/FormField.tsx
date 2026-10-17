import type { ReactNode } from "react";
import { FieldError, Label } from "@/components/atoms/Field";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  /** Receives aria props to spread onto the control. */
  children: (aria: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => ReactNode;
};

export function FormField({ id, label, error, children }: FormFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}
