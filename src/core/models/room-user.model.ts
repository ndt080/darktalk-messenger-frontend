import { RoomRole } from "@/core/consts/room-role.enum";
import { User } from "@/core/models/user.model";

export interface RoomUser {
  user: User;
  role: RoomRole;
}