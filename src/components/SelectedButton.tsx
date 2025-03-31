import { Pressable, Text } from "@gluestack-ui/themed";

import BoxSnack from "./BoxSnack";

import { ComponentProps } from "react";

type Props = ComponentProps<typeof Pressable> & {
  type: "in" | "out";
  selected?: "in" | "out";
};

export default function SelectedButton({ type, selected, ...rest }: Props) {
  return (
    <Pressable
      h="$12"
      gap="$2"
      flex={1}
      rounded="$md"
      borderWidth="$1"
      bg={
        selected === "in" && type === "in"
          ? "$green200"
          : selected === "out" && type === "out"
          ? "$red100"
          : "$gray200"
      }
      borderColor={
        selected === "in" && type === "in"
          ? "$green700"
          : selected === "out" && type === "out"
          ? "$red700"
          : "$gray200"
      }
      alignItems="center"
      flexDirection="row"
      justifyContent="center"
      {...rest}
    >
      <BoxSnack type={type} />
      {type === "in" ? <Text>Sim</Text> : <Text>Não</Text>}
    </Pressable>
  );
}
