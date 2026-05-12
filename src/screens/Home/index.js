import { scale } from "react-native-size-matters";
import { ScreenLayout } from "../../components";
import MenuList from "./components/MenuList";
import { Pressable, Text } from "react-native";

export default function Home({ navigation }) {
  return (
    <ScreenLayout
      backgroundColor="white"
      paddingHorizontal={scale(16)}
      headerShown
    >
      <Pressable onPress={() => navigation.navigate("Kas")}>
        <Text>SALDO KAS</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Kas")}>
        <Text>UANG DI TANGAN BENDAHARA</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Kas")}>
        <Text>UANG DI TANGAN ANGGOTA</Text>
      </Pressable>

      <MenuList />
    </ScreenLayout>
  );
}
