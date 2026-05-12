import { scale } from "react-native-size-matters";
import { ScreenLayout } from "../../components";
import MenuList from "./components/MenuList";

export default function Home({ navigation }) {
  return (
    <ScreenLayout
      backgroundColor="white"
      paddingHorizontal={scale(16)}
      headerShown
    >
      <MenuList />
    </ScreenLayout>
  );
}
