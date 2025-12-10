import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" // Adjust the path as needed
import { Label } from "../ui/label";

// Define the shape of the options you will pass
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean; // Added optional disable flag for individual options
}

// Define the props for the reusable SelectField component
interface SelectFieldProps {
  label: string;
  name: string; // Used for form handling
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  
  // --- New Props for Enhancement ---
  error?: string; // Prop to display an error message
  disabled?: boolean; // Prop to disable the entire select field
  // --- End New Props ---
  
  // Include onChange handler for controlled component usage if needed
  // onChange?: (value: string) => void;
}

export function SelectField({
  label,
  name,
  options,
  defaultValue,
  placeholder = `Select a ${label}`,
  error,
  disabled = false, // Default to not disabled
}: SelectFieldProps) {

  // Determine the trigger class based on error state
  const triggerClass = `w-full ${error ? 'border-red-500 focus:ring-red-500' : ''}`;
  return (
    <div className="space-y-2">
      {/* Label with dynamic class for error state */}
      <Label 
        htmlFor={name} 
        // className={`block text-sm font-medium ${error ? 'text-red-600' : 'text-gray-700'}`}
      >
        {label}
      </Label>
      
      <Select
        defaultValue={defaultValue}
        name={name}
        disabled={disabled} // Apply disabled state
        // onValueChange={onChange}
      >
        <SelectTrigger className={triggerClass}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        
        <SelectContent>
          <SelectGroup>
            {/* The SelectLabel provides context for the group */}
            <SelectLabel>{label} Options</SelectLabel>
            
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value} 
                disabled={option.disabled} // Apply disabled state to specific items
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      {/* Error Message Display */}
      {error && (
        <p className="text-sm font-medium text-red-500">
          {error}
        </p>
      )}
      
    </div>
  )
}