import { UserRequest } from "@/core/models/api/user-request.model";
import { User } from "@/core/models/user.model";

class UserMapperUtil {
  mapToUser(user: UserRequest): User {
    return {
      id: user.user_id,
      email: user.email,
      username: user.user_name,
      password: user.password,
      fullname: user.full_name,
      birthday: user.date_of_birth,
      dateJoined: user.date_joined,
      tokens: {
        access: user.token,
      }
    }
  }

  mapToUserRequest(user: User): UserRequest {
    return {
      user_id: user.id,
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