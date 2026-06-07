import * as SecureStore from 'expo-secure-store';
import { randomUUID } from 'expo-crypto';

const GUEST_TOKEN_KEY = 'guest_token';

export const guestTokenStorage = {
  getOrCreate: async (): Promise<string> => {
    const existing = await SecureStore.getItemAsync(GUEST_TOKEN_KEY);
    if (existing) return existing;
    const token = randomUUID();
    await SecureStore.setItemAsync(GUEST_TOKEN_KEY, token);
    return token;
  },
  clear: () => SecureStore.deleteItemAsync(GUEST_TOKEN_KEY),
};
