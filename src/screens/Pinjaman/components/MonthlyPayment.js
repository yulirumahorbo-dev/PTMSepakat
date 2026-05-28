import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { formatRupiah } from "../../../utils/rupiah";

export default function MonthlyPayment({ monthlyPayment }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Cicilan / Bulan</Text>
        <Text style={styles.totalValue}>{formatRupiah(monthlyPayment)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.color.CARD,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    borderWidth: 1,
    borderColor: GlobalStyles.color.BORDER,
    gap: verticalScale(6),
    marginBottom: verticalScale(8),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: moderateScale(14),
    fontWeight: "700",
  },
  totalValue: {
    fontSize: moderateScale(14),
    fontWeight: "700",
    color: GlobalStyles.color.PRIMARY,
  },
});
