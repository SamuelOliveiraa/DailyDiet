import Ilustration from "@assets/Illustration.svg";
import Button from "@components/Button";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { router } from "expo-router";

export default function FeedBackIn() {
  function handleBackHome() {
    router.push("/");
  }
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" px="$6">
      <Heading
        color="$green900"
        fontFamily="$heading"
        fontSize="$2xl"
        w="$full"
        textAlign="center"
      >
        Continue assim!
      </Heading>
      <Text my="$2" fontFamily="$body" mb="$10" textAlign="center">
        Você continua{" "}
        <Text fontWeight="$bold" color="$gray600">
          dentro da dieta
        </Text>
        . Muito bem!
      </Text>
      <Ilustration />
      <Button
        title="Ir para a página inicial"
        w="$64"
        mt="$6"
        onPress={handleBackHome}
      />
    </VStack>
  );
}
