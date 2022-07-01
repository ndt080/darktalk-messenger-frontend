import { Room } from "@/core/models/room.model";
import { RoomRequest } from "@/core/models/api/room-request.enum";
import { RoomUser } from "@/core/models/room-user.model";
import { RoomUserRequest } from "@/core/models/api/room-user-request.model";
import UserMapperUtil from "@/utils/user-mapper.util";

class ChatsMapperUtil {
  private mapToChatMember = (chatMembers: RoomUserRequest[]): RoomUser[] => chatMembers.map(chatMember => ({
    user: UserMapperUtil.mapToUser(chatMember.user),
    role: chatMember.role
  }));

  private mapToChatMemberRequest = (chatMembers: RoomUser[]): RoomUserRequest[] => chatMembers.map(chatMember => ({
    user: UserMapperUtil.mapToUserRequest(chatMember.user),
    role: chatMember.role
  }));

  mapToChats = (chats: RoomRequest[]): Room[] => {
    return chats.map(chat => this.mapToChat(chat));
  };

  mapToChatsRequest = (chats: Room[]): RoomRequest[] => {
    return chats.map(chat => this.mapToChatRequest(chat));
  };

  mapToChat = (chat: RoomRequest): Room => ({
    id: chat?.id,
    title: chat?.title,
    description: chat?.description,
    roomType: chat?.room_type,
    users: chat.users ? this.mapToChatMember(chat.users) : [],
    messages: chat?.messages,
  });

  mapToChatRequest = (chat: Room): RoomRequest => ({
    id: chat.id,
    title: chat.title,
    description: chat.description,
    room_type: chat.roomType,
    users: this.mapToChatMemberRequest(chat.users),
    messages: chat.messages
  });
}

export default new ChatsMapperUtil();
