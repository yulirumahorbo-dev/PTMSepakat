import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Input, TextButton } from "../../../components";
import { GlobalStyles } from "../../../constants/styles";
import { formatInputDisplay, formatRupiah } from "../../../utils/rupiah";
import Highlight from "./Highlight";
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
        {result !== null && (
          <Pressable
            onPress={handleReset}
            style={({ pressed }) => [
              {
                alignSelf: "flex-end",
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Text style={styles.deleteButtton}>Hapus</Text>
          </Pressable>
        )}

        <Input
          label="Jumlah Uang"
          prefix="Rp"
          textInputConfig={{
            placeholder: "0",
            keyboardType: "numeric",
            value: uangDisplay,
            onChangeText: handleUangChange,
          }}
        />

        <View style={styles.divider} />

        <Input
          label="Jumlah Bulan"
          suffix="bulan"
          textInputConfig={{
            placeholder: "0",
            keyboardType: "numeric",
            value: jumlahBulan,
            onChangeText: handleBulanChange,
          }}
        />

        <View style={styles.divider} />
      </View>

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
    fontWeight: "700",
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
