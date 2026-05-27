import { Alert, Pressable, StyleSheet, Text } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { Divider, FormShell, Input, InputCategory } from "../../components";
import { GlobalStyles } from "../../constants/styles";
import useForm from "../../hooks/useForm";
import { supabase } from "../../lib/supabase";
import { addMember } from "../../store/slices/membershipSlice";
import {
  generateFamilyNumber,
  generateMemberNumber,
} from "../../utils/membership";

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
      const { data: seqData, error: seqError } = await supabase.rpc(
        "get_next_family_sequence",
      );

      if (seqError) throw seqError.message;

      const year = new Date().getFullYear();
      const familyNumber = generateFamilyNumber(year, seqData);
      const husbandNumber = generateMemberNumber(familyNumber, "01");
      const wifeNumber = generateMemberNumber(familyNumber, "02");

      const { data: family, error: familyError } = await supabase
        .from("families")
        .insert({
          family_membership_number: familyNumber,
          address: form.address.trim(),
          sequence_number: seqData,
          name: `${form.husbandName.trim()} / ${form.wifeName.trim()}`,
        })
        .select()
        .single();

      if (familyError) throw familyError.message;

      const { error: membersError } = await supabase.from("members").insert([
        {
          family_id: family.id,
          membership_number: husbandNumber,
          name: form.husbandName.trim(),
          role: form.husbandRole,
        },
        {
          family_id: family.id,
          membership_number: wifeNumber,
          name: form.wifeName.trim(),
          role: form.wifeRole,
        },
      ]);

      if (membersError) throw membersError.message;

      const payload = {
        familyId: familyNumber,
        name: `${form.husbandName.trim()} / ${form.wifeName.trim()}`,
        husband: `${form.husbandName} (${husbandNumber})`,
        wife: `${form.wifeName} (${wifeNumber})`,
      };

      try {
        if (onSubmit) {
          await onSubmit(payload);
        } else {
          await dispatch(addMember(payload));
        }
      } catch (error) {
        Alert.alert("Error", "Gagal menambahkan member. Coba lagi.");
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
