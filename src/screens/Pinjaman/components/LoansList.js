import { FlatList, StyleSheet, Text } from "react-native";
import LoansItem from "./LoansItem";
import { verticalScale } from "react-native-size-matters";

export default function LoansList({ loans }) {
  function renderLoanItem(itemData) {
    return <LoansItem {...itemData.item} />;
  }

  return (
    <FlatList
      data={loans}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderLoanItem}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.empty}>No loans yet.</Text>}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: verticalScale(16), gap: verticalScale(12) },
  empty: { textAlign: "center", color: "#aaa", marginTop: verticalScale(40) },
});
