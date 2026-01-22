export interface User {
  id: number
  username: string
  email: string
  createdAt: string
}

export interface UserListParams {
  page: number
  pageSize: number
  keyword?: string
}

export interface UserListRes {
  total: number
  list: User[]
}
