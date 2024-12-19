import { create } from "zustand"; // Import correct
import { authService } from "../services/authService";

interface AuthResponse {
  token: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Typage de la fonction créatrice d'état
import { StateCreator } from "zustand";

const useAuthStore = create<AuthState>(
  ((set): AuthState => ({
    token: null,
    isLoading: false,
    error: null,

    login: async (email: string, password: string): Promise<void> => {
      try {
        set({ isLoading: true, error: null });
        const { token } = (await authService.login(
          email,
          password
        )) as AuthResponse;
        set({ token, isLoading: false });
      } catch (error: unknown) {
        const typedError = error as ErrorResponse;
        set({
          error:
            typedError.response?.data?.message || "Une erreur est survenue",
          isLoading: false,
        });
      }
    },

    register: async (email: string, password: string): Promise<void> => {
      try {
        set({ isLoading: true, error: null });
        const { token } = (await authService.register(
          email,
          password
        )) as AuthResponse;
        set({ token, isLoading: false });
      } catch (error: unknown) {
        const typedError = error as ErrorResponse;
        set({
          error:
            typedError.response?.data?.message || "Une erreur est survenue",
          isLoading: false,
        });
      }
    },

    logout: (): void => {
      set({ token: null });
    },
  })) as StateCreator<AuthState>
);

export default useAuthStore;
