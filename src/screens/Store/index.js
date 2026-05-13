import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { Input, ScreenLayout } from "../../components";
import { GlobalStyles } from "../../constants/styles";
import useFormValidation from "../../hooks/useFormValidation";
import { supabase } from "../../lib/supabase";
import {
  clearField,
  clearInput,
  updateInput,
} from "../../store/slices/inputSlice";
import TextButton from "../Kalkulator/components/TextButton";

export default function Store({ navigation }) {
  const dispatch = useDispatch();
  const inputData = useSelector((state) => state.input);
  const { credentialsInvalid, setError, resetError } = useFormValidation([
    "name",
    "jabatan",
  ]);

  function handleInputChange(field, value) {
    dispatch(updateInput({ field, value }));

    if (value.trim() !== "") resetError(field);
  }

  function validateInput() {
    const requiredFields = ["name", "jabatan"];

    const invalidFields = requiredFields.filter(
      (field) => !inputData[field].trim(),
    );

    invalidFields.forEach((field) => setError(field));

    if (invalidFields.length > 0) {
      Alert.alert(
        "Incomplete Form",
        "Please fill in all required fields before continuing.",
      );
    }

    return invalidFields.length === 0;
  }

  async function handleSubmit() {
    try {
      if (validateInput()) {
        const { error } = await supabase.from("inputData").insert([
          {
            name: inputData.name,
            jabatan: inputData.jabatan,
            created_at: new Date(),
          },
        ]);

        if (error) throw new Error(error.message);

        dispatch(clearInput());
        Alert.alert("Success", "Your data has been saved to the system.");
        navigation.navigate("Home");
      }
    } catch (err) {
      console.error("Submit error:", err);
      Alert.alert("Failed to submit", err.message);
    }
  }

  function handleClear() {
    const fields = ["name", "jabatan"];

    fields.forEach((field) => {
      dispatch(clearField(field));
      resetError(field);
    });
  }

  return (
    <ScreenLayout
      backgroundColor={GlobalStyles.color.BG}
      paddingHorizontal={scale(16)}
      headerShown
    >
      <View style={styles.card}>
        <Pressable
          onPress={handleClear}
          style={({ pressed }) => [
            {
              alignSelf: "flex-end",
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          <Text style={styles.deleteButtton}>Hapus</Text>
        </Pressable>
        <Input
          label="Nama"
          textInputConfig={{
            placeholder: "Alexander Pakpahan",
            keyboardType: "default",
            value: inputData.name,
            onChangeText: (text) => handleInputChange("name", text),
          }}
          inValid={credentialsInvalid.name}
        />
        <Input
          label="Jabatan"
          textInputConfig={{
            placeholder: "Ketua",
            keyboardType: "default",
            value: inputData.jabatan,
            onChangeText: (text) => handleInputChange("jabatan", text),
          }}
          inValid={credentialsInvalid.jabatan}
        />
      </View>

      <TextButton primary onPress={handleSubmit}>
        Input Data
      </TextButton>
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
