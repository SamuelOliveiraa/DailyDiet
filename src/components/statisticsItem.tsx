import { Box, Text } from "@gluestack-ui/themed";

type Props = {
  text: string;
  number: number;
  type?: "in" | "out";
};

export default function StatisticsItem({ number, text, type }: Props) {
  return (
    <Box
      p="$4"
      flex={1}
      borderRadius={5}
      minHeight="$24"
      maxHeight="$24"
      alignItems="center"
      justifyContent="center"
      bg={type === "in" ? "$green200" : type === "out" ? "$red200" : "$gray200"}
    >
      <Text fontSize="$2xl">{number}</Text>
      <Text textAlign="center" fontSize="$sm" fontFamily="$heading">
        {text}
      </Text>
    </Box>
  );
}
