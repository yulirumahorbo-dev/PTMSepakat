import { ScrollView, StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../constants/styles";

export default function FormContainer({ children }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.card}>{children}</View>
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
});
