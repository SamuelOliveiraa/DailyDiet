import { router, useLocalSearchParams } from "expo-router";
import { PenLine, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";

import Button from "@/src/components/Button";
import SnackContainer from "@/src/components/SnackContainer";
import TagSnack from "@/src/components/TagSnack";
import ModalSnack from "@/src/components/ModalSnack";

import { Box, Heading, Text, VStack } from "@gluestack-ui/themed";
import { SnackProps, StorageSnacks } from "@/src/storage/snackStorage";

export default function ViewSnack() {
  const [modal, setModal] = useState(false);
  const { id } = useLocalSearchParams();
  const snackId = String(id);
  const [snack, setSnack] = useState<SnackProps | null>();

  async function fetchSnackById() {
    const data = await StorageSnacks.getSnackById(snackId);

    setSnack(data);
  }

  function handleEditSnack() {
    router.push({ pathname: "/pages/EditSnack", params: { id } });
  }

  function handleToggleSnack() {
    setModal(!modal);
  }

  useEffect(() => {
    fetchSnackById();
  }, []);

  return (
    <SnackContainer
      text="Refeição"
      bg={snack?.selected === "in" ? "$green200" : "$red100"}
    >
      {snack ? (
        <>
          <VStack mb="$5">
            <Heading>{snack.name}</Heading>
            <Text>{snack.description}</Text>
          </VStack>
          <VStack>
            <Heading fontSize="$md">Data e hora</Heading>
            <Text>
              {snack.date} às {snack.time}{" "}
            </Text>
          </VStack>
          <TagSnack type={snack.selected} mt="$5" />
          <Box gap="$3" flex={1} justifyContent="flex-end">
            <Button
              title="Editar Refeição"
              IconProps={PenLine}
              onPress={handleEditSnack}
            />
            <Button
              title="Excluir refeição"
              IconProps={Trash2}
              type="secondary"
              onPress={handleToggleSnack}
            />
          </Box>
          <ModalSnack id={snackId} modal={modal} setModal={setModal} />
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </SnackContainer>
  );
}
