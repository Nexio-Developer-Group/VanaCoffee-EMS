// services/ReportService.ts
import ApiService from './ApiService';

export interface DashboardStats {
  totalBills: number;
  totalAmount: number;
  avgDiscount: string; // percentage as string
  mostActiveSegment: string;
  recurringCustomers: number;
  newCustomers: number;
}

export interface DashboardResponse {
  status: number;
  data: DashboardStats;
  message?: string;
  error?: string;
}

export interface ReportParams {
  period?: 'daily' | 'weekly' | 'monthly';
  startDate?: string; // ISO format
  endDate?: string;   // ISO format
}

/**
 * Fetch dashboard statistics for bills
 * @param params - Optional filter params: period or startDate & endDate
 */
export async function getDashboardStats(params?: ReportParams) {
  return ApiService.fetchDataWithAxios<DashboardResponse>({
    url: '/report/dashboard',
    method: 'get',
    params,
  });
}
