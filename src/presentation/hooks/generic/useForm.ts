/**
 * Generic Form Hook
 * Replaces: useImageLayerForm, useTextLayerForm, useShapeLayerForm, useAudioLayerForm, useAnimationLayerForm
 */

import { useState, useCallback, useMemo } from "react";

export interface FormValidator<T = unknown> {
  required?: boolean;
  validate?: (value: T) => string | undefined;
}

export interface FormConfig<T extends Record<string, unknown>> {
  initialValues: T;
  validators?: Partial<Record<keyof T, FormValidator>>;
  onSubmit: (values: T) => void | Promise<void>;
}

export interface FormReturn<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setError: <K extends keyof T>(field: K, error: string | undefined) => void;
  setTouched: <K extends keyof T>(field: K, touched: boolean) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

export function useForm<T extends Record<string, unknown>>({ initialValues, validators = {}, onSubmit }: FormConfig<T>): FormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(<K extends keyof T>(field: K, value: T[K]): string | undefined => {
    const validator = validators[field];
    if (!validator) return undefined;
    if (validator.required && (value === undefined || value === null || value === "")) return "This field is required";
    if (validator.validate) return validator.validate(value);
    return undefined;
  }, [validators]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;
    (Object.keys(validators) as Array<keyof T>).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) { newErrors[field] = error; isValid = false; }
    });
    setErrors(newErrors);
    return isValid;
  }, [validators, values, validateField]);

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  }, [touched, validateField]);

  const setError = useCallback(<K extends keyof T>(field: K, error: string | undefined) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const setFieldTouched = useCallback(<K extends keyof T>(field: K, touchedValue: boolean) => {
    setTouched((prev) => ({ ...prev, [field]: touchedValue }));
    if (touchedValue) {
      const error = validateField(field, values[field]);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  }, [values, validateField]);

  const isValid = useMemo(() => Object.keys(validators).every((field) => !errors[field as keyof T]), [errors, validators]);

  const handleSubmit = useCallback(async () => {
    const allTouched = Object.keys(validators).reduce((acc, field) => ({ ...acc, [field]: true }), {} as Partial<Record<keyof T, boolean>>);
    setTouched(allTouched);
    const valid = validateForm();
    if (!valid) return;
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validators, onSubmit, validateForm]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, isValid, isSubmitting, setValue, setError, setTouched: setFieldTouched, handleSubmit, resetForm };
}
