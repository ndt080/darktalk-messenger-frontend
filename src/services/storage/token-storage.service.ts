import { StorageKeys } from "@/core/consts/storage-keys.enum";
import { Tokens } from "@/core/models/tokens.model";

class TokenStorageService {
  static saveTokens(tokens: Tokens): void {
    localStorage.setItem(StorageKeys.TOKENS, JSON.stringify(tokens));
  }

  static getTokens(): Tokens | null {
    const dataString = localStorage.getItem(StorageKeys.TOKENS);
    return dataString ? JSON.parse(dataString) : null;
  }

  static removeTokens(): void {
    localStorage.removeItem(StorageKeys.TOKENS);
  }
}

export default TokenStorageService;