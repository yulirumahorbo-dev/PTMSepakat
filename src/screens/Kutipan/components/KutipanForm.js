import { useDispatch } from "react-redux";
import {
  FormShell,
  Input,
  InputCategory,
  InputDate,
  InputMoney,
} from "../../../components";
import useForm from "../../../hooks/useForm";
import { addContribution } from "../../../store/slices/contributionsSlice";
import { useState } from "react";

const CATEGORIES = [
  "Menikah",
  "Meninggal",
  "Bingkisan Natal",
  "Persiapan Natal",
];

const today = new Date();
const FIELDS = ["title", "amount", "category"];
const initialForm = { title: "", amount: "", date: today, category: "" };

function validateContribution(form) {
  const errors = [];
  if (!form.title.trim()) errors.push("title");
  if (!form.amount || isNaN(parseFloat(form.amount))) errors.push("amount");
  if (!form.category) errors.push("category");
  return errors;
}

export default function KutipanForm({
  initialValues = initialForm,
  submitLabel = "+ Kutipan Baru",
  onCancel,
  onSubmit,
  onSuccess,
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
    validate: validateContribution,
    onSubmit: async (f) => {
      const payload = {
        title: f.title.trim(),
        amount: parseFloat(f.amount),
        date: f.date.toISOString(),
        category: f.category,
      };
      await dispatch(addContribution(payload)).unwrap();
      onSuccess?.();
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
        label="Judul"
        inValid={credentialsInvalid.title}
        textInputConfig={{
          placeholder: "Judul",
          value: form.title,
          onChangeText: (text) => handleChange("title", text),
        }}
      />
      <InputMoney
        label="Jumlah Uang (per Keluarga)"
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
