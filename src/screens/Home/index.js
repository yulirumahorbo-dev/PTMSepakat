import { ScreenLayout } from "../../components";
import HomeMenu from "./components/HomeMenu";
import KasCard from "./components/KasCard";

export default function Home({ navigation }) {
  return (
    <ScreenLayout backgroundColor="white" headerShown>
      <KasCard />

      <HomeMenu onMenuPress={(item) => navigation.navigate(item.id)} />
    </ScreenLayout>
  );
}
