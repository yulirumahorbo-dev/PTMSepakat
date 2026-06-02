import { ScreenLayout } from "../../components";
import { GlobalStyles } from "../../constants/styles";
import Header from "./components/Header";
import HomeMenu from "./components/HomeMenu";
import KasCard from "./components/KasCard";

export default function Home({ navigation }) {
  return (
    <ScreenLayout backgroundColor={GlobalStyles.color.BG}>
      <Header />
      <KasCard />

      <HomeMenu onMenuPress={(item) => navigation.navigate(item.id)} />
    </ScreenLayout>
  );
}
