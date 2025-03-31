import { Box } from "@gluestack-ui/themed";

type Props = {
  type: "in" | "out";
};

export default function BoxSnack({ type }: Props) {
  return (
    <Box
      w="$2"
      h="$2"
      rounded="$full"
      bg={type === "in" ? "$green700" : "$red700"}
    />
  );
}
