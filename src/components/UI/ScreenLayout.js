import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getEdges = (headerShown, bottomTabs) => {
  if (headerShown && bottomTabs) return ["left", "right"];
  if (headerShown && !bottomTabs) return ["bottom", "left", "right"];
  return ["top", "bottom", "left", "right"];
};

export default function ScreenLayout({
  children,
  backgroundColor,
  paddingHorizontal,
  headerShown,
  bottomTabs,
}) {
  const edges = getEdges(headerShown, bottomTabs);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          paddingHorizontal: paddingHorizontal,
        },
      ]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
