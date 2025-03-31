import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import Input from "@/src/components/Input";
import SnackContainer from "@/src/components/SnackContainer";

import Button from "@/src/components/Button";
import SelectedButton from "@/src/components/SelectedButton";
import { useToastNotification } from "@/src/hooks/useToastNotification";
import { SnackProps, StorageSnacks } from "@/src/storage/snackStorage";
import { formatDate } from "@/src/utils/dateMask";
import { formatTime } from "@/src/utils/hourMask";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";

type FormEditProps = {
  name: string;
  description: string;
  date: string;
  time: string;
};

const editSchema = yup.object({
  name: yup.string().trim().required("Informe o nome da refeição."),
  description: yup.string().trim().required("Informe a descrição da refeição."),
  date: yup
    .string()
    .trim()
    .required("Informe a data.")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Data inválida. Use o formato DD/MM/YYYY."
    ),
  time: yup
    .string()
    .trim()
    .required("Informe a hora.")
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
      "Hora inválida. Use o formato HH:MM."
    )
});

export default function EditSnack() {
  const { id } = useLocalSearchParams();
  const snackId = String(id);
  const [snack, setSnack] = useState<SnackProps | null>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormEditProps>({
    resolver: yupResolver(editSchema),
    defaultValues: {
      name: "",
      description: "",
      time: "",
      date: ""
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorToast } = useToastNotification();
  const [selectedInput, setSelectedInput] = useState<"in" | "out">("in");

  async function fetchSnackById() {
    const data = await StorageSnacks.getSnackById(snackId);

    if (data) {
      setSnack(data);

      const formattedDate = data?.date.replace(/\./g, "/");

      // Atualiza os valores do formulário
      reset({
        name: data?.name,
        description: data?.description,
        date: formattedDate,
        time: data?.time
      });

      // Atualiza o botão selecionado
      setSelectedInput(data.selected);
    }
  }

  async function handlePutSnack({
    name,
    description,
    date,
    time
  }: FormEditProps) {
    try {
      setIsLoading(true);
      await StorageSnacks.updateSnack(
        snackId,
        name,
        description,
        date,
        time,
        selectedInput
      );

      router.push({ pathname: "/pages/ViewSnack", params: { id: snackId } });
    } catch (error) {
      showErrorToast(
        "Não foi possivel atualizar esta refeição, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSnackById();
  }, []);

  return (
    <SnackContainer
      text="Editar Refeição"
      bg={snack?.selected === "in" ? "$green200" : "$red200"}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {snack ? (
            <>
              <VStack flex={1} gap="$3">
                <VStack gap="$3">
                  <Text>Nome</Text>

                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        returnKeyType="next"
                        autoCapitalize="none"
                        onChangeText={onChange}
                        value={value}
                        errorMessage={errors.name?.message}
                      />
                    )}
                  />
                </VStack>
                <VStack gap="$3">
                  <Text>Descrição</Text>

                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onChangeText={onChange}
                        errorMessage={errors.description?.message}
                      />
                    )}
                  />
                </VStack>
                <HStack gap="$3">
                  <VStack gap="$3" flex={1}>
                    <Text>Data</Text>

                    <Controller
                      name="date"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          value={value}
                          returnKeyType="next"
                          keyboardType="numeric"
                          autoCapitalize="none"
                          onChangeText={text => onChange(formatDate(text))}
                          errorMessage={errors.date?.message}
                        />
                      )}
                    />
                  </VStack>
                  <VStack gap="$3" flex={1}>
                    <Text>Hora</Text>
                    <Controller
                      name="time"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          returnKeyType="done"
                          onSubmitEditing={Keyboard.dismiss}
                          value={value}
                          keyboardType="numeric"
                          autoCapitalize="none"
                          onChangeText={text => onChange(formatTime(text))}
                          errorMessage={errors.time?.message}
                        />
                      )}
                    />
                  </VStack>
                </HStack>
                <VStack gap="$3">
                  <Text>Está dentro da Refeição?</Text>
                  <HStack gap="$3">
                    <SelectedButton
                      type="in"
                      selected={selectedInput}
                      onPress={() => setSelectedInput("in")}
                    />
                    <SelectedButton
                      type="out"
                      selected={selectedInput}
                      onPress={() => setSelectedInput("out")}
                    />
                  </HStack>
                </VStack>
              </VStack>
            </>
          ) : (
            <Text>Carregando...</Text>
          )}

          <Button
            loading={isLoading}
            isDisabled={isLoading}
            title="Editar Refeição"
            onPress={handleSubmit(handlePutSnack)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SnackContainer>
  );
}
