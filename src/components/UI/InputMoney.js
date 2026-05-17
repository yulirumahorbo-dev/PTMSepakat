import { formatInputDisplay, parseIDR } from "../../utils/rupiah";
import Input from "./Input";

export default function InputMoney({ value, inValid, onChangeValue, ...rest }) {
  const handleChange = (text) => {
    const raw = parseIDR(text).replace(/\D/g, "");
    const formatted = formatInputDisplay(raw);

    onChangeValue?.(raw, formatted);
  };

  return (
    <Input
      label="Jumlah Uang"
      prefix="Rp"
      textInputConfig={{
        placeholder: "0",
        keyboardType: "numeric",
        value: formatInputDisplay(`${value}`),
        onChangeText: handleChange,
        ...rest,
      }}
      inValid={inValid}
    />
  );
}
