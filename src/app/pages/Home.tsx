import { router } from "expo-router";

import Button from "@components/Button";
import HeaderHome from "@components/HeaderHome";

import History from "@/src/components/History";
import StatisticHome from "@/src/components/StatisticHome";
import { Box, Text } from "@gluestack-ui/themed";
import { Plus } from "lucide-react-native";

export default function Home() {
  return (
    <Box flex={1} px="$5" py="$10">
      <HeaderHome />
      <StatisticHome />
      <Text color="$gray700" fontSize="$lg" mb="$3">
        Refeições
      </Text>
      <Button
        title="Nova Refeição"
        IconProps={Plus}
        onPress={() => router.push("/pages/NewSnack")}
      />

      <History />
    </Box>
  );
}
