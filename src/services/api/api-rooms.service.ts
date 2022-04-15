import api from "@/middlewares/api";
import { RoomRequest } from "@/core/models/api/room-request.enum";

class ApiRoomsService {
  async getAllUserRooms() {
    return await api.get<RoomRequest[]>('/api/room/');
  }

  async getRoomById(id: string) {
    return await api.get<RoomRequest>(`/api/room/${id}/`);
  }

  async leaveRoom(id: string) {
    return await api.delete(`/api/room/${id}/leave/`);
  }

  async removeRoom(id: string) {
    return await api.delete(`/api/room/${id}/`);
  }

  async createRoom(data: any) {
    return await api.post<RoomRequest>(`/api/room/`, data);
  }

  async deleteRoomById(id: string) {
    return await api.delete(`/api/room/${id}/`);
  }
}

export default new ApiRoomsService();