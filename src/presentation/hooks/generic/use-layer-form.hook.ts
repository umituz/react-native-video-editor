/**
 * Generic Layer Form Hook
 * Type-safe form management for layer editors
 * Eliminates code duplication across layer form hooks
 */

import { useState, useCallback } from "react";
import type { Layer } from "../../domain/entities/video-project.types";

/**
 * Form field validator function type
 */
export type ValidatorFn<T> = (value: T[keyof T]) => string | null;

/**
 * Layer form configuration
 */
export interface UseLayerFormConfig<T extends Record<string, unknown>> {
  initialValues: Partial<T>;
  validators?: Partial<Record<keyof T, ValidatorFn<T>>>;
  buildData: (formState: T) => Partial<Layer>;
}

/**
 * Layer form return type
 */
export interface UseLayerFormReturn<T extends Record<string, unknown>> {
  formState: T;
  updateField: <K extends keyof T>(field: K, value: T[K]) => void;
  setFormState: (state: T | ((prev: T) => T)) => void;
  buildLayerData: () => Partial<Layer>;
  isValid: boolean;
  errors: Partial<Record<keyof T, string | null>>;
  validateField: <K extends keyof T>(field: K) => string | null;
  validateAll: () => boolean;
}

/**
 * Generic hook for managing layer form state
 * Provides type-safe form management with validation support
 */
export function useLayerForm<T extends Record<string, unknown>>(
  config: UseLayerFormConfig<T>,
): UseLayerFormReturn<T> {
  const { initialValues, validators = {}, buildData } = config;

  const [formState, setFormState] = useState<T>(
    initialValues as T,
  );

  const [errors, setErrors] = useState<Partial<Record<keyof T, string | null>>>(
    {},
  );

  const updateField = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error for this field
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: null,
        }));
      }
    },
    [errors],
  );

  const validateField = useCallback(
    <K extends keyof T>(field: K): string | null => {
      const validator = validators[field];
      if (!validator) return null;

      const error = validator(formState[field]);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));

      return error;
    },
    [formState, validators],
  );

  const validateAll = useCallback((): boolean => {
    let hasError = false;
    const newErrors: Partial<Record<keyof T, string | null>> = {};

    for (const field in validators) {
      const error = validators[field]!(formState[field]);
      if (error) {
        newErrors[field] = error;
        hasError = true;
      }
    }

    setErrors(newErrors);
    return !hasError;
  }, [formState, validators]);

  const buildLayerData = useCallback((): Partial<Layer> => {
    return buildData(formState);
  }, [formState, buildData]);

  const isValid = Object.values(errors).every((error) => error === null);

  return {
    formState,
    updateField,
    setFormState,
    buildLayerData,
    isValid,
    errors,
    validateField,
    validateAll,
  };
}
