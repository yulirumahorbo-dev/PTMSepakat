import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ScreenLayout } from "../../components";
import { GlobalStyles } from "../../constants/styles";
import LoanForm from "./components/LoanForm";

export default function Pinjaman() {
  return (
    <ScreenLayout
      backgroundColor={GlobalStyles.color.BG}
      paddingHorizontal={scale(16)}
      headerShown
    >
      <LoanForm />
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
