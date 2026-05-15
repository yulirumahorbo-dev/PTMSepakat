import { useCallback, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  editExpense,
  removeExpense,
} from "../../../store/slices/expensesSlice";
import { formatInputDisplay } from "../../../utils/rupiah";

export default function ExpensesItem({ description, date, amount, id }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ description, amount: String(amount) });
  const [formError, setFormError] = useState({});

  // ─── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = useCallback(() => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(removeExpense(id)),
      },
    ]);
  }, [dispatch, id]);

  // ─── Edit ─────────────────────────────────────────────────────────────────
  function handleOpenEdit() {
    setForm({ description, amount: String(amount) });
    setFormError({});
    setModalVisible(true);
  }

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

  function handleSave() {
    if (!validateForm()) return;

    dispatch(
      editExpense({
        id,
        expenseData: {
          description: form.description.trim(),
          amount: parseFloat(form.amount),
        },
      }),
    );
    setModalVisible(false);
  }

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
        </View>
        <Text style={styles.amount}>Rp{formatInputDisplay(`${amount}`)}</Text>
        <View style={styles.actions}>
          <Pressable style={styles.editBtn} onPress={handleOpenEdit}>
            <Text style={styles.btnText}>Edit</Text>
          </Pressable>
          <Pressable style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        </View>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Edit Expense</Text>

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, formError.description && styles.inputError]}
              value={form.description}
              onChangeText={(text) => handleChange("description", text)}
              placeholder="Description"
            />
            {formError.description && (
              <Text style={styles.errorText}>Description is required</Text>
            )}

            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={[styles.input, formError.amount && styles.inputError]}
              value={form.amount}
              onChangeText={(text) => handleChange("amount", text)}
              placeholder="Amount"
              keyboardType="numeric"
            />
            {formError.amount && (
              <Text style={styles.errorText}>Enter a valid amount</Text>
            )}

            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.btnText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardInfo: { flex: 1 },
  description: { fontSize: 15, fontWeight: "600", color: "#1A1A1A" },
  date: { fontSize: 12, color: "#999", marginTop: 2 },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6C47FF",
    marginHorizontal: 12,
  },
  actions: { flexDirection: "row", gap: 8 },
  editBtn: {
    backgroundColor: "#6C47FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  deleteBtn: {
    backgroundColor: "#FF4757",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  label: { fontSize: 13, fontWeight: "600", color: "#555", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  inputError: { borderColor: "#FF4757" },
  errorText: { color: "#FF4757", fontSize: 12, marginBottom: 8 },
  modalActions: { flexDirection: "row", gap: 12, marginTop: 20 },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  cancelText: { color: "#555", fontWeight: "600" },
  saveBtn: {
    flex: 1,
    backgroundColor: "#6C47FF",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
});
