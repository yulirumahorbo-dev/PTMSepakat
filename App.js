import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import Root from "./src/navigation/Root";
import store from "./src/store";
import PinjamanContextProvider from "./src/store/pinjaman-context";

export default function App() {
  return (
    <Provider store={store}>
      <PinjamanContextProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </PinjamanContextProvider>
    </Provider>
  );
}
