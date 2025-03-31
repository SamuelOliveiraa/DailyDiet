import { StorageHistory } from "../storage/historyStorage";
import { StorageSnacks } from "../storage/snackStorage";

export type StatisticProps = {
  length: number;
  out: number;
  in: number;
  sequency: number;
};

export async function getStatistics() {
  const snacks = await StorageSnacks.getSnacks();
  const history = await StorageHistory.getHistory();

  const snacksTypeOfOut = snacks.filter(snack => snack.selected === "out");
  const snacksTypeOfIn = snacks.filter(snack => snack.selected === "in");

  return {
    length: snacks.length,
    out: snacksTypeOfOut.length,
    in: snacksTypeOfIn.length,
    sequency: 0
  };
}
