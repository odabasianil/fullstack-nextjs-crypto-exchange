export interface Activity {
  data: ActivityItem[],
  totalCount: number,
  page: number,
  pageSize: number
}

export interface ActivityItem {
  authenticationLogId: number,
  userId: number,
  userTempId: number,
  authType: string,
  timestamp: string,
  ip: string,
  userAgent: string,
  deviceInfo: string,
  location: string,
  statusText?: string,
  authName?: string,
  status?: number
}

export interface ActivityBody {
  page?: number,
  pageSize?: number,
  search?: string
}