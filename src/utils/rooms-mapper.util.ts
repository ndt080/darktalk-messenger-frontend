import { Room } from "@/core/models/room.model";
import { RoomRequest } from "@/core/models/api/room-request.enum";
import { RoomUser } from "@/core/models/room-user.model";
import { RoomUserRequest } from "@/core/models/api/room-user-request.model";
import UserMapperUtil from "@/utils/user-mapper.util";

class RoomsMapperUtil {
  private mapToRoomUser = (roomUsers: RoomUserRequest[]): RoomUser[] => roomUsers.map(roomUser => ({
    user: UserMapperUtil.mapToUser(roomUser.user),
    role: roomUser.role
  }));

  private mapToRoomUserRequest = (roomUsers: RoomUser[]): RoomUserRequest[] => roomUsers.map(roomUser => ({
    user: UserMapperUtil.mapToUserRequest(roomUser.user),
    role: roomUser.role
  }));

  mapToRooms = (rooms: RoomRequest[]): Room[] => rooms.map(room => this.mapToRoom(room));
  mapToRoomsRequest = (rooms: Room[]): RoomRequest[] => rooms.map(room => this.mapToRoomRequest(room));

  mapToRoom = (room: RoomRequest): Room => ({
    id: room.id,
    title: room.title,
    description: room.description,
    roomType: room.room_type,
    users: this.mapToRoomUser(room.users),
    messages: room.messages,
  });

  mapToRoomRequest = (room: Room): RoomRequest => ({
    id: room.id,
    title: room.title,
    description: room.description,
    room_type: room.roomType,
    users: this.mapToRoomUserRequest(room.users),
    messages: room.messages
  });
}

export default new RoomsMapperUtil();