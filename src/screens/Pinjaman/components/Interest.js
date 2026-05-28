import { StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../../constants/styles";
import { formatRupiah } from "../../../utils/rupiah";

export default function Interest({ interest, totalWithInterest }) {
  return (
    <View style={styles.interestContainer}>
      <View style={styles.interestRow}>
        <Text style={styles.interestLabel}>Bunga (10%)</Text>
        <Text style={styles.interestValue}>{formatRupiah(interest)}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.interestRow}>
        <Text style={styles.totalLabel}>Total (+ Bunga)</Text>
        <Text style={styles.totalValue}>{formatRupiah(totalWithInterest)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  interestContainer: {
    backgroundColor: GlobalStyles.color.CARD,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    borderWidth: 1,
    borderColor: GlobalStyles.color.BORDER,
    gap: verticalScale(6),
  },
  interestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: GlobalStyles.color.BORDER,
  },
  interestLabel: {
    fontSize: moderateScale(13),
    color: GlobalStyles.color.MUTED,
  },
  interestValue: {
    fontSize: moderateScale(13),
    color: GlobalStyles.color.MUTED,
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
