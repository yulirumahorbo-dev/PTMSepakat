import { StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../constants/styles";

export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: moderateScale(1),
    backgroundColor: GlobalStyles.color.BORDER,
    marginVertical: verticalScale(8),
  },
});
