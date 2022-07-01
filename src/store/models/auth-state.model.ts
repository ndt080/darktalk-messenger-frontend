import { User } from "@/core/models/user.model";
import { State } from "./state.model";

export interface AuthState extends State {
  user?: User;
}
