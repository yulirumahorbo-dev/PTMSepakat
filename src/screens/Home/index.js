import { scale } from "react-native-size-matters";
import { Highlight, ScreenLayout } from "../../components";
import MenuList from "./components/MenuList";
import { Pressable, Text, View } from "react-native";
import { formatRupiah } from "../../utils/rupiah";
import KasCard from "./components/KasCard";

export default function Home({ navigation }) {
  return (
    <ScreenLayout backgroundColor="white" headerShown>
      <KasCard />

      <MenuList />
    </ScreenLayout>
  );
}
