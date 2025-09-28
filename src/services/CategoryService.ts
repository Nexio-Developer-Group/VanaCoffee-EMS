import ApiService from './ApiService'

export interface CreateCategoryPayload {
  name: string
  description?: string
  parentCategory?: string | null
  isActive?: boolean
}

export interface Category {
  _id: string
  name: string
  description?: string
  parentCategory?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CategoryResponse {
  status: number
  data: Category
  message: string
  error: string
}

export async function createCategory(payload: CreateCategoryPayload) {
  return ApiService.fetchDataWithAxios<CategoryResponse>({
    url: '/category',
    method: 'post',
    data: payload as unknown as Record<string, unknown>,
  })
}

export async function updateCategory(id: string, payload: Partial<CreateCategoryPayload & { isActive?: boolean }>) {
  return ApiService.fetchDataWithAxios<CategoryResponse>({
    url: `/category/${id}`,
    method: 'put',
    data: payload as Record<string, unknown>,
  })
}

export async function deleteCategory(id: string) {
  return ApiService.fetchDataWithAxios<CategoryResponse>({
    url: `/category/${id}`,
    method: 'delete',
  })
}

export async function getCategory(id: string) {
  return ApiService.fetchDataWithAxios<CategoryResponse>({
    url: `/category/${id}`,
    method: 'get',
  })
}

export async function getAllCategories() {
  return ApiService.fetchDataWithAxios<{ status: number; data: Category[]; message: string; error: string }>({
    url: '/category',
    method: 'get',
  })
}
