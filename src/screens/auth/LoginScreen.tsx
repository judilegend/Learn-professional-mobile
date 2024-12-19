import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Title, Text, useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient"; // Import correct
import useAuthStore from "../../store/authStore"; // Correct store import
import { AuthNavigationProp } from "../../navigation/types"; // Correct navigation type

type LoginScreenProps = {
  navigation: AuthNavigationProp;
};

const { width } = Dimensions.get("window");

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const theme = useTheme();
  const { login, isLoading, error } = useAuthStore(); // Utilisation du store Zustand

  const handleLogin = async () => {
    try {
      console.log("Tentative de connexion avec:", { email, password });
      await login(email, password);
      console.log("Connexion réussie");
      console.log();
      // Redirection vers la page principale après la connexion réussie
      // navigation.navigate("MainTabs");
    } catch (err) {
      console.log("Erreur de connexion:", err);
    }
  };

  return (
    <LinearGradient colors={["#4A90E2", "#50C878"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.logoContainer}>
          <Title style={styles.appName}>HabitPro</Title>
          <Text style={styles.tagline}>
            Développez vos habitudes professionnelles
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
            theme={{ colors: { primary: theme.colors.primary } }}
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

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            contentStyle={styles.buttonContent}
            loading={isLoading}
            disabled={isLoading}
          >
            Se connecter
          </Button>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>ou</Text>
            <View style={styles.line} />
          </View>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Register")}
            style={styles.registerButton}
            contentStyle={styles.buttonContent}
          >
            Créer un compte
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
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
  loginButton: {
    marginTop: 24,
    borderRadius: 8,
    elevation: 2,
  },
  registerButton: {
    borderRadius: 8,
    borderWidth: 2,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  orText: {
    marginHorizontal: 10,
    color: "#757575",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
});
