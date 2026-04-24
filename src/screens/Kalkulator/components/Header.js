import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Cicilan</Text>
      <Text style={styles.headerSub}>Bunga tetap 10% per periode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  headerTitle: {
    fontSize: moderateScale(40),
    fontWeight: "800",
    color: GlobalStyles.color.TEXT,
    lineHeight: moderateScale(40),
  },
  headerSub: {
    fontSize: moderateScale(20),
    color: GlobalStyles.color.MUTED,
  },
});
