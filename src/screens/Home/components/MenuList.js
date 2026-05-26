import { useNavigation } from "@react-navigation/native";
import { MenuIcon } from "../../../components";
import { ScrollView } from "react-native";

export default function MenuList() {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <MenuIcon
        onPress={() => navigation.navigate("Kutipan")}
        iconName="cash-plus"
        label="KUTIPAN"
        color="green"
      />
      <MenuIcon
        onPress={() => navigation.navigate("Pengeluaran")}
        iconName="cash-minus"
        label="PENGELUARAN"
        color="red"
      />
      <MenuIcon
        onPress={() => navigation.navigate("Kalkulator")}
        iconName="calculator-variant"
        label="KALKULATOR"
        color="orange"
      />
      <MenuIcon
        onPress={() => navigation.navigate("Store")}
        iconName="pencil-box-multiple"
        label="INPUT NAMA ANGGOTA"
        color="blue"
      />
      <MenuIcon
        onPress={() => navigation.navigate("Pinjaman")}
        iconName="cash"
        label="PINJAMAN BARU"
        color="red"
      />
    </ScrollView>
  );
}
