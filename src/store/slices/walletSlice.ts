import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  address: string | null;
  balance: number;
  isConnected: boolean;
  chainId: number | null;
}

const initialState: WalletState = {
  address: null,
  balance: 0,
  isConnected: false,
  chainId: null,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
      state.isConnected = true;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setChainId: (state, action: PayloadAction<number>) => {
      state.chainId = action.payload;
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.balance = 0;
      state.isConnected = false;
      state.chainId = null;
    },
  },
});

export const {
  setWalletAddress,
  setBalance,
  setChainId,
  disconnectWallet,
} = walletSlice.actions;

export default walletSlice.reducer;
