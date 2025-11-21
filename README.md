# Daily Diet

![Imagem do Projeto](/src/assets/og-image.png)


Daily Diet é um aplicativo mobile desenvolvido em React Native para controle de refeições diárias, permitindo ao usuário registrar, editar, excluir e visualizar estatísticas sobre sua alimentação, acompanhando se está dentro ou fora da dieta.

## Funcionalidades

- Cadastro, edição e exclusão de refeições
- Histórico de refeições agrupadas por data
- Estatísticas de desempenho (porcentagem dentro/fora da dieta, sequência, totais)
- Feedback visual ao cadastrar refeições dentro ou fora da dieta
- Interface moderna utilizando Gluestack UI
- Validação de formulários com Yup e React Hook Form

## Estrutura do Projeto

```
src/
  app/
    pages/           # Telas principais (Home, Nova Refeição, Editar, Estatísticas, etc)
  components/        # Componentes reutilizáveis (Button, ModalSnack, SnackContainer, etc)
  hooks/             # Hooks customizados (ex: useToastNotification)
  storage/           # Lógica de persistência (snackStorage, historyStorage)
  utils/             # Funções utilitárias (máscaras, estatísticas)
  @types/            # Tipagens globais
config/
  theme/             # Customização de tema Gluestack UI
```

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Gluestack UI](https://ui.gluestack.io/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Lucide React Native](https://lucide.dev/)
- [UUID](https://www.npmjs.com/package/uuid)

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/DailyDiet.git
   cd DailyDiet
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Rode o projeto:
   ```sh
   npx expo start
   ```

## Scripts

- `npm run start` — Inicia o projeto Expo
- `npm run build` — (Se aplicável) Build do projeto

## Estrutura de Telas

- **Home:** Visão geral e estatísticas rápidas
- **Nova Refeição:** Cadastro de uma nova refeição
- **Editar Refeição:** Alteração de dados de uma refeição existente
- **Visualizar Refeição:** Detalhes, edição e exclusão
- **Estatísticas:** Detalhamento do desempenho do usuário
- **Feedback:** Telas de sucesso ao cadastrar refeições

## Observações

- O projeto utiliza validação de data no formato DD/MM/YYYY e hora no formato HH:MM.
- As refeições são armazenadas localmente usando AsyncStorage.
- O tema pode ser customizado em theme.

## Licença

Este projeto está sob a licença MIT.

---

Sinta-se à vontade para contribuir ou sugerir melhorias!
