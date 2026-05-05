import { useContext, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Divider, Input, ScreenLayout } from "../../components";
import { GlobalStyles } from "../../constants/styles";
import { supabase } from "../../lib/supabase";
import { PinjamanContext } from "../../store/pinjaman-context";
import { formatInputDisplay } from "../../utils/rupiah";
import TextButton from "../Kalkulator/components/TextButton";

const stripFormat = (formatted) => formatted.replace(/\./g, "");

export default function Pinjaman({ navigation }) {
  const { pinjamanData, updateInput, clearField, clearInput } =
    useContext(PinjamanContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from("inputData")
        .select("id, nama");

      if (error) {
        console.error("Fetch error:", error);
      } else {
        setUsers(data);
      }
    }
    fetchUsers();
  }, []);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    nama: false,
    tanggal: false,
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
      nama: !pinjamanData.nama.trim(),
      tanggal: !pinjamanData.tanggal.trim(),
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
        const { error } = await supabase.from("pinjaman").insert([
          {
            nama: pinjamanData.nama,
            tanggal: pinjamanData.tanggal,
            jumlahUang: parseFloat(stripFormat(pinjamanData.jumlahUang)),
            jumlahBulan: parseFloat(pinjamanData.jumlahBulan),
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
    clearField("tanggal");
    clearField("jumlahUang");
    clearField("jumlahBulan");
    setCredentialsInvalid({
      nama: false,
      tanggal: false,
      jumlahUang: false,
      jumlahBulan: false,
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
          value={pinjamanData.nama}
          onUpdateValue={(text) => handleInputChange("nama", text)}
        />

        <Divider />

        <Input
          label="Tanggal"
          placeholder="5/5/26"
          keyboardType="number"
          value={pinjamanData.tanggal}
          onUpdateValue={(text) => handleInputChange("tanggal", text)}
        />

        <Divider />

        <Input
          label="Jumlah Uang"
          prefix="Rp"
          placeholder="0"
          keyboardType="numeric"
          value={formatInputDisplay(
            stripFormat(pinjamanData.jumlahUang).replace(/\D/g, ""),
          )}
          onUpdateValue={(text) => handleInputChange("jumlahUang", text)}
        />

        <Divider />

        <Input
          label="Jumlah Bulan"
          suffix="bulan"
          placeholder="0"
          keyboardType="numeric"
          value={pinjamanData.jumlahBulan.replace(/\D/g, "")}
          onUpdateValue={(text) => handleInputChange("jumlahBulan", text)}
        />
      </View>

      <TextButton primary onPress={handleSubmit}>
        Buat Pinjaman Baru
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
