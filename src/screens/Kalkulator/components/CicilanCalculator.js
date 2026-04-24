import React, { useState, version } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { formatInputDisplay, formatRupiah } from "../../../utils/rupiah";
import { GlobalStyles } from "../../../constants/styles";
import Header from "./Header";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Highlight from "./Highlight";
import TextButton from "./TextButton";
import Result from "./Result";

// Strip dots to get plain number string: "10.000.000" -> "10000000"
const stripFormat = (formatted) => formatted.replace(/\./g, "");

export default function CicilanCalculator() {
  const [uangDisplay, setUangDisplay] = useState(""); // displayed with dots
  const [jumlahBulan, setJumlahBulan] = useState("");
  const [result, setResult] = useState(null);

  function handleUangChange(text) {
    const raw = stripFormat(text).replace(/\D/g, "");
    setUangDisplay(formatInputDisplay(raw));
    setResult(null);
  }

  function handleBulanChange(text) {
    const digits = text.replace(/\D/g, "");
    setJumlahBulan(digits);
    setResult(null);
  }

  function handleHitung() {
    const uang = parseFloat(stripFormat(uangDisplay));
    const bulan = parseFloat(jumlahBulan);

    if (!uangDisplay || isNaN(uang) || uang <= 0) {
      alert("Masukkan jumlah uang yang valid.");
      return;
    }
    if (!jumlahBulan || isNaN(bulan) || bulan <= 0) {
      alert("Masukkan jumlah bulan yang valid.");
      return;
    }

    const bunga = uang * 0.1;
    const total = uang + bunga;
    const perBulan = total / bulan;

    setResult({ uang, bunga, total, perBulan, bulan });
  }

  const handleReset = () => {
    setUangDisplay("");
    setJumlahBulan("");
    setResult(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {/* Highlight Card */}
      {result !== null && (
        <View style={styles.highlightCard}>
          {/* Highlight */}
          <Highlight
            bulan={result.bulan}
            cicilan={formatRupiah(Math.ceil(result.perBulan))}
          />
        </View>
      )}

      <View style={styles.card}>
        {/* Jumlah Uang */}
        <View style={styles.inputGroup}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Jumlah Uang</Text>

            {result !== null && (
              <Pressable
                onPress={handleReset}
                style={[
                  ({ pressed }) => {
                    opacity: pressed ? 0.75 : 1;
                  },
                ]}
              >
                <Text style={styles.deleteButtton}>Hapus</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>Rp</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#c4c9d4"
              keyboardType="numeric"
              value={uangDisplay}
              onChangeText={handleUangChange}
            />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Jumlah Bulan */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Jumlah Bulan</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="0"
              placeholderTextColor="#c4c9d4"
              keyboardType="numeric"
              value={jumlahBulan}
              onChangeText={handleBulanChange}
            />
            <Text style={styles.suffix}>bulan</Text>
          </View>
        </View>
      </View>

      {/* Hitung Button */}
      <TextButton onPress={handleHitung} primary>
        Hitung Cicilan
      </TextButton>

      {/* Result Card */}
      {result !== null && (
        <Result
          uang={result.uang}
          bunga={result.bunga}
          total={result.total}
          bulan={result.bulan}
          perBulan={result.perBulan}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(16),
  },

  // Card
  card: {
    backgroundColor: GlobalStyles.color.CARD,
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    marginBottom: verticalScale(16),
    borderWidth: moderateScale(1),
    borderColor: GlobalStyles.color.BORDER,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: moderateScale(4) },
    elevation: 3,
  },
  deleteButtton: {
    fontSize: moderateScale(18),
    color: "#df1111",
    lineHeight: moderateScale(18),
    fontWeight: "700",
  },
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
  suffix: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: GlobalStyles.color.MUTED,
    marginLeft: scale(8),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: GlobalStyles.color.TEXT,
    paddingVertical: verticalScale(8),
  },
  divider: {
    height: moderateScale(1),
    backgroundColor: GlobalStyles.color.BORDER,
    marginVertical: verticalScale(8),
  },

  highlightCard: {
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(16),
  },
});
