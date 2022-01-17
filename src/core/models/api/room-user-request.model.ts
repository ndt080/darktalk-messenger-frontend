import { RoomRole } from "@/core/consts/room-role.enum";
import { UserRequest } from "@/core/models/api/user-request.model";

export interface RoomUserRequest {
  user: UserRequest;
  role: RoomRole;
}