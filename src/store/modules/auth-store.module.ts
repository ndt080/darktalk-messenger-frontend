import { StoreOptions } from "vuex";
import { User } from "@/core/models/user.model";
import ApiAuthService from "@/services/api/api-auth.service";
import UserMapperUtil from "@/utils/user-mapper.util";
import NotificationService from "@/services/notification.service";
import { UserStorageService } from "@/services/storage/user-storage.service";
import TokenStorageService from "@/services/storage/token-storage.service";
import { Tokens } from "@/core/models/tokens.model";
import ApiUserService from "@/services/api/api-user.service";
import { AuthState } from "@/store/models/auth-state.model";


const AuthStoreModule: StoreOptions<AuthState> = {
  state: <AuthState>{
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
        const requestData = UserMapperUtil.mapToUserRequest(user);
        const { data } = await ApiAuthService.signIn(requestData);

        const currentUser: User = UserMapperUtil.mapToUser(data.user);
        const tokens: Tokens = { access: data.token };

        TokenStorageService.saveTokens(tokens);
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
        NotificationService.warning(
          "Confirm your email!",
          `Go to the mailbox ${user.email} and confirm the credentials.`,
          6000
        );
      } catch (error) {
        NotificationService.error("Error!", error.message);
      }
    },
    async googleLogin({ commit }, token: string) {
      try {
        const { data } = await ApiAuthService.googleAuth(token);

        const tokens: Tokens = { access: data.key };
        TokenStorageService.saveTokens(tokens);

        const response = await ApiUserService.getCurrentUser();
        const user: User = UserMapperUtil.mapToUser(response.data);

        UserStorageService.saveUser(user);
        commit("setUser", user);
        NotificationService.success("Success sign in!");
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
    },
    async getCurrentUser({ commit }) {
      try {
        const { data } = await ApiUserService.getCurrentUser();
        const user: User = UserMapperUtil.mapToUser(data);

        UserStorageService.saveUser(user);
        commit("setUser", user);
      } catch (error) {
        NotificationService.error("Error!", error);
      }
    }
  },
  getters: {
    user: state => state.user as User,
  }
};

export default AuthStoreModule;
