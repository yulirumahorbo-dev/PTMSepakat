import { Alert, Pressable, StyleSheet, Text } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { Divider, FormShell, Input, InputCategory } from "../../components";
import { GlobalStyles } from "../../constants/styles";
import useForm from "../../hooks/useForm";
import { addFamilyWithMembers } from "../../store/slices/familiesSlice";

const FIELDS = [
  "husbandName",
  "husbandRole",
  "wifeName",
  "wifeRole",
  "address",
  "family_id",
];

const JABATAN = ["Ketua", "Sekretaris", "Bendahara", "Anggota"];
const initialForm = {
  husbandName: "",
  husbandRole: "",
  wifeName: "",
  wifeRole: "",
  address: "",
  family_id: null,
};

function validateMember(form) {
  const errors = [];
  if (!form.husbandName.trim()) errors.push("husbandName");
  if (!form.husbandRole) errors.push("husbandRole");
  if (!form.wifeName.trim()) errors.push("wifeName");
  if (!form.wifeRole) errors.push("wifeRole");
  if (!form.address) errors.push("address");
  return errors;
}

export default function Store({
  initialValues = initialForm,
  submitLabel = "+ Add Member",
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
    validate: validateMember,
    onSubmit: async (f) => {
      const result = await dispatch(
        addFamilyWithMembers({
          husbandName: f.husbandName,
          husbandRole: f.husbandRole,
          wifeName: f.wifeName,
          wifeRole: f.wifeRole,
          address: f.address,
        }),
      );

      if (addFamilyWithMembers.rejected.match(result)) {
        Alert.alert("Error", "Gagal menambahkan member. Coba lagi.");
      }

      if (onSubmit) await onSubmit(result.payload);
    },
  });

  return (
    <FormShell
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel={submitLabel}
    >
      <Pressable
        onPress={() => setForm(initialForm)}
        style={({ pressed }) => [
          {
            alignSelf: "flex-end",
            opacity: pressed ? 0.75 : 1,
          },
        ]}
      >
        <Text style={styles.deleteButtton}>Hapus</Text>
      </Pressable>

      <Text
        style={{
          fontSize: moderateScale(18),
          fontWeight: "bold",
          letterSpacing: scale(1),
        }}
      >
        SUAMI
      </Text>
      <Input
        label="Nama"
        textInputConfig={{
          placeholder: "Contoh: Alexander Silalahi",
          keyboardType: "default",
          value: form.husbandName,
          onChangeText: (text) => handleChange("husbandName", text),
        }}
        inValid={credentialsInvalid.husbandName}
      />

      <InputCategory
        label="JABATAN"
        categories={JABATAN}
        selected={form.husbandRole}
        onSelect={(cat) => {
          setForm((prev) => ({ ...prev, husbandRole: cat }));
          resetError("husbandRole");
        }}
        inValid={credentialsInvalid.husbandRole}
      />

      <Divider />
      <Text
        style={{
          fontSize: moderateScale(18),
          fontWeight: "bold",
          letterSpacing: scale(1),
        }}
      >
        ISTRI
      </Text>
      <Input
        label="Nama"
        textInputConfig={{
          placeholder: "Contoh: Bene Sinaga",
          keyboardType: "default",
          value: form.wifeName,
          onChangeText: (text) => handleChange("wifeName", text),
        }}
        inValid={credentialsInvalid.wifeName}
      />

      <InputCategory
        label="JABATAN"
        categories={JABATAN}
        selected={form.wifeRole}
        onSelect={(cat) => {
          setForm((prev) => ({ ...prev, wifeRole: cat }));
          resetError("wifeRole");
        }}
        inValid={credentialsInvalid.wifeRole}
      />

      <Divider />

      <Input
        label="Alamat Rumah"
        textInputConfig={{
          placeholder: "Jalan K H Agus Salim",
          keyboardType: "default",
          value: form.address,
          onChangeText: (text) => handleChange("address", text),
        }}
        inValid={credentialsInvalid.address}
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
