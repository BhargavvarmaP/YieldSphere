import { create } from 'zustand';

interface AnimationState {
  isAnimating: boolean;
  currentAnimation: string | null;
  setIsAnimating: (isAnimating: boolean) => void;
  setCurrentAnimation: (animation: string | null) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isAnimating: false,
  currentAnimation: null,
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setCurrentAnimation: (animation) => set({ currentAnimation: animation }),
}));

interface WalletState {
  selectedWallet: string | null;
  isConnecting: boolean;
  setSelectedWallet: (wallet: string | null) => void;
  setIsConnecting: (isConnecting: boolean) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  selectedWallet: null,
  isConnecting: false,
  setSelectedWallet: (wallet) => set({ selectedWallet: wallet }),
  setIsConnecting: (isConnecting) => set({ isConnecting }),
}));

export type MFAMethod = 'authenticator' | 'sms' | 'email';

interface AuthState {
  mfaMethod: MFAMethod;
  verificationCode: string;
  setMfaMethod: (method: MFAMethod) => void;
  setVerificationCode: (code: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  mfaMethod: 'authenticator',
  verificationCode: '',
  setMfaMethod: (method) => set({ mfaMethod: method }),
  setVerificationCode: (code) => set({ verificationCode: code }),
}));
