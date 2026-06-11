import { Modal, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Highlight, ScreenLayout, TextButton } from "../../components";
import { GlobalStyles } from "../../constants/styles";
import LoanForm from "./components/LoanForm";
import LoansList from "./components/LoansList";
import useLoans from "../../hooks/useLoans";
import { formatInputDisplay } from "../../utils/rupiah";
import { useState } from "react";

export default function Pinjaman() {
  const [modalVisible, setModalVisible] = useState(false);
  const { loans, total } = useLoans();
  return (
    <ScreenLayout
      backgroundColor={GlobalStyles.color.BG}
      headerShown
      paddingHorizontal={scale(16)}
    >
      <Highlight
        label="Total Uang di Anggota"
        value={`Rp${formatInputDisplay(`${total}`)}`}
      />

      <TextButton onPress={() => setModalVisible(true)} primary>
        + Pinjaman Baru
      </TextButton>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <LoanForm
          key={String(modalVisible)}
          onCancel={() => setModalVisible(false)}
          onSuccess={() => setModalVisible(false)}
        />
      </Modal>

      <LoansList loans={loans} />
    </ScreenLayout>
  );
}
const styles = StyleSheet.create({
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
});
