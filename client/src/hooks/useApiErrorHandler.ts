import { useCallback } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  getApiErrorMessage,
  getApiFieldErrors,
  isExpectedRefusal,
} from "@/lib/apiError";

interface HandleOptions<T extends FieldValues> {
  /** Toast title shown when the error can't be mapped onto form fields. */
  title?: string;
  setError?: UseFormSetError<T>;
  /** Restricts which server `field` names may be written into the form. */
  fields?: ReadonlyArray<Path<T>>;
}

/**
 * Single place that turns an ApiError into UX: server field errors land on
 * the matching inputs via `setError`; anything else becomes a toast.
 */
export function useApiErrorHandler() {
  const { toast } = useToast();

  return useCallback(
    <T extends FieldValues>(error: unknown, options?: HandleOptions<T>) => {
      let appliedToForm = false;

      if (options?.setError) {
        for (const fieldError of getApiFieldErrors(error)) {
          const name = fieldError.field as Path<T> | undefined;
          if (!name) continue;
          if (options.fields && !options.fields.includes(name)) continue;
          options.setError(name, {
            type: "server",
            message: fieldError.message,
          });
          appliedToForm = true;
        }
      }

      if (appliedToForm) return;

      // A rule the server applied is an answer, not a crash: show what it said
      // instead of burying it under "Something went wrong".
      if (isExpectedRefusal(error)) {
        toast({ title: getApiErrorMessage(error) });
        return;
      }

      toast({
        variant: "destructive",
        title: options?.title,
        description: getApiErrorMessage(error),
      });
    },
    [toast]
  );
}
