import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Pemasukan, Pengeluaran } from "../screens";

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pemasukan" component={Pemasukan} />
      <Stack.Screen name="Pengeluaran" component={Pengeluaran} />
    </Stack.Navigator>
  );
}
