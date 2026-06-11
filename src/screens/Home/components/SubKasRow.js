import { Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../../constants/styles";
import { formatRupiah } from "../../../utils/rupiah";
import useLoans from "../../../hooks/useLoans";
import { useNavigation } from "@react-navigation/native";

export default function SubKasRow() {
  const navigation = useNavigation();
  const { total } = useLoans();
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          { opacity: pressed ? 0.75 : 1, backgroundColor: "#EAF1FF" },
        ]}
      >
        <Text style={styles.label}>Sub Kas 1</Text>
        <Text style={styles.name}>Di Bendahara</Text>
        <Text style={[styles.value, { color: "#4F8EF7" }]}>
          {formatRupiah(50000)}
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          { opacity: pressed ? 0.75 : 1, backgroundColor: "#F5EAFF" },
        ]}
        onPress={() => navigation.navigate("Pinjaman")}
      >
        <Text style={styles.label}>Sub Kas 2</Text>
        <Text style={styles.name}>Di Anggota</Text>
        <Text style={[styles.value, { color: "#A04FF7" }]}>
          {formatRupiah(total)}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: moderateScale(8),
    justifyContent: "space-between",
    gap: moderateScale(8),
  },
  card: {
    flex: 1,
    borderRadius: moderateScale(14),
    padding: moderateScale(16),
  },
  label: {
    fontSize: moderateScale(14),
    color: GlobalStyles.color.TEXT,
    fontWeight: "500",
    marginBottom: verticalScale(4),
  },
  name: {
    fontSize: moderateScale(16),
    color: GlobalStyles.color.MUTED,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: verticalScale(4),
  },
  value: {
    fontSize: moderateScale(24),
    fontWeight: "600",
  },
});
