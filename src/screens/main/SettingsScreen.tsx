import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import useAuthStore from "../../store/authStore";

const SettingsScreen: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Paramètres</Text>
      <Button mode="contained" onPress={logout} style={styles.button}>
        Déconnexion
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
  },
});

export default SettingsScreen;
