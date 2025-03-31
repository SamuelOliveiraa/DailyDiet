import { Box, HStack, Text, Pressable } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { SnackProps } from "../storage/snackStorage";

type Props = ComponentProps<typeof Pressable> & {
  data: SnackProps;
};

export default function HistoryCard({ data, ...rest }: Props) {
  return (
    <Pressable {...rest}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        borderWidth="$1"
        borderColor="$gray300"
        rounded="$md"
        my="$2"
        p="$4"
      >
        <Text>20:00 | </Text>
        <Text flex={1} numberOfLines={1}>
          {data.name}
        </Text>
        <Box
          rounded="$full"
          w="$4"
          h="$4"
          bg={data.selected == "in" ? "$green500" : "$red500"}
        />
      </HStack>
    </Pressable>
  );
}
