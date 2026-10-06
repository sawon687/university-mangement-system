export interface ApiResponse<T> {
  success: boolean;
  message: string;
  status:boolean;
  data: T;
}