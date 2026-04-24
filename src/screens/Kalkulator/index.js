import { scale } from "react-native-size-matters";
import { ScreenLayout } from "../../components";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import CicilanCalculator from "./components/CicilanCalculator";
import Header from "./components/Header";
import { GlobalStyles } from "../../constants/styles";

export default function Kalkulator() {
  return (
    <ScreenLayout backgroundColor={GlobalStyles.color.BG} headerShown>
      <Header />

      <CicilanCalculator />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
});
