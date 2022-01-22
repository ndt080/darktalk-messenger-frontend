import { RoomType } from "@/core/consts/room-type.enum";
import { RoomUserRequest } from "@/core/models/api/room-user-request.model";
import { Message } from "@/core/models/message.model";

export interface RoomRequest {
  "id": number;
  "title": string;
  "description": string;
  "room_type": RoomType;
  "users": RoomUserRequest[];
  "messages": Message[];
}