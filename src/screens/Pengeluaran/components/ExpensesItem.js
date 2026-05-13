import { useCallback } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { removeExpense } from "../../../store/slices/expensesSlice";
import { formatInputDisplay } from "../../../utils/rupiah";

export default function ExpensesItem({ description, date, amount, id }) {
  const dispatch = useDispatch();
  const handleDelete = useCallback(
    (id) => {
      Alert.alert("Delete", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(removeExpense(id)),
        },
      ]);
    },
    [dispatch],
  );

  return (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.amount}>Rp{formatInputDisplay(`${amount}`)}</Text>
      <Pressable style={styles.deleteBtn} onPress={() => handleDelete(id)}>
        <Text style={styles.btnText}>Delete</Text>
      </Pressable>
    </View>
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
  deleteBtn: {
    backgroundColor: "#FF4757",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});
