import api from "@/middlewares/api";
import { UserRequest } from "@/core/models/api/user-request.model";


class ApiAuthService {
  async signIn(user: UserRequest) {
    return await api.post<{user: UserRequest, token: string}>('/api/user/signin/', user);
  }

  async signUp(user : UserRequest) {
    return await api.post<{user: UserRequest, token: string}>('/api/user/signup/', user);
  }

  async googleAuth(token: string) {
    return await api.post('/api/user/sociallogin/', {
      access_token: token,
    });
  }
}

export default new ApiAuthService();
