import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllExpenses,
  selectExpenseStatus,
  selectTotalAmount,
} from "../../store/selectors/expensesSelectors";
import ExpenseForm from "./components/ExpenseForm";
import ExpensesList from "./components/ExpensesList";
import ExpensesTotal from "./components/ExpensesTotal";

export default function Pengeluaran() {
  const dispatch = useDispatch();
  const expenses = useSelector(selectAllExpenses);
  const status = useSelector(selectExpenseStatus);
  const total = useSelector(selectTotalAmount);

  if (status === "loading" && expenses.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6C47FF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ExpensesTotal total={total} />

      <ExpenseForm />

      <ExpensesList expenses={expenses} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
