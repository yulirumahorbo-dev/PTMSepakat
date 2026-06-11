import { useCallback, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { editLoan, removeLoan } from "../../../store/slices/loansSlice";
import { formatInputDisplay } from "../../../utils/rupiah";
import LoanForm from "./LoanForm";
import { scale } from "react-native-size-matters";

export default function LoansItem({
  name,
  date,
  totalMoney,
  totalMonth,
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
        onPress: () => dispatch(removeLoan(id)),
      },
    ]);
  }, [dispatch, id]);

  async function handleSave(formData) {
    await dispatch(editLoan({ id, loanData: formData })).unwrap();
    setModalVisible(false);
  }

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
        </View>
        <Text style={styles.totalMoney}>
          Rp{formatInputDisplay(`${totalMoney}`)}
        </Text>
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

            <LoanForm
              key={String(modalVisible)}
              initialValues={{
                name,
                totalMoney: String(totalMoney),
                date: new Date(date),
                totalMonth: String(totalMonth),
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
  },
  cardInfo: { flex: 1 },
  name: { fontSize: 15, fontWeight: "600", color: "#1A1A1A" },
  date: { fontSize: 12, color: "#999", marginTop: 2 },
  totalMoney: {
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
