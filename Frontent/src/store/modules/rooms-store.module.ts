import { StoreOptions } from "vuex";
import { State } from "@/store/models/state.model";
import ApiRoomsService from "@/services/api/api-rooms.service";
import RoomsMapperUtil from "@/utils/rooms-mapper.util";
import NotificationService from "@/services/notification.service";
import { Room } from "@/core/models/room.model";

const RoomsStoreModule: StoreOptions<State> = {
  state: <State>{
    rooms: [],
    openedRoom: {} as Room
  },
  mutations: {
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    setMessageToRoom(state, message) {
      const room = state.openedRoom as Room;
      room.messages.push(message);
      state.openedRoom = room;
    },
    setOpenedRoom(state, room) {
      state.openedRoom = room;
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
          dispatch('getRooms');
        });
      } catch (error) {
        NotificationService.error("Error!", error);
      }
    }
  },
  getters: {
    rooms: state => state.rooms,
    openedRoom: state => state.openedRoom
  }
};

export default RoomsStoreModule;
