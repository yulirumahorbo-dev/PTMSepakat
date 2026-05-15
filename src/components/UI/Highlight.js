import { View, Text, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../constants/styles";

export default function Highlight({ label, value }) {
  return (
    <View style={styles.card}>
      <View style={styles.background}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(32),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(16),
  },
  background: {
    backgroundColor: GlobalStyles.color.ACCENT + "15",
    borderRadius: moderateScale(14),
    padding: moderateScale(18),
    borderWidth: moderateScale(1.5),
    borderColor: GlobalStyles.color.ACCENT + "50",
    alignItems: "center",
  },
  label: {
    fontSize: moderateScale(16),
    color: "#b45309",
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: verticalScale(4),
  },
  value: {
    fontSize: moderateScale(28),
    fontWeight: "800",
    color: "#b45309",
  },
});
