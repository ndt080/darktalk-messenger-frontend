import { RouterPaths } from "@/core/consts/router-paths.enum";
import { NavigationGuardNext } from "vue-router";

export default function authGuard(
  next: NavigationGuardNext,
  isAuthenticated: boolean
) {
  isAuthenticated ? next() : next(`/${RouterPaths.LOGIN}`);
}
