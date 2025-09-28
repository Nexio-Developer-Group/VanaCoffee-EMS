import ApiService from './ApiService'

export interface BillItem {
  item: string
  quantity: number
}

export interface CreateBillPayload {
  phone: string
  items: BillItem[]
  discount?: number
  paymentMethod?: 'cash' | 'card' | 'upi' | 'other'
  createdBy?: string
}

export interface Bill {
  _id: string
  billId: string
  phone: string
  items: BillItem[]
  discount: number
  paymentMethod: string
  status: 'pending' | 'paid' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface BillResponse {
  status: number
  data: Bill
  message: string
  error: string
}

export async function createBill(payload: CreateBillPayload) {
  return ApiService.fetchDataWithAxios<BillResponse>({
    url: '/bill',
    method: 'post',
    data: payload as unknown as Record<string, unknown>,
  })
}

export async function updateBill(id: string, payload: Partial<CreateBillPayload>) {
  return ApiService.fetchDataWithAxios<BillResponse>({
    url: `/bill/${id}`,
    method: 'put',
    data: payload as Record<string, unknown>,
  })
}

export async function updateBillStatus(id: string, status: 'pending' | 'paid' | 'cancelled') {
  return ApiService.fetchDataWithAxios<BillResponse>({
    url: `/bill/${id}/status`,
    method: 'patch',
    data: { status } as Record<string, unknown>,
  })
}

export async function deleteBill(id: string) {
  return ApiService.fetchDataWithAxios<{ status: number; message: string }>({
    url: `/bill/${id}`,
    method: 'delete',
  })
}

export async function getBillById(billId: string) {
  return ApiService.fetchDataWithAxios<BillResponse>({
    url: `/bill/id/${billId}`,
    method: 'get',
  })
}

export async function getAllBills(params?: { status?: string; page?: number; limit?: number }) {
  return ApiService.fetchDataWithAxios<{ status: number; data: Bill[]; total: number; page: number; pages: number }>({
    url: '/bill/all',
    method: 'get',
    params,
  })
}

export async function searchUsersByPhone(phone: string) {
  return ApiService.fetchDataWithAxios<{ status: number; data: { _id: string; phone: string }[]; message: string }>({
    url: '/bill/users/search',
    method: 'get',
    params: { phone },
  })
}

export async function getBillsByUser(phone: string) {
  return ApiService.fetchDataWithAxios<{ status: number; data: Bill[]; message: string }>({
    url: '/bill/user',
    method: 'get',
    params: { phone },
  })
}
