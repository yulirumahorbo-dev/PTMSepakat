import { useState } from "react";

export default function useFormValidation(fields) {
  const [credentialsInvalid, setCredentialsInvalid] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: false }), {}),
  );

  function resetError(field) {
    setCredentialsInvalid((prev) => ({ ...prev, [field]: false }));
  }

  function setError(field) {
    setCredentialsInvalid((prev) => ({ ...prev, [field]: true }));
  }

  return { credentialsInvalid, resetError, setError };
}
