import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingOverlay() {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#6C47FF" />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
