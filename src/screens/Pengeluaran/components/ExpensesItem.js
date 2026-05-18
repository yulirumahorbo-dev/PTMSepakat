import { useCallback, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  editExpense,
  removeExpense,
} from "../../../store/slices/expensesSlice";
import { formatInputDisplay } from "../../../utils/rupiah";
import ExpenseForm from "./ExpenseForm";

export default function ExpensesItem({
  description,
  date,
  amount,
  category,
  id,
  onCancel,
  onSubmit,
}) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

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

  async function handleSave(formData) {
    await dispatch(editExpense({ id, expenseData: formData })).unwrap();
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
          <Pressable
            style={styles.editBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.btnText}>Edit</Text>
          </Pressable>
          <Pressable style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Edit Expense</Text>

            <ExpenseForm
              key={String(modalVisible)}
              initialValues={{
                description,
                amount: String(amount),
                date: new Date(date),
                category,
              }}
              submitLabel="Save"
              onCancel={() => setModalVisible(false)}
              onSubmit={handleSave}
            />
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
});
