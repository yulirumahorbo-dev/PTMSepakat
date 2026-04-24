import { scale } from "react-native-size-matters";
import { ScreenLayout } from "../../components";
import { Text, StyleSheet } from "react-native";

export default function Pemasukan() {
  return (
    <ScreenLayout
      backgroundColor="white"
      paddingHorizontal={scale(16)}
      headerShown
    >
      <Text>Pemasukan</Text>
    </ScreenLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
