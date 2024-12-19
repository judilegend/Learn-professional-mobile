import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Title, Text, useTheme } from "react-native-paper";
import { AuthNavigationProp } from "../../navigation/types";
import { LinearGradient } from "expo-linear-gradient";
import useAuthStore from "../../store/authStore";

type RegisterScreenProps = {
  navigation: AuthNavigationProp;
};

const { width } = Dimensions.get("window");

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const theme = useTheme();
  //definir  le store register
  const { register, isLoading, error } = useAuthStore();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      // Handle password mismatch
      return;
    }
    await register(email, password);
  };

  return (
    <LinearGradient colors={["#4A90E2", "#50C878"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.headerContainer}>
          <Title style={styles.title}>Créer un compte</Title>
          <Text style={styles.subtitle}>
            Rejoignez HabitPro pour développer vos compétences
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Email professionnel"
            value={email}
            onChangeText={setEmail}
            mode="flat"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            mode="flat"
            style={styles.input}
            secureTextEntry={!isPasswordVisible}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? "eye-off" : "eye"}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
          />

          <TextInput
            label="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="flat"
            style={styles.input}
            secureTextEntry={!isPasswordVisible}
            left={<TextInput.Icon icon="lock-check" />}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.registerButton}
            contentStyle={styles.buttonContent}
          >
            S'inscrire
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
            style={styles.loginLink}
          >
            Déjà un compte ? Se connecter
          </Button>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: width - 48,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  registerButton: {
    marginTop: 24,
    borderRadius: 8,
    elevation: 2,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  loginLink: {
    marginTop: 16,
  },
});
