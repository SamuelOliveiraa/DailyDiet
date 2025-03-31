import AsyncStorage from "@react-native-async-storage/async-storage";

const SNACKS_STORAGE_KEY = "snacks_key";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { StorageHistory } from "./historyStorage";

export type SnackProps = {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  selected: "in" | "out";
};

async function createSnack(
  name: string,
  description: string,
  date: string,
  time: string,
  selected: "in" | "out"
) {
  try {
    const storageSnacks = await getSnacks();

    if (
      name.trim() === "" ||
      description.trim() === "" ||
      date.trim() === "" ||
      time.trim() === "" ||
      selected.trim() === ""
    ) {
      return new Error(
        "Dados não fonecidos ou incompletos, gentileza tente novamente"
      );
    }

    const formattedDate = date.replace(/\//g, ".");

    const snack: SnackProps = {
      id: uuidv4(),
      name,
      description,
      date: formattedDate,
      time,
      selected
    };

    StorageHistory.createHistory(snack, formattedDate);

    storageSnacks.push(snack);

    await AsyncStorage.setItem(
      SNACKS_STORAGE_KEY,
      JSON.stringify(storageSnacks)
    );
  } catch (error) {
    throw error;
  }
}

async function updateSnack(
  id: string,
  name: string,
  description: string,
  date: string,
  time: string,
  selected: "in" | "out"
) {
  try {
    const storageSnacks = await getSnacks();

    const formattedDate = date.replace(/\//g, ".");

    // Encontrar o índice do snack a ser atualizado
    const snackIndex = storageSnacks.findIndex(
      (snack: SnackProps) => snack.id === id
    );

    if (snackIndex === -1) {
      throw new Error("Snack não encontrado!");
    }

    // Atualizar os dados do snack mantendo o mesmo ID
    storageSnacks[snackIndex] = {
      id, // Mantém o mesmo ID
      name,
      time,
      selected,
      description,
      date: formattedDate
    };

    StorageHistory.updateHistory(storageSnacks[snackIndex], formattedDate);

    // Salvar a lista atualizada no AsyncStorage
    await AsyncStorage.setItem(
      SNACKS_STORAGE_KEY,
      JSON.stringify(storageSnacks)
    );
  } catch (error) {
    throw error;
  }
}

async function getSnacks(): Promise<SnackProps[]> {
  try {
    const storageSnacks = await AsyncStorage.getItem(SNACKS_STORAGE_KEY);

    return storageSnacks ? JSON.parse(storageSnacks) : [];
  } catch (error) {
    throw error;
  }
}

async function getSnackById(id: string) {
  try {
    const storageSnacks = await AsyncStorage.getItem(SNACKS_STORAGE_KEY);

    if (!storageSnacks) {
      return null;
    }

    const snacks: SnackProps[] = JSON.parse(storageSnacks);
    return snacks.find(snack => snack.id === id) ?? null;
  } catch (error) {
    throw error;
  }
}

async function removeSnack(id: string) {
  try {
    const storageSnacks = await AsyncStorage.getItem(SNACKS_STORAGE_KEY);

    if (!storageSnacks) {
      return null;
    }

    const snacks: SnackProps[] = JSON.parse(storageSnacks);

    const removedSnack = snacks.filter(snack => snack.id !== id);

    await AsyncStorage.setItem(
      SNACKS_STORAGE_KEY,
      JSON.stringify(removedSnack)
    );
  } catch (error) {
    throw error;
  }
}

export const StorageSnacks = {
  getSnacks,
  createSnack,
  getSnackById,
  removeSnack,
  updateSnack
};
