import { State } from "@/store/models/state.model";

export interface AppSocket extends State {
  socket?: WebSocket;
}
