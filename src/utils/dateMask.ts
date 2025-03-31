export const formatDate = (text: string) => {
  let cleaned = text.replace(/\D/g, ""); // Remove tudo que não for número

  if (cleaned.length > 8) {
    cleaned = cleaned.slice(0, 8); // Garante que não passe de 8 caracteres
  }

  let formatted = cleaned;
  if (cleaned.length > 2) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }
  if (cleaned.length > 4) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
      4
    )}`;
  }

  return formatted;
};
