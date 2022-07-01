import { StoreOptions } from "vuex";
import { AppSocket } from "../models/app-socket.model";
import TokenStorageService from "@/services/storage/token-storage.service";
import NotificationService from "@/services/notification.service";
import { Message } from "@/core/models/message.model";


const AppSocketStoreModule: StoreOptions<AppSocket> = {
  state: <AppSocket>{
    socket: undefined,
  },
  mutations: {
    setSocket(state, socket: WebSocket) {
      state.socket = socket;
    },
    removeSocket(state) {
      state.socket = undefined;
    }
  },
  actions: {
    connectAppSocket({commit}): Promise<WebSocket> {
      try {
        const token  = TokenStorageService.getTokens()?.access;

        const socketBaseUrl = process.env.VUE_APP_ROOT_SOCKET;
        const socketUrl = `${socketBaseUrl}/user/?token=${token}`;

        const socket = new WebSocket(socketUrl);
        commit('setSocket', socket);

        return Promise.resolve<WebSocket>(socket);
      } catch (error) {
        NotificationService.error("Error!", error);
        return Promise.reject(error);
      }
    },
    disconnectAppSocket({commit, getters}) {
      try {
        getters.socket?.close();
        commit('removeSocket');
      } catch (error) {
        NotificationService.error("Error!", error);
      }
    },
    handleAppSocketMessage({commit}, event: MessageEvent) {
      const message: Message = JSON.parse(event.data);
      // commit("addOpenedChatMessage", message);
      commit("addMessageToChat", message);
    }
  },
  getters: {
    socket: state => state.socket as WebSocket,
  }
};

export default AppSocketStoreModule;
