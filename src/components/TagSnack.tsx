import { HStack, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import BoxSnack from "./BoxSnack";

type Props = ComponentProps<typeof HStack> & {
  type: "in" | "out";
};

export default function TagSnack({ type, ...rest }: Props) {
  return (
    <HStack
      bg="$gray200"
      rounded={20}
      py="$2"
      px="$4"
      gap="$2"
      alignItems="center"
      alignSelf="flex-start"
      {...rest}
    >
      <BoxSnack type={type} />
      {type === "in" ? (
        <Text fontSize="$sm">dentro da dieta</Text>
      ) : (
        <Text fontSize="$sm">fora da dieta</Text>
      )}
    </HStack>
  );
}
