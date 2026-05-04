import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Kalkulator, Pemasukan, Pengeluaran, Store } from "../screens";
import { GlobalStyles } from "../constants/styles";

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pemasukan" component={Pemasukan} />
      <Stack.Screen name="Pengeluaran" component={Pengeluaran} />
      <Stack.Screen
        name="Kalkulator"
        component={Kalkulator}
        options={{
          title: "KALKULATOR",
          headerTitleStyle: {
            color: GlobalStyles.color.ACCENT,
            fontWeight: "500",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Store"
        component={Store}
        options={{
          title: "INPUT",
          headerTitleStyle: {
            color: GlobalStyles.color.ACCENT,
            fontWeight: "500",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
