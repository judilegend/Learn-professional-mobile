import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Title, Text, useTheme } from "react-native-paper";
import { AuthNavigationProp } from "../../navigation/types";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ForgotPasswordScreenProps = {
  navigation: AuthNavigationProp;
};

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const fadeAnim = new Animated.Value(0);
  const theme = useTheme();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleResetPassword = () => {
    console.log("Reset password attempt for:", email);
  };

  return (
    <LinearGradient
      colors={["#4A90E2", "#50C878"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
          <MaterialCommunityIcons name="lock-reset" size={60} color="white" />
          <Title style={styles.title}>Mot de passe oublié ?</Title>
          <Text style={styles.subtitle}>
            Entrez votre email pour réinitialiser votre mot de passe
          </Text>
        </Animated.View>

        <View style={styles.formContainer}>
          <TextInput
            label="Email professionnel"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
            outlineColor="#E0E0E0"
            activeOutlineColor={theme.colors.primary}
          />

          <Button
            mode="contained"
            onPress={handleResetPassword}
            style={styles.resetButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Réinitialiser le mot de passe
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
            style={styles.backButton}
            labelStyle={styles.textButtonLabel}
          >
            Retour à la connexion
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
    paddingHorizontal: 24,
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
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
    textAlign: "center",
    paddingHorizontal: 20,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  resetButton: {
    marginTop: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  buttonLabel: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 16,
  },
  textButtonLabel: {
    fontSize: 14,
    letterSpacing: 0.25,
  },
});
