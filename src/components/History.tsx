import HistoryCard from "@components/HistoryCard";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";
import { HistoryProps, StorageHistory } from "../storage/historyStorage";

export default function History() {
  const [historySnacks, setHistorySnacks] = useState<HistoryProps[]>([]);

  async function fetchHistoryData() {
    const data = await StorageHistory.getHistory();
    setHistorySnacks(data);
  }

  function handleViewSnack(id: string) {
    router.push({ pathname: "/pages/ViewSnack", params: { id } });
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistoryData();
    }, [])
  );

  return (
    <VStack flex={1} mt="$10">
      <SectionList
        sections={historySnacks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HistoryCard data={item} onPress={() => handleViewSnack(item.id)} />
        )}
        renderSectionHeader={({ section }) => (
          <Heading
            fontSize="$xl"
            color="$gray700"
            fontFamily="$heading"
            my="$3"
          >
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          historySnacks.length === 0 && {
            marginTop: 20,
            justifyContent: "center"
          }
        }
        ListEmptyComponent={() => (
          <Text textAlign="center" color="$gray700">
            Não ha refeições registrados ainda. Vamos começar hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
