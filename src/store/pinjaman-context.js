import { createContext, useState } from "react";

export const PinjamanContext = createContext();

export default function PinjamanContextProvider({ children }) {
  const [pinjamanData, setInputData] = useState({
    nama: "",
    tanggal: "",
    jumlahUang: "",
    jumlahBulan: "",
  });

  function updateInput(field, value) {
    setInputData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function clearField(field) {
    setInputData((prev) => ({
      ...prev,
      [field]: typeof prev[field] === "object" ? {} : "",
    }));
  }

  function clearInput() {
    setInputData({
      nama: "",
      tanggal: "",
      jumlahUang: "",
      jumlahBulan: "",
    });
  }

  return (
    <PinjamanContext.Provider
      value={{
        pinjamanData,
        updateInput,
        clearField,
        clearInput,
      }}
    >
      {children}
    </PinjamanContext.Provider>
  );
}
