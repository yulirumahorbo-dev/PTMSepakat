import { Alert, Pressable, StyleSheet, Text } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { FormShell, Input, InputDate, InputMoney } from "../../../components";
import { GlobalStyles } from "../../../constants/styles";
import useFamilies from "../../../hooks/useFamilies";
import useForm from "../../../hooks/useForm";
import useLoans from "../../../hooks/useLoans";
import { addLoan } from "../../../store/slices/loansSlice";
import FamilyAutocomplete from "./FamilyAutoComplete";

const today = new Date();
const FIELDS = ["name", "date", "totalMoney", "totalMonth", "family_id"];
const initialForm = {
  name: "",
  date: today,
  totalMoney: "",
  totalMonth: "",
  family_id: null,
};

function validateLoan(form) {
  const error = [];
  if (!form.name.trim()) error.push("name");
  if (!form.totalMoney || isNaN(parseFloat(form.totalMoney)))
    error.push("totalMoney");
  if (!form.totalMonth || isNaN(parseFloat(form.totalMonth)))
    error.push("totalMonth");
  return error;
}

export default function LoanForm({
  initialValues = initialForm,
  submitLabel = "+ Add Loan",
  onCancel,
  onSubmit,
}) {
  const dispatch = useDispatch();
  const { families } = useFamilies();
  const { loans } = useLoans();

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
    validate: validateLoan,
    onSubmit: async (f) => {
      const alreadyHasLoan = loans.some(
        (loan) => loan.family_id === f.family_id,
      );
      if (alreadyHasLoan) {
        Alert.alert(
          "Pinjaman Aktif",
          `${f.name} masih memiliki pinjaman aktif. Selesaikan pinjaman sebelumnya terlebih dahulu.`,
          [{ text: "OK" }],
        );
        return;
      }

      const payload = {
        name: f.name.trim(),
        family_id: f.family_id,
        totalMoney: parseFloat(f.totalMoney),
        totalMonth: parseFloat(f.totalMonth),
        date: f.date.toISOString(),
      };

      try {
        if (onSubmit) {
          await onSubmit(payload);
        } else {
          await dispatch(addLoan(payload)).unwrap();
        }
      } catch (error) {
        if (error?.code === "23505") {
          Alert.alert(
            "Pinjaman Aktif",
            `${f.name} masih memiliki pinjaman aktif. Selesaikan pinjaman sebelumnya terlebih dahulu.`,
            [{ text: "OK" }],
          );
        } else {
          Alert.alert("Error", "Gagal menambahkan pinjaman. Coba lagi.");
        }
      }
    },
  });

  function handleFamilySelect(family) {
    const alreadyHasLoan = loans.some((loan) => loan.family_id === family.id);

    if (alreadyHasLoan) {
      Alert.alert(
        "Pinjaman Aktif",
        `${family.name} masih memiliki pinjaman aktif. Selesaikan pinjaman sebelumnya terlebih dahulu.`,
        [{ text: "OK" }],
      );
      return;
    }

    setForm((prev) => ({
      ...prev,
      name: family.name,
      family_id: family.id,
    }));
  }

  return (
    <FormShell
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
    >
      <Pressable
        style={({ pressed }) => [
          {
            alignSelf: "flex-end",
            opacity: pressed ? 0.75 : 1,
          },
        ]}
      >
        <Text style={styles.deleteButtton}>Hapus</Text>
      </Pressable>

      <FamilyAutocomplete
        value={form.name}
        families={families} //
        onChangeText={(text) => handleChange("name", text)}
        inValid={credentialsInvalid.name}
        onSelect={handleFamilySelect}
      />

      <InputDate
        date={form.date}
        onDateChange={(date) => setForm((prev) => ({ ...prev, date }))}
      />

      <InputMoney
        value={form.totalMoney}
        onChangeValue={(raw) => {
          setForm((prev) => ({ ...prev, totalMoney: raw }));
          if (raw) resetError("totalMoney");
        }}
        inValid={credentialsInvalid.totalMoney}
      />

      <Input
        label="Jumlah Bulan"
        suffix="bulan"
        textInputConfig={{
          placeholder: "0",
          keyboardType: "numeric",
          value: form.totalMonth.replace(/\D/g, ""),
          onChangeText: (text) => handleChange("totalMonth", text),
        }}
        inValid={credentialsInvalid.totalMonth}
      />
    </FormShell>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.color.CARD,
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    marginBottom: verticalScale(16),
    borderWidth: moderateScale(1),
    borderColor: GlobalStyles.color.BORDER,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: moderateScale(4) },
    elevation: 3,
  },
  deleteButtton: {
    fontSize: moderateScale(18),
    color: "#df1111",
    fontWeight: "700",
  },
});
