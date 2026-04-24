import { StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../../constants/styles";
import { formatRupiah } from "../../../utils/rupiah";
import Highlight from "./Highlight";

export default function Result({ uang, bunga, total, bulan, perBulan }) {
  return (
    <View style={styles.resultCard}>
      <Text style={styles.resultTitle}>Rincian Perhitungan</Text>

      <View style={styles.resultRow}>
        <Text style={styles.resultKey}>Pokok Pinjaman</Text>
        <Text style={styles.resultValue}>{formatRupiah(`${uang}`)}</Text>
      </View>

      <View style={styles.resultRow}>
        <Text style={styles.resultKey}>Bunga 10%</Text>
        <Text style={styles.resultValueGreen}>
          + {formatRupiah(`${bunga}`)}
        </Text>
      </View>

      <View style={styles.resultDivider} />

      <View style={styles.resultRow}>
        <Text
          style={[styles.resultKey, { fontWeight: "700", color: "#1e293b" }]}
        >
          Total
        </Text>
        <Text style={[styles.resultValue, { fontWeight: "700" }]}>
          {formatRupiah(`${total}`)}
        </Text>
      </View>

      {/* Highlight */}
      <Highlight
        bulan={`${bulan}`}
        cicilan={formatRupiah(Math.ceil(`${perBulan}`))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  resultCard: {
    backgroundColor: GlobalStyles.color.CARD,
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: GlobalStyles.color.BORDER,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: moderateScale(4) },
    elevation: 3,
  },
  resultTitle: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: GlobalStyles.color.MUTED,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 18,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  resultKey: {
    fontSize: moderateScale(20),
    color: GlobalStyles.color.MUTED,
  },
  resultValue: {
    fontSize: moderateScale(20),
    color: GlobalStyles.color.TEXT,
    fontWeight: "600",
  },
  resultValueGreen: {
    fontSize: moderateScale(20),
    color: "#16a34a",
    fontWeight: "600",
  },
  resultDivider: {
    height: moderateScale(1),
    backgroundColor: GlobalStyles.color.BORDER,
    marginBottom: 14,
  },
});
