import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const { width } = Dimensions.get("window");
const ITEM_SIZE = (width - scale(32)) / 5;

const MENU_ITEMS = [
  {
    id: "Kutipan",
    label: "Kutipan",
    icon: { lib: "MaterialCommunityIcons", name: "file-document-outline" },
    color: "#4F8EF7",
    bg: "#EAF1FF",
  },
  {
    id: "Pengeluaran",
    label: "Pengeluaran",
    icon: { lib: "MaterialCommunityIcons", name: "wallet-outline" },
    color: "#F76B4F",
    bg: "#FFF0ED",
  },
  {
    id: "Kalkulator",
    label: "Kalkulator",
    icon: { lib: "Ionicons", name: "calculator-outline" },
    color: "#4FCF8E",
    bg: "#EAFAF3",
  },
  {
    id: "Store",
    label: "Input Data",
    icon: { lib: "MaterialCommunityIcons", name: "database-edit-outline" },
    color: "#F7C94F",
    bg: "#FFFBEA",
  },
  {
    id: "Pinjaman",
    label: "Pinjaman Baru",
    icon: { lib: "FontAwesome5", name: "hand-holding-usd" },
    color: "#A04FF7",
    bg: "#F5EAFF",
  },
];

const IconComponent = ({ lib, name, size, color }) => {
  if (lib === "MaterialCommunityIcons")
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
  if (lib === "Ionicons")
    return <Ionicons name={name} size={size} color={color} />;
  if (lib === "FontAwesome5")
    return <FontAwesome5 name={name} size={size} color={color} />;
  return null;
};

const MenuItem = ({ item, index, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 80,
      useNativeDriver: true,
      tension: 70,
      friction: 8,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.itemWrapper,
        {
          transform: [{ scale: Animated.multiply(scaleAnim, pressAnim) }],
          opacity: scaleAnim,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => onPress?.(item)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.touchable}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.bg }]}>
          <IconComponent
            lib={item.icon.lib}
            name={item.icon.name}
            size={moderateScale(30)}
            color={item.color}
          />
        </View>
        <Text style={styles.label} numberOfLines={2}>
          {item.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function HomeMenu({ onMenuPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {MENU_ITEMS.map((item, index) => (
          <MenuItem
            key={item.id}
            item={item}
            index={index}
            onPress={onMenuPress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemWrapper: {
    width: ITEM_SIZE,
  },
  touchable: {
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "blue",
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: moderateScale(18),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: verticalScale(4),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
