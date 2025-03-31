import { Box, Heading, HStack, Icon, Pressable } from "@gluestack-ui/themed";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<typeof Box> & {
  text: string;
  children: ReactNode;
};

export default function SnackContainer({ text, children, ...rest }: Props) {
  function handleGoBack() {
    router.push("/");
  }

  return (
    <Box bg="$gray300" flex={1} {...rest}>
      <HStack
        justifyContent="center"
        alignItems="center"
        minHeight="$32"
        maxHeight="$32"
        pt="$10"
        px="$8"
      >
        <Pressable onPress={handleGoBack}  p='$3'>
          <Icon as={ArrowLeft} color="black" size="xl" />
        </Pressable>
        <Heading flex={1} textAlign="center">
          {text}
        </Heading>
      </HStack>

      <Box
        flexGrow={1}
        bg="$white"
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        py="$10"
        px="$6"
      >
        {children}
      </Box>
    </Box>
  );
}
