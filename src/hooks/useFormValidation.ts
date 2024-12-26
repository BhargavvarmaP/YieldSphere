import { useState, useCallback } from 'react';

type ValidationRule<T> = (value: T) => string | undefined;

interface ValidationRules<T> {
  [key: string]: ValidationRule<T>;
}

interface UseFormValidationResult<T> {
  values: { [K in keyof T]: T[K] };
  errors: { [K in keyof T]?: string };
  touched: { [K in keyof T]: boolean };
  handleChange: (name: keyof T, value: T[keyof T]) => void;
  handleBlur: (name: keyof T) => void;
  setFieldValue: (name: keyof T, value: T[keyof T]) => void;
  setFieldTouched: (name: keyof T, touched?: boolean) => void;
  resetForm: () => void;
  isValid: boolean;
  isDirty: boolean;
}

export const useFormValidation = <T extends object>(
  initialValues: T,
  validationRules: ValidationRules<T[keyof T]>
): UseFormValidationResult<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});
  const [touched, setTouched] = useState<{ [K in keyof T]: boolean }>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = false;
      return acc;
    }, {} as { [K in keyof T]: boolean })
  );

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]): string | undefined => {
      const validateRule = validationRules[name as string];
      return validateRule ? validateRule(value) : undefined;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, values[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField, values]
  );

  const setFieldValue = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      handleChange(name, value);
    },
    [handleChange]
  );

  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched(
      Object.keys(initialValues).reduce((acc, key) => {
        acc[key as keyof T] = false;
        return acc;
      }, {} as { [K in keyof T]: boolean })
    );
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;
  const isDirty = Object.values(touched).some(Boolean);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    resetForm,
    isValid,
    isDirty,
  };
};
