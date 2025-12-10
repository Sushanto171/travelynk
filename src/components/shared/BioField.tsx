"use client"
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface BioFieldProps {
  defaultValue?: string;
  maxLength?: number;
  name: string;
}

export function BioField({ defaultValue = "", maxLength = 255, name }: BioFieldProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <Field>
      <FieldLabel htmlFor={name}>Bio</FieldLabel>

      <div className="relative">
        <Textarea
          id={name}
          name={name}
          maxLength={maxLength}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-12"
          placeholder="Write something about yourself..."
        />

        <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
          {value?.length || 0}/{maxLength}
        </span>
      </div>
    </Field>
  );
}
