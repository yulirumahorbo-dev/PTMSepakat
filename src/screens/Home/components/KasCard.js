import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../../constants/styles";
import { formatRupiah } from "../../../utils/rupiah";
import SubKasRow from "./SubKasRow";

export default function KasCard() {
  const navigation = useNavigation();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.75 : 1 },
      ]}
      onPress={() => navigation.navigate("Kas")}
    >
      <View style={styles.background}>
        <View style={styles.totalCard}>
          <Text style={styles.label}>Total Kas</Text>
          <Text style={styles.value}>{formatRupiah(100000)}</Text>
        </View>

        <SubKasRow />
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.detailButton,
          { opacity: pressed ? 0.75 : 1 },
        ]}
      >
        <Text style={styles.detailText}>Lihat Detail Transaksi →</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: scale(16),
  },

  background: {
    padding: moderateScale(10),
    backgroundColor: GlobalStyles.color.ACCENT + "15",
    borderRadius: moderateScale(20),
  },
  totalCard: {
    paddingTop: moderateScale(24),
    paddingBottom: moderateScale(8),
    paddingHorizontal: moderateScale(8),
  },
  label: {
    fontSize: moderateScale(16),
    color: GlobalStyles.color.TEXT,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  value: {
    fontSize: moderateScale(28),
    fontWeight: "800",
    color: GlobalStyles.color.TEXT,
  },

  detailButton: {
    marginTop: verticalScale(8),
    backgroundColor: "rgba(29,158,117,0.15)",
    borderWidth: moderateScale(0.5),
    borderColor: "rgba(29,158,117,0.3)",
    borderRadius: moderateScale(20),
  },
  detailText: {
    fontSize: moderateScale(16),
    color: "#24a850",
    fontWeight: "500",
    paddingVertical: verticalScale(4),
    textAlign: "center",
  },
});
