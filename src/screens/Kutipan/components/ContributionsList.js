import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../../constants/styles";
import { formatRupiah } from "../../../utils/rupiah";

export default function ContributionsList({ contributions }) {
  return (
    <FlatList
      data={contributions}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <Pressable style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.date}</Text>
          <Text>JUMLAH UANG YANG SUDAH TERKUMPUL</Text>
          <Text style={styles.totalMoney}>{formatRupiah(1200000)}</Text>
          <Text>SUDAH:</Text>
          <Text>BELUM:</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.color.ACCENT + "15",
    borderRadius: moderateScale(14),
    padding: moderateScale(18),
    borderWidth: moderateScale(1.5),
    borderColor: GlobalStyles.color.ACCENT + "50",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  title: {
    fontSize: moderateScale(16),
    color: "#b45309",
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: verticalScale(4),
  },
  totalMoney: {
    fontSize: moderateScale(28),
    fontWeight: "800",
    color: "#b45309",
  },
});
