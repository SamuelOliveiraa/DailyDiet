# Daily Diet

![Project Image](/src/assets/og-image.png)

Daily Diet is a mobile application developed in React Native for controlling daily meals, allowing the user to register, edit, delete, and view statistics about their diet, tracking whether they are on or off the diet.

## Features

- Register, edit, and delete meals
- Meal history grouped by date
- Performance statistics (percentage on/off diet, sequence, totals)
- Visual feedback when registering meals on or off the diet
- Modern interface using Gluestack UI
- Form validation with Yup and React Hook Form

## Project Structure

```
src/
  app/
    pages/           # Main screens (Home, New Meal, Edit, Statistics, etc.)
  components/        # Reusable components (Button, ModalSnack, SnackContainer, etc.)
  hooks/             # Custom hooks (e.g., useToastNotification)
  storage/           # Persistence logic (snackStorage, historyStorage)
  utils/             # Utility functions (masks, statistics)
  @types/            # Global typings
config/
  theme/             # Gluestack UI theme customization
```

## Technologies Used

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Gluestack UI](https://ui.gluestack.io/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Lucide React Native](https://lucide.dev/)
- [UUID](https://www.npmjs.com/package/uuid)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/DailyDiet.git
   cd DailyDiet
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Run the project:
   ```sh
   npx expo start
   ```

## Scripts

- `npm run start` — Starts the Expo project
- `npm run build` — (If applicable) Build the project

## Screen Structure

- **Home:** Overview and quick statistics
- **New Meal:** Register a new meal
- **Edit Meal:** Change data of an existing meal
- **View Meal:** Details, editing, and deletion
- **Statistics:** Detailed user performance
- **Feedback:** Success screens when registering meals

## Notes

- The project uses date validation in DD/MM/YYYY format and time in HH:MM format.
- Meals are stored locally using AsyncStorage.
- The theme can be customized in `theme`.

## License

This project is under the MIT license.

---

Feel free to contribute or suggest improvements!
