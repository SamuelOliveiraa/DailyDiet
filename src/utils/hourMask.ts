export const formatTime = (text: string) => {
  // Remove todos os caracteres que não são números
  let cleaned = text.replace(/\D/g, "");

  // Limita o número de caracteres a 4 (HHmm)
  if (cleaned.length > 4) {
    cleaned = cleaned.slice(0, 4);
  }

  // Formata a hora com os dois pontos (HH:mm)
  let formatted = cleaned;
  if (cleaned.length > 2) {
    formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`;
  }

  return formatted;
};
