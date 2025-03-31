import {
  Button as GlueStackButton,
  Icon,
  Spinner,
  Text
} from "@gluestack-ui/themed";
import { LucideIcon } from "lucide-react-native";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GlueStackButton> & {
  title: string;
  type?: "primary" | "secondary";
  loading?: boolean;
  IconProps?: LucideIcon;
};

export default function Button({
  title,
  type = "primary",
  loading,
  IconProps,
  ...rest
}: Props) {
  return (
    <GlueStackButton
      h="$16"
      gap="$3"
      rounded="$md"
      borderWidth="$1"
      borderColor="$gray600"
      bg={type === "secondary" ? "" : "$gray600"}
      sx={{
        opacity: 1, // Reduz a opacidade
      }}
      {...rest}
    >
      {loading ? (
        <Spinner color="$white" />
      ) : (
        <>
          {IconProps && (
            <Icon
              as={IconProps}
              size="xl"
              color={type === "secondary" ? "$black" : "$white"}
            />
          )}
          <Text
            color={type === "secondary" ? "$black" : "$white"}
            fontSize="$md"
            fontWeight="$bold"
          >
            {title}
          </Text>
        </>
      )}
    </GlueStackButton>
  );
}
