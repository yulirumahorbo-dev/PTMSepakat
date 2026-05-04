import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { GlobalStyles } from "../../constants/styles";

export default function MenuIcon({ onPress, iconName, color, label }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: moderateScale(150),
          opacity: pressed ? 0.75 : 1,
          alignItems: "center",
        },
      ]}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={moderateScale(150)}
        color={color}
      />
      <Text
        style={{
          marginTop: verticalScale(-12),
          fontSize: moderateScale(18),
          fontWeight: "800",
          color: GlobalStyles.color.TEXT,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
