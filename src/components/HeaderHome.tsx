import { Avatar, AvatarFallbackText, AvatarImage } from "@gluestack-ui/themed";
import { HStack, Image } from "@gluestack-ui/themed";

import Logo from "@assets/Logo.svg";
import { Icon } from "@gluestack-ui/themed";
import { User } from "lucide-react-native";

export default function HeaderHome() {
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Logo width={80} height={80} />
      <Avatar size="md" borderWidth="$1" bg="$gray600">
        <Icon as={User} color="white" size="xl" />
      </Avatar>
    </HStack>
  );
}
