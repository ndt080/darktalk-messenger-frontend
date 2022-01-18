import { Room } from "@/core/models/room.model";

export interface RoomsState {
  rooms?: Room[];
  openedRoom?: Room;
}