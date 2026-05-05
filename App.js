import { NavigationContainer } from "@react-navigation/native";
import Root from "./src/navigation/Root";
import InputContextProvider from "./src/store/input-context";
import PinjamanContextProvider from "./src/store/pinjaman-context";

export default function App() {
  return (
    <InputContextProvider>
      <PinjamanContextProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </PinjamanContextProvider>
    </InputContextProvider>
  );
}
