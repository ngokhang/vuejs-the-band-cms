export type AppRouteName =
  | 'home'
  | 'schedule'
  | 'members'
  | 'members-list'
  | 'members-create'
  | 'settings'
  | 'login'
  | 'test'
  | 'not-found'

export interface BreadcrumbRouteConfig {
  path: string
  label: string
}

export const BREADCRUMB_ROUTES: Record<AppRouteName, BreadcrumbRouteConfig> = {
  home: { path: '/', label: 'Trang chủ' },
  schedule: { path: '/schedule', label: 'Lịch trình' },
  members: { path: '/members', label: 'Thành viên' },
  'members-list': { path: '/members', label: 'Danh sách thành viên' },
  'members-create': { path: '/members/create', label: 'Tạo thành viên' },
  settings: { path: '/settings', label: 'Cài đặt' },
  login: { path: '/login', label: 'Đăng nhập' },
  test: { path: '/test', label: 'Trang test' },
  'not-found': { path: '/404', label: 'Không tìm thấy trang' },
}

export const systemRolesList = [
  { value: 'SYSTEM_ADMIN', label: 'Quản trị hệ thống' },
  { value: 'ADMIN', label: 'Quản trị viên' },
  { value: 'MANAGER', label: 'Quản lý' },
  { value: 'BAND_MEMBER', label: 'Thành viên ban nhạc' },
  { value: 'CUSTOMER', label: 'Khách hàng' },
  { value: 'GUEST', label: 'Khách' },
]

export const bandRolesList = [
  { value: 'LEADER', label: 'Trưởng nhóm' },
  { value: 'GUITARIST', label: 'Guitar' },
  { value: 'BASSIST', label: 'Bass' },
  { value: 'DRUMMER', label: 'Trống' },
  { value: 'KEYBOARDIST', label: 'Keyboard' },
  { value: 'VOCALIST', label: 'Vocal' },
  { value: 'OTHER', label: 'Khác' },
]
