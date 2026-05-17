import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { addExpense } from "../../../store/slices/expensesSlice";
import {
  FormContainer,
  Input,
  InputCategory,
  InputDate,
  InputMoney,
} from "../../../components";
import { GlobalStyles } from "../../../constants/styles";
import { moderateScale, verticalScale } from "react-native-size-matters";
import useFormValidation from "../../../hooks/useFormValidation";

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

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
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

  const handleAdd = useCallback(async () => {
    if (!validateForm()) {
      Alert.alert("Incomplete", "Please fill in all fields correctly.");
      return;
    }

    try {
      setIsSubmitting(true);
      await dispatch(
        addExpense({
          description: form.description.trim(),
          amount: parseFloat(form.amount),
          date: form.date.toISOString(),
          category: form.category,
        }),
      ).unwrap();

      setForm(initialForm);
    } catch (err) {
      Alert.alert("Failed", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, form]);

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

      <InputCategory inValid={credentialsInvalid.category}>
        {CATEGORIES.map((cat) => {
          const isSelected = form.category === cat;
          return (
            <Pressable
              key={cat}
              style={[
                styles.categoryChip,
                isSelected && styles.categoryChipSelected,
              ]}
              onPress={() => handleCategorySelect(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  isSelected && styles.categoryChipTextSelected,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </InputCategory>

      {credentialsInvalid.category && (
        <Text style={styles.errorText}>Please select a category</Text>
      )}

      <TouchableOpacity
        style={[styles.addBtn, isSubmitting && styles.addBtnDisabled]}
        onPress={handleAdd}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.addBtnText}>+ Add Expense</Text>
        )}
      </TouchableOpacity>
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  errorText: { color: "#FF4757", fontSize: 12, marginBottom: 8 },
  categoryLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginTop: 12,
    marginBottom: 8,
  },
  categoryLabelError: { color: "#FF4757" },
  categoryContainer: { flexDirection: "column", gap: 8 },
  categoryChip: {
    backgroundColor: GlobalStyles.color.BG,
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1.5),
    borderColor: GlobalStyles.color.BORDER,
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  categoryChipSelected: { backgroundColor: "#6C47FF", borderColor: "#6C47FF" },
  categoryChipError: { borderColor: "#FF4757" },
  categoryChipText: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: GlobalStyles.color.TEXT,
    paddingVertical: verticalScale(8),
  },
  categoryChipTextSelected: { color: "#fff", fontWeight: "700" },
  addBtn: {
    backgroundColor: "#6C47FF",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 12,
  },
  addBtnDisabled: { opacity: 0.6 },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
