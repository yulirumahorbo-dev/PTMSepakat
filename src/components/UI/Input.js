import { StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../constants/styles";

export default function Input({
  style,
  label,
  prefix,
  suffix,
  inValid,
  textInputConfig,
}) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.suffix) {
    inputStyles.push(styles.inputSuffix);
  }

  if (inValid) {
    inputStyles.push(styles.inValidInput);
  }

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, inValid && styles.inValidLabel]}>
        {label}
      </Text>
      <View style={[styles.inputWrapper, inValid && styles.inValidWrapper]}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={styles.input}
          placeholderTextColor="#c4c9d4"
          {...textInputConfig}
        />
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.color.BG,
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1.5),
    borderColor: GlobalStyles.color.BORDER,
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  prefix: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: GlobalStyles.color.MUTED,
    marginRight: scale(8),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: GlobalStyles.color.TEXT,
    paddingVertical: verticalScale(8),
  },
  inputSuffix: { flex: 1 },
  suffix: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: GlobalStyles.color.MUTED,
    marginLeft: scale(8),
  },
  inValidWrapper: {
    borderColor: "red",
  },
  inValidLabel: {
    color: "red",
  },
});
