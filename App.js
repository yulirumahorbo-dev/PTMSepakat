import { NavigationContainer } from "@react-navigation/native";
import Root from "./src/navigation/Root";
import InputContextProvider from "./src/store/input-context";

export default function App() {
  return (
    <InputContextProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </InputContextProvider>
  );
}
