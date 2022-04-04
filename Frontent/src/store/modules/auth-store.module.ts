import { StoreOptions } from "vuex";
import { State } from "@/store/models/state.model";
import { User } from "@/core/models/user.model";
import ApiAuthService from "@/services/api/api-auth.service";
import UserMapperUtil from "@/utils/user-mapper.util";
import NotificationService from "@/services/notification.service";
import { UserStorageService } from "@/services/storage/user-storage.service";
import TokenStorageService from "@/services/storage/token-storage.service";
import { Tokens } from "@/core/models/tokens.model";

const AuthStoreModule: StoreOptions<State> = {
  state: <State>{
    user: UserStorageService.getUser()
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearModule(state) {
      state.user = {};
    }
  },
  actions: {
    async login({ commit }, user: User) {
      try {
        const response = await ApiAuthService.signIn(UserMapperUtil.mapToUserRequest(user));
        const currentUser = UserMapperUtil.mapToUser(response?.data.user);

        TokenStorageService.saveTokens({ access: response?.data.token } as Tokens);
        UserStorageService.saveUser(currentUser);
        commit("setUser", currentUser);

        NotificationService.success("Success sign in!");
      } catch (error) {
        NotificationService.error("Error!", error.message);
      }
    },

    async registration(_, user: User) {
      try {
        await ApiAuthService.signUp(UserMapperUtil.mapToUserRequest(user));
        NotificationService.success("Success sign up!");
      } catch (error) {
        NotificationService.error("Error!", error.message);
      }
    },
    logout({ commit }) {
      try {
        UserStorageService.removeUser();
        TokenStorageService.removeTokens();
        commit("clearModule");
      } catch (error) {
        NotificationService.error("Error!", error);
      }
    }
  },
  getters: {
    user: state => state.user
  }
};

export default AuthStoreModule;
