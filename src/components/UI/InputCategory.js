import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../constants/styles";

export default function InputCategory({ style, inValid, children }) {
  const inputStyles = [styles.input];

  if (inValid) {
    inputStyles.push(styles.inValidInput);
  }

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, inValid && styles.inValidLabel]}>
        KATEGORI
      </Text>
      <View style={[styles.inputWrapper, inValid && styles.inValidWrapper]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginVertical: verticalScale(8),
  },
  label: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(16),
    fontWeight: "700",
    color: GlobalStyles.color.MUTED,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  inputWrapper: {
    gap: verticalScale(8),
    backgroundColor: GlobalStyles.color.BG,
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1.5),
    borderColor: GlobalStyles.color.BORDER,
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
  },
});
