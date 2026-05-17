import { StyleSheet, Text, Pressable } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../constants/styles";

export default function TextButton({ primary, onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [
        primary ? styles.btnPrimary : styles.btnSecondary,
        { opacity: pressed ? 0.75 : 1 },
      ]}
      onPress={onPress}
    >
      <Text style={[primary ? styles.btnPrimaryText : styles.btnSecondaryText]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: GlobalStyles.color.ACCENT,
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(8),
    alignItems: "center",
    marginBottom: verticalScale(16),
    borderWidth: moderateScale(1),
    borderColor: GlobalStyles.color.ACCENT,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(14),
    shadowOffset: { width: 0, height: moderateScale(4) },
    elevation: 3,
  },
  btnPrimaryText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: moderateScale(20),
    letterSpacing: 0.5,
  },
  btnSecondary: {
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(8),
    alignItems: "center",
    borderWidth: moderateScale(1.5),
    borderColor: GlobalStyles.color.BORDER,
    marginBottom: verticalScale(16),
  },
  btnSecondaryText: {
    color: GlobalStyles.color.MUTED,
    fontWeight: "600",
    fontSize: moderateScale(20),
  },
});
