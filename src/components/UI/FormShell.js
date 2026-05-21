import FormContainer from "./FormContainer";
import LoadingOverlay from "./LoadingOverlay";
import TextButton from "./TextButton";

export default function FormShell({
  isSubmitting,
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  children,
}) {
  if (isSubmitting) return <LoadingOverlay />;

  return (
    <FormContainer>
      {children}
      <TextButton onPress={onSubmit} primary>
        {submitLabel}
      </TextButton>
      {onCancel && <TextButton onPress={onCancel}>Cancel</TextButton>}
    </FormContainer>
  );
}
