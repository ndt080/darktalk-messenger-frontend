import { RoomType } from "@/core/consts/room-type.enum";
import { Message } from "@/core/models/message.model";
import { RoomUser } from "@/core/models/room-user.model";

export interface Room {
  id: string;
  title: string;
  description: string;
  roomType: RoomType;
  users: RoomUser[];
  messages: Message[];
}