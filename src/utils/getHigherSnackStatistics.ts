import { StorageHistory } from "@storage/historyStorage";

export async function getHigherSnackStatistics() {
  const data = await StorageHistory.getHistory();

  if (data.length === 0) {
    return {
      percentage: '0.00',
      type: "out"
    };
  }
  // Calcular as porcentagens de "in" e "out" da dieta
  const totalMeals = data.reduce(
    (acc, section) => acc + section.data.length,
    0
  ); // Total de refeições
  const inDietMeals = data.reduce(
    (acc, section) =>
      acc + section.data.filter(item => item.selected === "in").length,
    0
  ); // Refeições "in" (dentro da dieta)
  const outDietMeals = totalMeals - inDietMeals; // Refeições "out" (fora da dieta)

  const inDietPercentage = (inDietMeals / totalMeals) * 100;
  const outDietPercentage = (outDietMeals / totalMeals) * 100;

  // Definindo qual porcentagem será exibida
  const higherPercentage =
    inDietPercentage > outDietPercentage ? inDietPercentage : outDietPercentage;

  const type: "in" | "out" =
    inDietPercentage > outDietPercentage ? "in" : "out";
  return {
    percentage: higherPercentage.toFixed(2).toString(),
    type
  };
}
