import api from "@/middlewares/api";
import { UserRequest } from "@/core/models/api/user-request.model";

class ApiAuthService {
  async signIn(user: UserRequest) {
    return await api.post<UserRequest>('/user/signin/', user);
  }

  async signUp(user : UserRequest) {
    return await api.post<UserRequest>('/user/signup/', user);
  }
}

export default new ApiAuthService();