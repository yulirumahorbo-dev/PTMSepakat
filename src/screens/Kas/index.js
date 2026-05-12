import { View, Text, StyleSheet } from "react-native";

export default function Kas() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
