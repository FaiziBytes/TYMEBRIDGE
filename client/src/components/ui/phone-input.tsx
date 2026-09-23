import * as React from "react";
import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";

export interface PhoneInputProps {
  value?: string | undefined;
  onChange?: (value: string | undefined) => void;
  defaultCountry?: "AE" | "US" | "GB" | string;
  international?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  "data-testid"?: string;
}

const PhoneInput = React.forwardRef<
  React.ElementRef<typeof PhoneInputWithCountry>,
  PhoneInputProps
>(({ className, defaultCountry = "AE", onChange, ...props }, ref) => {
  return (
    <div className={cn(
      "phone-input-wrapper relative flex items-center w-full rounded-md border border-input bg-background text-base ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className
    )}>
      <PhoneInputWithCountry
        ref={ref}
        className="phone-input-inner w-full"
        defaultCountry={defaultCountry as any}
        onChange={onChange as any}
        {...props}
      />
    </div>
  );
});

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };

