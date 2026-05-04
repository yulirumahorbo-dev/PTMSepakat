import { useContext, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Input, ScreenLayout } from "../../components";
import { GlobalStyles } from "../../constants/styles";
import { supabase } from "../../lib/supabase";
import { InputContext } from "../../store/input-context";
import TextButton from "../Kalkulator/components/TextButton";

export default function Store({ navigation }) {
  const { inputData, updateInput, clearField, clearInput } =
    useContext(InputContext);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    nama: false,
    jabatan: false,
  });

  function handleInputChange(field, value) {
    updateInput(field, value);

    if (value.trim() !== "" && credentialsInvalid[field]) {
      setCredentialsInvalid((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  }

  function validateInput() {
    const inValid = {
      nama: !inputData.nama.trim(),
      jabatan: !inputData.jabatan.trim(),
    };

    setCredentialsInvalid(inValid);

    const isInValid = Object.values(inValid).some(Boolean);

    if (isInValid) {
      Alert.alert(
        "Incomplete Form",
        "Please fill in all required fields before continuing.",
      );
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    try {
      if (validateInput()) {
        const { error } = await supabase.from("inputData").insert([
          {
            nama: inputData.nama,
            jabatan: inputData.jabatan,
            created_at: new Date(),
          },
        ]);

        clearInput();
        Alert.alert("Success", "Your data has been saved to the system.");
        navigation.navigate("Home");
      }
    } catch (err) {
      console.error("Submit error:", err);
      Alert.alert("Failed to submit", err.message);
    }
  }

  function handleClear() {
    clearField("nama");
    clearField("jabatan");
    setCredentialsInvalid({
      nama: false,
      jabatan: false,
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
          placeholder="Alexander Pakpahan"
          keyboardType="default"
          value={inputData.nama}
          onUpdateValue={(text) => handleInputChange("nama", text)}
        />
        <Input
          label="Jabatan"
          placeholder="Ketua"
          keyboardType="default"
          value={inputData.jabatan}
          onUpdateValue={(text) => handleInputChange("jabatan", text)}
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
