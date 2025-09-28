import ApiService from './ApiService'

export interface User {
  _id: string
  phone: string
  name?: string
  createdAt: string
  updatedAt: string
}

export async function getUser(id: string) {
  return ApiService.fetchDataWithAxios<{ status: number; data: User; message: string }>({
    url: `/user/${id}`,
    method: 'get',
  })
}

export async function getAllUsers(params?: { page?: number; limit?: number }) {
  return ApiService.fetchDataWithAxios<{ status: number; data: User[]; total: number; page: number; pages: number }>({
    url: '/user/all',
    method: 'get',
    params,
  })
}

export async function searchUsers(phone: string) {
  return ApiService.fetchDataWithAxios<{ status: number; data: User[]; message: string }>({
    url: '/user/search',
    method: 'get',
    params: { phone },
  })
}
