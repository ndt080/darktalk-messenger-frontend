import { StoreOptions } from "vuex";
import { State } from "@/store/models/state.model";
import ApiRoomsService from "@/services/api/api-rooms.service";
import RoomsMapperUtil from "@/utils/rooms-mapper.util";
import NotificationService from "@/services/notification.service";

const RoomsStoreModule: StoreOptions<State> = {
  state: <State>{
    rooms: []
  },
  mutations: {
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    clearModule(state) {
      state.rooms = [];
    }
  },
  actions: {
    async getRooms({commit}) {
      try {
        await ApiRoomsService.getAllUserRooms().then((response) => {
          const rooms = RoomsMapperUtil.mapToRooms(response?.data);

          commit("setRooms", rooms);
        })
      } catch (error) {
        NotificationService.error("Error!", error)
      }
    }
  },
  getters: {
    rooms: state => state.rooms,
  }
};

export default RoomsStoreModule;
