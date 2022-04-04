import { StoreOptions } from "vuex";
import { State } from "@/store/models/state.model";
import ApiRoomsService from "@/services/api/api-rooms.service";
import RoomsMapperUtil from "@/utils/rooms-mapper.util";
import NotificationService from "@/services/notification.service";
import { Room } from "@/core/models/room.model";
import { Message } from "@/core/models/message.model";

const RoomsStoreModule: StoreOptions<State> = {
  state: <State>{
    rooms: [],
    openedRoom: {} as Room
  },
  mutations: {
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    setOpenedRoom(state, room) {
      state.openedRoom = room;
    },
    addMessageToOpenedRoom(state, message) {
      const room = state.openedRoom;
      room?.messages.push(message);
    },
    addMessageToRoom(state, { message, roomId }) {
      const rooms = state.rooms;
      const room = rooms?.find(room => room.id == roomId);
      room?.messages.push(message);
      state.rooms = rooms;
    },
    clearModule(state) {
      state.rooms = [];
      state.openedRoom = {} as Room;
    }
  },
  actions: {
    async getRooms({ commit }) {
      try {
        await ApiRoomsService.getAllUserRooms().then((response) => {
          const rooms = RoomsMapperUtil.mapToRooms(response?.data);

          commit("setRooms", rooms);
        });
      } catch (error) {
        NotificationService.error("Error!", error.message);
      }
    },

    async getRoomById({ commit }, id: string) {
      try {
        await ApiRoomsService.getRoomById(id).then((response) => {
          const room = RoomsMapperUtil.mapToRoom(response?.data);
          commit("setOpenedRoom", room);
        });
      } catch (error) {
        NotificationService.error("Error!", error);
      }
    },
    async createRoom({ dispatch }, data) {
      try {
        await ApiRoomsService.createRoom(data).then(() => {
          NotificationService.success("Success create chat!");
          dispatch("getRooms");
        });
      } catch (error) {
        NotificationService.error("Error!", error);
      }
    },
    async removeRoom({ dispatch }, roomId: number) {
      try {
        await ApiRoomsService.removeRoom(roomId.toString()).then(() => {
          NotificationService.success("You have successfully deleted the chat!");
          dispatch("getRooms");
        });
      } catch (error) {
        NotificationService.error("Error!", error?.toString());
      }
    },
    async leaveRoom({ dispatch }, roomId: number) {
      try {
        await ApiRoomsService.leaveRoom(roomId.toString()).then(() => {
          NotificationService.success("You have successfully left the chat!");
          dispatch("getRooms");
        });
      } catch (error) {
        NotificationService.error("Error!", error?.toString());
      }
    },
    addMessageToRoom({ commit }, messageData: { message: Message, roomId: number }) {
      commit("addMessageToOpenedRoom", messageData);
      commit("addMessageToRoom", messageData);
    }
  },
  getters: {
    rooms: state => state.rooms,
    openedRoom: state => state.openedRoom
  }
};

export default RoomsStoreModule;
