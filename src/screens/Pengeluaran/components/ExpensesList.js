import { FlatList, StyleSheet, Text } from "react-native";
import ExpensesItem from "./ExpensesItem";

export default function ExpensesList({ expenses }) {
  function renderExpenseItem(itemData) {
    return <ExpensesItem {...itemData.item} />;
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderExpenseItem}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.empty}>No expenses yet.</Text>}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 16, paddingBottom: 16, gap: 12 },
  empty: { textAlign: "center", color: "#aaa", marginTop: 40 },
});
