import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "react-native";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@/config/gluestack-ui.config";

import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
  useFonts
} from "@expo-google-fonts/nunito-sans";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync(); // Impede que a Splash Screen suma automaticamente

export default function layout() {
  const [fontsLoaded] = useFonts({ NunitoSans_400Regular, NunitoSans_700Bold });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Esconde a Splash Screen quando tudo estiver carregado
    }
  }, [fontsLoaded]);

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <Stack screenOptions={{ headerShown: false, animation: 'simple_push' }} />
    </GluestackUIProvider>
  );
}
