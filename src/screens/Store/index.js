import { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import {
  Divider,
  FormContainer,
  Input,
  InputCategory,
  LoadingOverlay,
  ScreenLayout,
  TextButton,
} from "../../components";
import { GlobalStyles } from "../../constants/styles";
import useFormValidation from "../../hooks/useFormValidation";
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
];

const JABATAN = ["Ketua", "Sekretaris", "Bendahara", "Anggota"];
const initialForm = {
  husbandName: "",
  husbandRole: "",
  wifeName: "",
  wifeRole: "",
  address: "",
};

const existingNumbers = ["LBP-2025-0001-01", "LBP-2025-0002-01"];

export default function Store({
  navigation,
  initialValue = initialForm,
  onSubmit,
}) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { credentialsInvalid, resetError, setError } =
    useFormValidation(FIELDS);
  const [result, setResult] = useState(null);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (value.trim()) resetError(field);
  }

  function handleRoleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    resetError(field);
  }

  function validateForm() {
    const fields = [
      { key: "husbandName", value: form.husbandName.trim() },
      { key: "husbandRole", value: form.husbandRole },
      { key: "wifeName", value: form.wifeName.trim() },
      { key: "wifeRole", value: form.wifeRole },
      { key: "address", value: form.address.trim() },
    ];

    const invalidFields = fields.filter(({ value }) => !value);
    invalidFields.forEach(({ key }) => setError(key));

    return invalidFields.length === 0;
  }

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      Alert.alert("Incomplete", "Please fill in all fields correctly.");
      return;
    }

    try {
      setIsSubmitting(true);

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

      setResult({
        familyId: familyNumber,
        husband: `${form.husbandName} (${husbandNumber})`,
        wife: `${form.wifeName} (${wifeNumber})`,
      });

      if (onSubmit) {
        await onSubmit({ familyNumber, husbandNumber, wifeNumber });
      } else {
        dispatch(
          addMember({ familyNumber, husbandNumber, wifeNumber, ...form }),
        );
        setForm(initialForm);
      }
    } catch (err) {
      Alert.alert("Failed", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, form, onSubmit]);

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <ScreenLayout backgroundColor={GlobalStyles.color.BG} headerShown>
      <ScrollView>
        <FormContainer>
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
            onSelect={(text) => handleRoleChange("husbandRole", text)}
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
            onSelect={(text) => handleRoleChange("wifeRole", text)}
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

          <TextButton primary onPress={handleSubmit}>
            Input Data
          </TextButton>
        </FormContainer>

        {result && (
          <View>
            <Text>Family ID : {result.familyId}</Text>
            <Text>Husband : {result.husband}</Text>
            <Text>Wife : {result.wife}</Text>
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
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
