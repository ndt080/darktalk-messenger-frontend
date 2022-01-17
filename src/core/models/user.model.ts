import { Tokens } from "@/core/models/tokens.model";

export interface User {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  fullname?: string;
  birthday?: Date;
  dateJoined?: Date;
  tokens?: Tokens;
}