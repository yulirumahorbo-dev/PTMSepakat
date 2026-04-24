import { StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../../constants/styles";

export default function Highlight({ bulan, cicilan }) {
  return (
    <View style={styles.highlight}>
      <Text style={styles.highlightLabel}>
        Cicilan per Bulan ({bulan} bulan)
      </Text>
      <Text style={styles.highlightValue}>{cicilan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Highlight box
  highlight: {
    backgroundColor: GlobalStyles.color.ACCENT + "15",
    borderRadius: moderateScale(14),
    padding: moderateScale(18),
    borderWidth: moderateScale(1.5),
    borderColor: GlobalStyles.color.ACCENT + "50",
    alignItems: "center",
  },
  highlightLabel: {
    fontSize: moderateScale(16),
    color: "#b45309",
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: verticalScale(4),
  },
  highlightValue: {
    fontSize: moderateScale(28),
    fontWeight: "800",
    color: "#b45309",
  },
});
