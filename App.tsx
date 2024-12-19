import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthNavigator } from "./src/navigation/AuthNavigation";
import useAuthStore from "./src/store/authStore";
import { MainNavigator } from "./src/navigation/MainNavigation";

const App: React.FC = () => {
  const token = useAuthStore((state: any) => state.token);

  return (
    <PaperProvider>
      <NavigationContainer>
        {token ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
