export interface Message {
  id: number;
  text: string;
  room: number;
  sender: number;
  created_at: Date;
  updated_at: Date;
}
