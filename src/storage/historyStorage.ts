import AsyncStorage from "@react-native-async-storage/async-storage";
import { SnackProps } from "./snackStorage";

const HISTORY_STORAGE_KEY = "history_key";

import "react-native-get-random-values";

export type HistoryProps = {
  title: string;
  data: SnackProps[];
};

function sortByDate(storage: HistoryProps[]) {
  storage.sort((a, b) => {
    const dateA = a.title.split(".").reverse().join(""); // Mantém a formatação original sem alterar o ponto
    const dateB = b.title.split(".").reverse().join("");
    return dateB.localeCompare(dateA); // Compara como string sem alterar o formato
  });

  return storage;
}

async function getHistory(): Promise<HistoryProps[]> {
  try {
    const storageHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);

    return storageHistory ? JSON.parse(storageHistory) : [];
  } catch (error) {
    throw error;
  }
}

async function createHistory(snack: SnackProps, date: string) {
  try {
    const storageHistory = await getHistory();

    const existingIndex = storageHistory.findIndex(item => item.title === date);

    if (existingIndex !== -1) {
      storageHistory[existingIndex].data.push(snack);
    } else {
      storageHistory.push({ title: date, data: [snack] });
    }

    const historySortedByDate = sortByDate(storageHistory);

    await AsyncStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(historySortedByDate)
    );
  } catch (error) {
    throw error;
  }
}

async function updateHistory(snack: SnackProps, date: string) {
  try {
    const storageHistory = await getHistory();

    // Remove o snack de qualquer data antiga
    const storageHistoryUpdated = storageHistory
      .map(item => ({
        ...item,
        data: item.data.filter(snackHistory => snackHistory.id !== snack.id)
      }))
      .filter(item => item.data.length > 0); // Remove datas vazias

    const dataIndex = storageHistoryUpdated.findIndex(
      item => item.title === date
    );

    if (dataIndex !== -1) {
      storageHistoryUpdated[dataIndex].data.push(snack);
    } else {
      storageHistoryUpdated.push({ title: date, data: [snack] });
    }

    const historySortedByDate = sortByDate(storageHistoryUpdated);

    await AsyncStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(historySortedByDate)
    );
  } catch (error) {
    throw error;
  }
}

async function removedHistory(id: string) {
  try {
    const storageHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);

    if (!storageHistory) {
      return null;
    }

    const historys: HistoryProps[] = JSON.parse(storageHistory);

    const updatedHistory = historys.filter(
      (historyItem: HistoryProps) =>
        (historyItem.data = historyItem.data.filter(snack => snack.id !== id))
          .length
    );

    const historySortedByDate = sortByDate(updatedHistory);

    await AsyncStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(historySortedByDate)
    );
  } catch (error) {
    throw error;
  }
}

export const StorageHistory = {
  getHistory,
  createHistory,
  removedHistory,
  updateHistory
};
