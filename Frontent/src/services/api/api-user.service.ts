import api from "@/middlewares/api";
import { UserRequest } from "@/core/models/api/user-request.model";

class ApiUserService {
  async getCurrentUser() {
    return await api.get<UserRequest>(`/user/me/`)
  }

  async findUserByUsername(username: string) {
    return await api.get<UserRequest[]>(`/user/?user_name=${username}`);
  }

  async findUserById(id: string) {
    return await api.get<UserRequest[]>(`/user/?id=${id}`);
  }

  async findUserByEmail(email: string) {
    return await api.get<UserRequest[]>(`/user/?email=${email}`);
  }
}

export default new ApiUserService();