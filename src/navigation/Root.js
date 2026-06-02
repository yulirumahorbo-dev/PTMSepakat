import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyles } from "../constants/styles";
import {
  Home,
  Kalkulator,
  Kas,
  Kutipan,
  Pengeluaran,
  Pinjaman,
  Store,
} from "../screens";

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Kas" component={Kas} />
      <Stack.Screen name="Kutipan" component={Kutipan} />
      <Stack.Screen
        name="Pengeluaran"
        component={Pengeluaran}
        options={{
          title: "PENGELUARAN",
          headerTitleStyle: {
            color: "red",
            fontWeight: "500",
          },
          headerShadowVisible: false,
        }}
      />
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
      <Stack.Screen
        name="Pinjaman"
        component={Pinjaman}
        options={{
          title: "PINJAMAN",
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
