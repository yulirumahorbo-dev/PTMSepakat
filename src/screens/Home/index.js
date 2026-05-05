import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { MenuIcon, ScreenLayout } from "../../components";
import { GlobalStyles } from "../../constants/styles";

export default function Home({ navigation }) {
  return (
    <ScreenLayout
      backgroundColor="white"
      paddingHorizontal={scale(16)}
      headerShown
    >
      <MenuIcon
        onPress={() => navigation.navigate("Kalkulator")}
        iconName="calculator-variant"
        label="KALKULATOR"
        color="orange"
      />

      <MenuIcon
        onPress={() => navigation.navigate("Store")}
        iconName="pencil-box-multiple"
        label="INPUT NAMA ANGGOTA"
        color="blue"
      />

      <MenuIcon
        onPress={() => navigation.navigate("Pinjaman")}
        iconName="cash"
        label="PINJAMAN BARU"
        color="red"
      />
    </ScreenLayout>
  );
}
