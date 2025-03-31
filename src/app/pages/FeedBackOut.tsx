import Ilustration from "@assets/Illustration2.svg";
import Button from "@components/Button";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { router } from "expo-router";

export default function FeedBackOut() {
  function handleBackHome() {
    router.push("/");
  }
  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Heading
        color="$red900"
        fontFamily="$heading"
        fontSize="$2xl"
        textAlign="center"
      >
        Que pena!
      </Heading>
      <Text my="$2" fontFamily="$body" mb="$10" textAlign="center">
        Você{" "}
        <Text fontWeight="$bold" color="$gray600">
          saiu da dieta
        </Text>{" "}
        dessa vez, mas continue se esforçando e não desista!
      </Text>
      <Ilustration />
      <Button
        w="$64"
        mt="$6"
        onPress={handleBackHome}
        title="Ir para a página inicial"
      />
    </VStack>
  );
}
