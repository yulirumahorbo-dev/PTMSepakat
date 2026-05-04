import { View, Text, StyleSheet, TextInput } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../constants/styles";

export default function Input({
  label,
  prefix,
  suffix,
  placeholder,
  keyboardType,
  value,
  onUpdateValue,
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        {prefix ? (
          <>
            <Text style={styles.prefix}>{prefix}</Text>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#c4c9d4"
              keyboardType={keyboardType}
              value={value}
              onChangeText={onUpdateValue}
            />
          </>
        ) : suffix ? (
          <>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder={placeholder}
              placeholderTextColor="#c4c9d4"
              keyboardType={keyboardType}
              value={value}
              onChangeText={onUpdateValue}
            />
            <Text style={styles.suffix}>{suffix}</Text>
          </>
        ) : (
          <>
            <TextInput
              style={[styles.input]}
              placeholder={placeholder}
              placeholderTextColor="#c4c9d4"
              keyboardType={keyboardType}
              value={value}
              onChangeText={onUpdateValue}
            />
          </>
        )}
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
  suffix: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: GlobalStyles.color.MUTED,
    marginLeft: scale(8),
  },
});
