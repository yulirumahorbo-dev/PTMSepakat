import { Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../constants/styles";

export default function InputCategory({
  categories,
  selected,
  onSelect,
  style,
  inValid,
}) {
  const inputStyles = [styles.input];

  if (inValid) {
    inputStyles.push(styles.inValidInput);
  }

  return (
    <View style={styles.inputGroup}>
      <View
        style={{
          flexDirection: "row",
          gap: scale(8),
          marginBottom: verticalScale(8),
        }}
      >
        <Text style={[styles.label, inValid && styles.inValidLabel]}>
          KATEGORI
        </Text>
        {inValid && <Text style={styles.errorText}>(Wajib dipilih)</Text>}
      </View>
      <View style={[styles.inputWrapper, inValid && styles.inValidWrapper]}>
        {categories.map((cat) => {
          const isSelected = selected === cat;
          return (
            <Pressable
              key={cat}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onSelect(cat)}
            >
              <Text
                style={[styles.chipText, isSelected && styles.chipTextSelected]}
              >
                {cat}
              </Text>
            </Pressable>
          );
        })}
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
    fontWeight: "700",
    color: GlobalStyles.color.MUTED,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  errorText: {
    color: "red",
    fontSize: moderateScale(14),
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
  inValidWrapper: {
    borderColor: "red",
  },
  inValidLabel: {
    color: "red",
  },
  chip: {
    backgroundColor: GlobalStyles.color.BG,
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1.5),
    borderColor: GlobalStyles.color.BORDER,
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  chipSelected: { backgroundColor: "#6C47FF", borderColor: "#6C47FF" },
  chipText: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: GlobalStyles.color.TEXT,
    paddingVertical: verticalScale(8),
  },
  chipTextSelected: { color: "#fff", fontWeight: "700" },
});
