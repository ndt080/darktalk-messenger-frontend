import { UserRequest } from "@/core/models/api/user-request.model";
import { User } from "@/core/models/user.model";

class UserMapperUtil {
  mapToUsers = (users: UserRequest[]): User[] => users.map(user => this.mapToUser(user));
  mapToUsersRequest = (users: User[]): UserRequest[] => users.map(user => this.mapToUserRequest(user));

  mapToUser(user: UserRequest): User {
    return {
      uid: user?.id,
      email: user.email,
      username: user.user_name,
      password: user.password,
      fullname: user.full_name,
      birthday: user.date_of_birth,
      dateJoined: user.date_joined
    }
  }

  mapToUserRequest(user: User): UserRequest {
    return {
      id: user.uid,
      email: user.email,
      password: user.password,
      user_name: user.username,
      full_name: user.fullname,
      date_of_birth: user.birthday,
      date_joined: user.dateJoined,
    }
  }
}

export default new UserMapperUtil();