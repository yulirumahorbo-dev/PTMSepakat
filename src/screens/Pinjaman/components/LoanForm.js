import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Input,
  LoadingOverlay,
  TextButton,
} from "../../../components";
import { GlobalStyles } from "../../../constants/styles";
import useFormValidation from "../../../hooks/useFormValidation";
import useMembers from "../../../hooks/useMembers";
import { supabase } from "../../../lib/supabase";
import {
  clearLoanField,
  clearLoanInput,
  updateLoanInput,
} from "../../../store/slices/loanSlice";
import { formatInputDisplay } from "../../../utils/rupiah";

const stripFormat = (formatted) => formatted.replace(/\./g, "");

export default function LoanForm() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loanData = useSelector((state) => state.loan);
  const { credentialsInvalid, setError, resetError } = useFormValidation([
    "name",
    "date",
    "totalMoney",
    "totalMonth",
  ]);
  const { members, status, error } = useMembers();

  function handleInputChange(field, value) {
    dispatch(updateLoanInput({ field, value }));

    if (value.trim() !== "") resetError(field);
  }

  function validateInput() {
    const requiredFields = ["name", "date", "totalMoney", "totalMonth"];

    const invalidFields = requiredFields.filter(
      (field) => !loanData[field].trim(),
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
        const { error } = await supabase.from("loansData").insert([
          {
            name: loanData.name,
            date: loanData.date,
            totalMoney: parseFloat(stripFormat(loanData.totalMoney)),
            totalMonth: parseFloat(loanData.totalMonth),
            created_at: new Date(),
          },
        ]);

        if (error) throw new Error(error.message);

        dispatch(clearLoanInput());
        Alert.alert("Success", "Your data has been saved to the system.");
        navigation.navigate("Home");
      }
    } catch (err) {
      console.error("Submit error:", err);
      Alert.alert("Failed to submit", err.message);
    }
  }

  function handleClear() {
    const fields = ["name", "date", "totalMoney", "totalMonth"];

    fields.forEach((field) => {
      dispatch(clearLoanField(field));
      resetError(field);
    });
  }

  if (status === "loading" && members.length === 0) {
    return <LoadingOverlay />;
  }

  return (
    <View>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
          </View>
        )}
      />
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
          label="name"
          textInputConfig={{
            placeholder: "Alexander Pakpahan",
            keyboardType: "default",
            value: loanData.name,
            onChangeText: (text) => handleInputChange("name", text),
          }}
          inValid={credentialsInvalid.name}
        />

        <Divider />

        <Input
          label="Tanggal"
          textInputConfig={{
            placeholder: "5/5/26",
            keyboardType: "number",
            value: loanData.date,
            onChangeText: (text) => handleInputChange("date", text),
          }}
          inValid={credentialsInvalid.date}
        />

        <Divider />

        <Input
          label="Jumlah Uang"
          prefix="Rp"
          textInputConfig={{
            placeholder: "0",
            keyboardType: "numeric",
            value: formatInputDisplay(
              stripFormat(loanData.totalMoney).replace(/\D/g, ""),
            ),
            onChangeText: (text) => handleInputChange("totalMoney", text),
          }}
          inValid={credentialsInvalid.totalMoney}
        />

        <Divider />

        <Input
          label="Jumlah Bulan"
          suffix="bulan"
          textInputConfig={{
            placeholder: "0",
            keyboardType: "numeric",
            value: loanData.totalMonth.replace(/\D/g, ""),
            onChangeText: (text) => handleInputChange("totalMonth", text),
          }}
          inValid={credentialsInvalid.totalMonth}
        />
      </View>

      <TextButton primary onPress={handleSubmit}>
        Buat Pinjaman Baru
      </TextButton>
    </View>
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
