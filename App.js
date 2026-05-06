import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import Root from "./src/navigation/Root";
import store from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}
