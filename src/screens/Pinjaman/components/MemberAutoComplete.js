import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Input } from "../../../components";
import { GlobalStyles } from "../../../constants/styles";

export default function MemberAutocomplete({
  value,
  onChangeText,
  onSelect,
  inValid,
  members = [],
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const isSelectingRef = useRef(false);

  useEffect(() => {
    if (isSelectingRef.current) return;

    const filtered = value.trim()
      ? members.filter((m) =>
          m.name.toLowerCase().includes(value.toLowerCase()),
        )
      : [];

    setSuggestions(filtered);
    setShowDropdown(filtered.length > 0);
  }, [value, members]);

  function handleSelect(member) {
    isSelectingRef.current = true;
    onSelect(member);
    setShowDropdown(false);
    Keyboard.dismiss();
    requestAnimationFrame(() => {
      isSelectingRef.current = false;
    });
  }

  return (
    <View style={styles.wrapper}>
      <Input
        label="Nama"
        inValid={inValid}
        textInputConfig={{
          placeholder: "Alexander Silalahi",
          value,
          onChangeText,
          onFocus: () => setShowDropdown(suggestions.length > 0),
          onBlur: () => {
            if (!isSelectingRef.current) setShowDropdown(false);
          },
        }}
      />

      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            scrollEnabled={false}
            data={suggestions}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                onTouchStart={() => {
                  isSelectingRef.current = true;
                }}
                onPress={() => handleSelect(item)}
                style={({ pressed }) => [
                  styles.suggestionItem,
                  pressed && styles.suggestionItemPressed,
                ]}
              >
                <Text style={styles.suggestionName}>{item.name}</Text>
                <Text style={styles.suggestionRole}>{item.role}</Text>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    zIndex: 999,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: GlobalStyles.color.CARD,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: GlobalStyles.color.BORDER,
    maxHeight: verticalScale(180),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: moderateScale(4) },
    elevation: 6,
    overflow: "hidden",
  },
  suggestionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(10),
  },
  suggestionItemPressed: {
    backgroundColor: GlobalStyles.color.BORDER,
  },
  suggestionName: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: GlobalStyles.color.TEXT,
  },
  suggestionRole: {
    fontSize: moderateScale(12),
    color: GlobalStyles.color.MUTED,
  },
  separator: {
    height: 1,
    backgroundColor: GlobalStyles.color.BORDER,
  },
});
