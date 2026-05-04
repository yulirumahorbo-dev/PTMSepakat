import { createContext, useState } from "react";

export const InputContext = createContext();

export default function InputContextProvider({ children }) {
  const [inputData, setInputData] = useState({
    nama: "",
    jabatan: "",
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
      jabatan: "",
    });
  }

  return (
    <InputContext.Provider
      value={{
        inputData,
        updateInput,
        clearField,
        clearInput,
      }}
    >
      {children}
    </InputContext.Provider>
  );
}
