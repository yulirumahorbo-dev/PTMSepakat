import { useNavigation } from "@react-navigation/native";
import { MenuIcon } from "../../../components";

export default function MenuList() {
  const navigation = useNavigation();
  return (
    <>
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
    </>
  );
}
