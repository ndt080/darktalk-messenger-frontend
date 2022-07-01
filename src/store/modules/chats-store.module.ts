import { StoreOptions } from "vuex";

import ApiRoomsService from "@/services/api/api-rooms.service";
import ChatsMapperUtil from "@/utils/rooms-mapper.util";

import { Message } from "@/core/models/message.model";
import { ChatsState } from "@/store/models/chats-state.model";
import { Room } from "@/core/models/room.model";


const ChatsStoreModule: StoreOptions<ChatsState> = {
  state: <ChatsState>{
    rooms: [],
    openedChat: undefined,
  },
  mutations: {
    setChats(state, chats) {
      state.rooms = chats;
    },
    setOpenedChat(state, openedChat) {
      state.openedChat = openedChat;
    },
    addMessageToChat(state, message: Message) {
      const chat = state.rooms?.find(chat => chat.id == message.room);
      chat?.messages.push(message);
    },
    addMessageToOpenedChat(state, message: Message) {
      state.openedChat?.messages.push(message);
    },
    clearModule(state) {
      state.rooms = [];
    }
  },
  actions: {
    async getChats({ commit }): Promise<Room[]> {
      return await ApiRoomsService.getAllUserRooms().then((response) => {
        const chats = ChatsMapperUtil.mapToChats(response?.data);
        commit("setChats", chats);
        return chats;
      });
    },
    async getChatById({commit}, id: string): Promise<Room> {
      const { data } = await ApiRoomsService.getRoomById(id);
      const chat = ChatsMapperUtil.mapToChat(data);

      commit('setOpenedChat', chat);
      return chat;
    },
    async createRoom({ dispatch }, data): Promise<boolean> {
      return await ApiRoomsService.createRoom(data).then(() => {
        dispatch("getChats");
        return true;
      });
    },
    async removeChat({ dispatch }, roomId: string): Promise<boolean> {
      return await ApiRoomsService.removeRoom(roomId).then(() => {
        dispatch("getChats");
        return true;
      });
    },
    async leaveChat({ dispatch }, roomId: string): Promise<boolean> {
      return await ApiRoomsService.leaveRoom(roomId).then(() => {
        dispatch("getChats");
        return true;
      });
    },
    addMessageToChat({ commit }, message: Message) {
      commit("addMessageToChat", message);
    }
  },
  getters: {
    rooms: state => state.rooms as Room[],
    openedChat: state => state.openedChat as Room,
  }
};

export default ChatsStoreModule;
