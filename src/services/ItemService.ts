import ApiService from './ApiService'

export interface CreateItemPayload {
  name: string
  description?: string
  category: string // still string when creating/updating
  price: number
  images?: string[]
  tags?: string[]
  isActive?: boolean
  sku?: string
}

export interface ItemCategory {
  _id: string
  name: string
  id?: string
}

export interface Item {
  _id: string
  name: string
  description?: string
  category: ItemCategory // changed from string to object
  price: number
  images?: string[]
  tags?: string[]
  isActive: boolean
  sku?: string
  createdAt: string
  updatedAt: string
  formattedPrice?: string
}

export interface ItemResponse {
  status: number
  data: Item
  message: string
  error?: string | null
}

export interface GetItemsResponse {
  status: number
  items: Item[]
  total: number
  page: number
  pages: number
  message: string
  error?: string | null
}

// CRUD operations remain the same
export async function createItem(payload: CreateItemPayload) {
  return ApiService.fetchDataWithAxios<ItemResponse>({
    url: '/item',
    method: 'post',
    data: payload as unknown as Record<string, unknown>,
  })
}

export async function updateItem(id: string, payload: Partial<CreateItemPayload>) {
  return ApiService.fetchDataWithAxios<ItemResponse>({
    url: `/item/${id}`,
    method: 'put',
    data: payload as Record<string, unknown>,
  })
}

export async function deleteItem(id: string) {
  return ApiService.fetchDataWithAxios<ItemResponse>({
    url: `/item/${id}`,
    method: 'delete',
  })
}

interface GetAllItemsParams {
  page?: number
  limit?: number
  sortBy?: string
  order?: 'asc' | 'desc'
  category?: string
  activeOnly?: boolean
  search?: string
}

export async function getAllItems(params?: GetAllItemsParams) {
  return ApiService.fetchDataWithAxios<GetItemsResponse>({
    url: '/item',
    method: 'get',
    params,
  })
}


export async function getAllItemsNoLimit() {
  return ApiService.fetchDataWithAxios<GetItemsResponse>({
    url: '/item',
    method: 'get',
    params: { limit: 500 },
  })
}