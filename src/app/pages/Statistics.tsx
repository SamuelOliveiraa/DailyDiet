import StatisticsItem from "@/src/components/statisticsItem";
import { getHigherSnackStatistics } from "@/src/utils/getHigherSnackStatistics";
import { getStatistics, StatisticProps } from "@/src/utils/getStatistics";
import Ilustration from "@assets/Illustration2.svg";

import {
  Box,
  Heading,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";

export default function Statistics() {
  const [percentage, setPercentage] = useState("");
  const [type, setType] = useState("in");
  const [statistics, setStatistics] = useState<StatisticProps>(
    {} as StatisticProps
  );

  async function fetchPercentage() {
    const data = await getStatistics();
    const { percentage, type } = await getHigherSnackStatistics();
    setPercentage(percentage);
    setType(type);
    setStatistics(data);
  }

  function handleGoBack() {
    router.push("/");
  }

  useEffect(() => {
    fetchPercentage();
  }, []);

  return (
    <Box bg={type === "in" ? "$green200" : "$red200"} flex={1}>
      <HStack
        justifyContent="center"
        alignItems="center"
        minHeight="$40"
        maxHeight="$40"
        pt="$10"
        px="$8"
      >
        <Pressable onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="black" size="xl" />
        </Pressable>
        <VStack alignItems="center" justifyContent="center" flex={1}>
          <Heading textAlign="center" fontSize="$3xl">
            {percentage}%
          </Heading>
          <Text fontSize="$sm" fontFamily="$body">
            das refeicoes dentro da dieta
          </Text>
        </VStack>
      </HStack>

      {percentage === "0.00" ? (
        <Box
          py="$10"
          px="$6"
          bg="$white"
          flexGrow={1}
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
        >
          <VStack
            alignSelf="center"
            justifyContent="center"
            alignItems="center"
            gap="$9"
          >
            <Text textAlign="center">
              Não ha estatisticas de refeições registrados ainda. Vamos começar
              hoje?
            </Text>
            <Ilustration width={250} height={250} />
          </VStack>
        </Box>
      ) : (
        <Box
          py="$10"
          px="$6"
          bg="$white"
          flexGrow={1}
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
        >
          <Heading textAlign="center" fontSize="$md">
            Estatisicas Gerais
          </Heading>
          <VStack gap="$4" mt="$3">
            <StatisticsItem
              number={statistics.sequency}
              text="melhor sequência de pratos dentro da dieta"
            />
            <StatisticsItem
              number={statistics.length}
              text="refeições registradas"
            />

            <HStack gap="$4">
              <StatisticsItem
                number={statistics.in}
                text="refeições dentro da dieta"
                type="in"
              />
              <StatisticsItem
                number={statistics.out}
                text="refeições fora da dieta"
                type="out"
              />
            </HStack>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
