import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExpenseError,
  selectExpenseStatus,
} from "../../../store/selectors/expensesSelectors";
import {
  addExpense,
  fetchExpenses,
  resetStatus,
} from "../../../store/slices/expensesSlice";

const initialForm = { description: "", amount: "" };

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const status = useSelector(selectExpenseStatus);
  const error = useSelector(selectExpenseError);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed" && error) {
      Alert.alert("Error", error, [
        { text: "OK", onPress: () => dispatch(resetStatus()) },
      ]);
    }
  }, [status, error]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (value.trim()) setFormError((prev) => ({ ...prev, [field]: false }));
  }

  function validateForm() {
    const errors = {
      description: !form.description.trim(),
      amount: !form.amount.trim() || isNaN(parseFloat(form.amount)),
    };
    setFormError(errors);
    return !Object.values(errors).some(Boolean);
  }

  const handleAdd = useCallback(() => {
    if (!validateForm()) {
      Alert.alert("Incomplete", "Please fill in all fields correctly.");
      return;
    }

    dispatch(
      addExpense({
        description: form.description.trim(),
        amount: parseFloat(form.amount),
        date: new Date().toISOString(),
      }),
    );

    setForm(initialForm);
    setFormError({});
  }, [dispatch, form]);

  return (
    <View style={styles.formCard}>
      <Text style={styles.formTitle}>Add Expense</Text>

      <TextInput
        style={[styles.input, formError.description && styles.inputError]}
        placeholder="Description"
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
      />
      {formError.description && (
        <Text style={styles.errorText}>Description is required</Text>
      )}

      <TextInput
        style={[styles.input, formError.amount && styles.inputError]}
        placeholder="Amount (e.g. 50000)"
        value={form.amount}
        onChangeText={(text) => handleChange("amount", text)}
        keyboardType="numeric"
      />
      {formError.amount && (
        <Text style={styles.errorText}>Enter a valid amount</Text>
      )}

      <TouchableOpacity
        style={[styles.addBtn, status === "loading" && styles.addBtnDisabled]}
        onPress={handleAdd}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.addBtnText}>+ Add Expense</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    fontSize: 14,
    color: "#1A1A1A",
  },
  inputError: { borderColor: "#FF4757" },
  errorText: { color: "#FF4757", fontSize: 12, marginBottom: 8 },

  addBtn: {
    backgroundColor: "#6C47FF",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  addBtnDisabled: { opacity: 0.6 },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
