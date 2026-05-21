import { useCallback, useState } from "react";
import { Alert } from "react-native";
import useFormValidation from "./useFormValidation";

export default function useForm({ initialValues, fields, validate, onSubmit }) {
  const [form, setForm] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { credentialsInvalid, resetError, setError } =
    useFormValidation(fields);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    const str = typeof value === "string" ? value : String(value ?? "");
    if (str.trim()) resetError(field);
  }

  const handleSubmit = useCallback(async () => {
    const invalidFields = validate(form);

    if (invalidFields.length > 0) {
      invalidFields.forEach(setError);
      Alert.alert("Incomplete", "Please fill in all fields correctly.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(form);
    } catch (err) {
      Alert.alert("Failed", String(err));
    } finally {
      setIsSubmitting(false);
    }
  }, [form, onSubmit, validate]);

  return {
    form,
    setForm,
    handleChange,
    credentialsInvalid,
    resetError,
    isSubmitting,
    handleSubmit,
  };
}
