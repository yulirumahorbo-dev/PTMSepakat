import { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { scale } from "react-native-size-matters";
import { ScreenLayout, TextButton } from "../../components";
import KutipanForm from "./components/KutipanForm";
import useContributions from "../../hooks/useContributions";
import ContributionsList from "./components/ContributionsList";

export default function Kutipan({ onSuccess }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { contributions } = useContributions();

  return (
    <ScreenLayout
      backgroundColor="white"
      paddingHorizontal={scale(16)}
      headerShown
    >
      <TextButton onPress={() => setModalVisible(true)} primary>
        + Kutipan Baru
      </TextButton>

      <ContributionsList contributions={contributions} />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <KutipanForm
          key={String(modalVisible)}
          onCancel={() => setModalVisible(false)}
          onSuccess={() => setModalVisible(false)}
        />
      </Modal>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
  },
});
