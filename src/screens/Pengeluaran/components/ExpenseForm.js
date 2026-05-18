import DateTimePicker from "@react-native-community/datetimepicker";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  FormContainer,
  Input,
  InputCategory,
  InputDate,
  InputMoney,
  LoadingOverlay,
  TextButton,
} from "../../../components";
import useFormValidation from "../../../hooks/useFormValidation";
import { addExpense } from "../../../store/slices/expensesSlice";

const CATEGORIES = [
  "Anggaran Dasar - Menikah",
  "Anggaran Dasar - Meninggal",
  "Anggaran Dasar - Sakit",
  "Natal",
  "Lainnya",
];

const FIELDS = ["description", "amount", "category"];

const today = new Date();
const initialForm = { description: "", amount: "", date: today, category: "" };

export default function ExpenseForm({
  initialValues = initialForm,
  submitLabel = "+ Add Expense",
  onCancel,
  onSubmit,
}) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialValues);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { credentialsInvalid, resetError, setError } =
    useFormValidation(FIELDS);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (value.trim()) resetError(field);
  }

  function handleCategorySelect(category) {
    setForm((prev) => ({ ...prev, category }));
    resetError("category");
  }

  function handleDateChange(event, selectedDate) {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (event.type === "dismissed") return;
    if (selectedDate) setForm((prev) => ({ ...prev, date: selectedDate }));
  }

  function validateForm() {
    const isDescriptionInvalid = !form.description.trim();
    const isAmountInvalid =
      !form.amount.trim() || isNaN(parseFloat(form.amount));
    const isCategoryInvalid = !form.category;

    if (isDescriptionInvalid) setError("description");
    if (isAmountInvalid) setError("amount");
    if (isCategoryInvalid) setError("category");

    return !isDescriptionInvalid && !isAmountInvalid && !isCategoryInvalid;
  }

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      Alert.alert("Incomplete", "Please fill in all fields correctly.");
      return;
    }

    const formData = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };

    try {
      setIsSubmitting(true);

      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await dispatch(addExpense(formData)).unwrap();
        setForm(initialForm);
      }
    } catch (err) {
      Alert.alert("Failed", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, form, onSubmit]);

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <FormContainer>
      <Input
        label="Deskripsi"
        inValid={credentialsInvalid.description}
        textInputConfig={{
          placeholder: "Deskripsi",
          value: form.description,
          onChangeText: (text) => handleChange("description", text),
        }}
      />

      <InputMoney
        value={form.amount}
        onChangeValue={(raw) => {
          setForm((prev) => ({ ...prev, amount: raw }));
          if (raw) resetError("amount");
        }}
        inValid={credentialsInvalid.amount}
      />

      <InputDate date={form.date} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={form.date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          maximumDate={today}
          onChange={handleDateChange}
        />
      )}

      <InputCategory
        categories={CATEGORIES}
        selected={form.category}
        onSelect={handleCategorySelect}
        inValid={credentialsInvalid.category}
      />

      <TextButton onPress={handleSubmit} primary>
        {submitLabel}
      </TextButton>
      {onCancel && <TextButton onPress={onCancel}>Cancel</TextButton>}
    </FormContainer>
  );
}
