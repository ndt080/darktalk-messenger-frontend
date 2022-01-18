import { AuthState } from "@/store/models/auth-state.model";
import { RoomsState } from "@/store/models/rooms-state.model";

export type State = AuthState & RoomsState;