import { View, Text, StyleSheet } from "react-native";
import { formatInputDisplay } from "../../../utils/rupiah";

export default function ExpensesTotal({ total }) {
  return (
    <View style={styles.totalCard}>
      <Text style={styles.totalLabel}>Total Expenses</Text>
      <Text style={styles.totalAmount}>Rp{formatInputDisplay(`${total}`)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  totalCard: { backgroundColor: "#6C47FF", padding: 24, alignItems: "center" },
  totalLabel: { color: "#fff", fontSize: 14, opacity: 0.85 },
  totalAmount: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 4,
  },
});
