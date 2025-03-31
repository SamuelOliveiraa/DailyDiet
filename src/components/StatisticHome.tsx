import { Icon, Pressable, Text } from "@gluestack-ui/themed";
import { getHigherSnackStatistics } from "@utils/getHigherSnackStatistics";
import { router, useFocusEffect } from "expo-router";
import { ArrowUpRight } from "lucide-react-native";
import { useCallback, useState } from "react";

export default function StatisticHome() {
  const [percentageHome, setPercentageHome] = useState("0.00");
  const [typeHome, setTypeHome] = useState("in");

  async function fetchPercentage() {
    const { percentage, type } = await getHigherSnackStatistics();
    setPercentageHome(percentage);
    setTypeHome(type);
  }

  useFocusEffect(
    useCallback(() => {
      fetchPercentage();
    }, [])
  );

  return (
    <Pressable
      h="$32"
      mb="$10"
      bg={typeHome === "in" ? "$green200" : "$red200"}
      sx={{
        shadowColor: "#00000071", // Cor da sombra
        shadowOffset: { width: 10, height: 10 }, // Direção da sombra
        shadowOpacity: 10, // Opacidade da sombra
        shadowRadius: 10, // Suavidade da sombra
        elevation: 2 // Sombras no Android
      }}
      borderRadius={8}
      alignItems="center"
      justifyContent="center"
      onPress={() => router.push("/pages/Statistics")}
    >
      <Text fontSize="$4xl" fontFamily="$heading" fontWeight="$bold">
        {percentageHome}%
      </Text>
      <Text fontSize="$sm" fontFamily="$body" w="$full" textAlign="center">
        das refeições dentro da dieta
      </Text>
      <Icon
        top="$1"
        size="xl"
        right="$1"
        color={typeHome === "in" ? "$green600" : "$red600"}
        as={ArrowUpRight}
        position="absolute"
      />
    </Pressable>
  );
}
