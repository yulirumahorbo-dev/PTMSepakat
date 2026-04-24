import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ScreenLayout } from "../../components";
import { GlobalStyles } from "../../constants/styles";

export default function Home({ navigation }) {
  return (
    <ScreenLayout
      backgroundColor="white"
      paddingHorizontal={scale(16)}
      headerShown
    >
      <Pressable
        onPress={() => navigation.navigate("Kalkulator")}
        style={({ pressed }) => [
          {
            width: moderateScale(150),
            opacity: pressed ? 0.75 : 1,
            alignItems: "center",
          },
        ]}
      >
        <MaterialCommunityIcons
          name="calculator-variant"
          size={moderateScale(150)}
          color={GlobalStyles.color.ACCENT}
        />
        <Text
          style={{
            marginTop: verticalScale(-12),
            fontSize: moderateScale(18),
            fontWeight: "800",
            color: GlobalStyles.color.TEXT,
          }}
        >
          KALKULATOR
        </Text>
      </Pressable>
    </ScreenLayout>
  );
}
