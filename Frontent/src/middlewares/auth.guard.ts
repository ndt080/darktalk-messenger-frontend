import { RouterPaths } from "@/core/consts/router-paths.enum";
import { NavigationGuardNext } from "vue-router";

const authGuard = (
  next: NavigationGuardNext,
  isAuthenticated: boolean
): void => {
  isAuthenticated ? next() : next(`/${RouterPaths.LOGIN}`);
}

export default authGuard;
