import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../../constants/styles";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>PTM Sepakat</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.headerSub}>Selamat Pagi,</Text>
        <Text style={styles.name}> Ibu Aguslimah!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
    paddingHorizontal: scale(16),
  },
  headerTitle: {
    fontSize: moderateScale(40),
    fontWeight: "800",
    color: GlobalStyles.color.TEXT,
  },
  headerSub: {
    fontSize: moderateScale(20),
    color: GlobalStyles.color.MUTED,
  },
  name: {
    fontSize: moderateScale(20),
    color: GlobalStyles.color.TEXT,
    fontWeight: "600",
  },
});
