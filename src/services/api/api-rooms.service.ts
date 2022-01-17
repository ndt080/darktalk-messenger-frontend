import api from "@/middlewares/api";
import { RoomRequest } from "@/core/models/api/room-request.enum";

class ApiRoomsService {
  async getAllUserRooms() {
    return await api.get<RoomRequest[]>('/room/');
  }

  async getRoomById(id: string) {
    return await api.get<RoomRequest>(`/room/${id}/`);
  }

  async deleteRoomById(id: string) {
    return await api.delete(`/room/${id}/`);
  }
}

export default new ApiRoomsService();