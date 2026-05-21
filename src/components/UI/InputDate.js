import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../constants/styles";
import { formatDate } from "../../utils/date";

const today = new Date();

export default function InputDate({ style, inValid, date, onDateChange }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const inputStyles = [styles.input];

  if (inValid) {
    inputStyles.push(styles.inValidInput);
  }

  function handleDateChange(event, selectedDate) {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (event.type === "dismissed") return;
    if (selectedDate) onDateChange(selectedDate);
  }

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, inValid && styles.inValidLabel]}>
        TANGGAL
      </Text>
      <Pressable
        style={[styles.inputWrapper, inValid && styles.inValidWrapper]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.input}>{formatDate(date)}</Text>
        <Text style={styles.suffix}>📅</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          maximumDate={today}
          onChange={handleDateChange}
        />
      )}
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
