import { Room } from "@/core/models/room.model";
import { State } from "./state.model";

export interface ChatsState extends State {
  rooms?: Room[];
  openedChat?: Room;
}
