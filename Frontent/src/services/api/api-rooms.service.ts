import api from "@/middlewares/api";
import { RoomRequest } from "@/core/models/api/room-request.enum";

class ApiRoomsService {
  async getAllUserRooms() {
    return await api.get<RoomRequest[]>('/room/');
  }

  async getRoomById(id: string) {
    return await api.get<RoomRequest>(`/room/${id}/`);
  }

  async leaveRoom(id: string) {
    return await api.delete(`/room/${id}/leave/`);
  }

  async removeRoom(id: string) {
    return await api.delete(`/room/${id}/`);
  }

  async createRoom(data: any) {
    return await api.post<RoomRequest>(`/room/`, data);
  }

  async deleteRoomById(id: string) {
    return await api.delete(`/room/${id}/`);
  }
}

export default new ApiRoomsService();