import { useDispatch } from "react-redux";
import {
  FormShell,
  Input,
  InputCategory,
  InputDate,
  InputMoney,
} from "../../../components";
import useForm from "../../../hooks/useForm";
import { addExpense } from "../../../store/slices/expensesSlice";

const CATEGORIES = [
  "Anggaran Dasar - Menikah",
  "Anggaran Dasar - Meninggal",
  "Anggaran Dasar - Sakit",
  "Natal",
  "Lainnya",
];

const today = new Date();
const FIELDS = ["description", "amount", "category"];
const initialForm = { description: "", amount: "", date: today, category: "" };

function validateExpense(form) {
  const errors = [];
  if (!form.description.trim()) errors.push("description");
  if (!form.amount || isNaN(parseFloat(form.amount))) errors.push("amount");
  if (!form.category) errors.push("category");
  return errors;
}

export default function ExpenseForm({
  initialValues = initialForm,
  submitLabel = "+ Add Expense",
  onCancel,
  onSubmit,
}) {
  const dispatch = useDispatch();

  const {
    form,
    setForm,
    handleChange,
    credentialsInvalid,
    resetError,
    isSubmitting,
    handleSubmit,
  } = useForm({
    initialValues,
    fields: FIELDS,
    validate: validateExpense,
    onSubmit: async (f) => {
      const payload = {
        description: f.description.trim(),
        amount: parseFloat(f.amount),
        date: f.date.toISOString(),
        category: f.category,
      };
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await dispatch(addExpense(payload)).unwrap();
      }
    },
  });

  return (
    <FormShell
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
    >
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
      <InputDate
        date={form.date}
        onDateChange={(date) => setForm((prev) => ({ ...prev, date }))}
      />
      <InputCategory
        label="KATEGORI"
        categories={CATEGORIES}
        selected={form.category}
        onSelect={(cat) => {
          setForm((prev) => ({ ...prev, category: cat }));
          resetError("category");
        }}
        inValid={credentialsInvalid.category}
      />
    </FormShell>
  );
}
