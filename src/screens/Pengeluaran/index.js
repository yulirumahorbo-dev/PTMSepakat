import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Highlight, LoadingOverlay, ScreenLayout } from "../../components";
import { GlobalStyles } from "../../constants/styles";
import {
  selectAllExpenses,
  selectExpenseStatus,
  selectTotalAmount,
} from "../../store/selectors/expensesSelectors";
import { formatInputDisplay } from "../../utils/rupiah";
import ExpenseForm from "./components/ExpenseForm";
import ExpensesList from "./components/ExpensesList";
import { useEffect } from "react";
import { fetchExpenses } from "../../store/slices/expensesSlice";

export default function Pengeluaran() {
  const dispatch = useDispatch();
  const expenses = useSelector(selectAllExpenses);
  const status = useSelector(selectExpenseStatus);
  const total = useSelector(selectTotalAmount);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  if (status === "loading" && expenses.length === 0) {
    return <LoadingOverlay />;
  }

  return (
    <ScreenLayout backgroundColor={GlobalStyles.color.BG} headerShown>
      <Highlight
        label="Total Pengeluaran"
        value={`Rp${formatInputDisplay(`${total}`)}`}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExpenseForm />

        <ExpensesList expenses={expenses} />
      </ScrollView>
    </ScreenLayout>
  );
}
