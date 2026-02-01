import { h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Phone } from 'lucide-vue-next'
import type { User } from '@/types/user'

function displayName(user: User): string {
  const first = user.firstName?.trim() ?? ''
  const last = user.lastName?.trim() ?? ''
  if (first || last) return `${first} ${last}`.trim()
  return user.username ?? user.email ?? user.id
}

function primaryRole(user: User): string {
  if (user.systemRoles?.length) return user.systemRoles[0] ?? 'member'
  if (user.bandRoles?.length) return user.bandRoles[0] ?? 'member'
  return 'member'
}

interface UseMemberColumnsOptions {
  onEdit: (member: User) => void
  onDelete: (member: User) => void
}

export function useMemberColumns(options: UseMemberColumnsOptions) {
  const columnHelper = createColumnHelper<User>()

  return [
    columnHelper.display({
      id: 'member',
      header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Thành viên'),
      cell: info => {
        const user = info.row.original
        const name = displayName(user)
        const initials = name
          .split(/\s+/)
          .map(n => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase() || user.username?.slice(0, 2)?.toUpperCase() || '?'
        return h('div', { class: 'flex items-center gap-3' }, [
          h('div', {
            class:
              'flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold',
          }, initials),
          h('div', {}, [
            h('div', { class: 'font-medium text-gray-900' }, name),
            h('div', { class: 'text-xs text-gray-500' }, user.email),
          ]),
        ])
      },
    }),
    columnHelper.accessor('phoneNumber', {
      header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Số điện thoại'),
      cell: info =>
        h('div', { class: 'flex items-center gap-2 text-sm text-gray-600' }, [
          h(Phone, { class: 'h-4 w-4 text-gray-400' }),
          info.getValue() ?? '—',
        ]),
    }),
    columnHelper.display({
      id: 'role',
      header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Vai trò'),
      cell: info => {
        const role = primaryRole(info.row.original)
        const roleConfig: Record<string, { label: string; bg: string; text: string }> = {
          admin: { label: 'Quản trị', bg: 'bg-purple-100', text: 'text-purple-800' },
          vip: { label: 'VIP', bg: 'bg-yellow-100', text: 'text-yellow-800' },
          member: { label: 'Thành viên', bg: 'bg-blue-100', text: 'text-blue-800' },
        }
        const config = roleConfig[role] ?? roleConfig.member ?? {
          label: 'Thành viên',
          bg: 'bg-blue-100',
          text: 'text-blue-800',
        }
        return h(
          'span',
          {
            class: `inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`,
          },
          config.label
        )
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: () => h('span', { class: 'sr-only' }, 'Thao tác'),
      cell: info => {
        const user = info.row.original
        return h(DropdownMenu, null, {
          default: () => [
            h(
              DropdownMenuTrigger,
              { asChild: true },
              {
                default: () =>
                  h(
                    Button,
                    {
                      variant: 'ghost',
                      size: 'icon',
                      class:
                        'h-8 w-8 rounded-full hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500',
                    },
                    () => h(MoreHorizontal, { class: 'h-4 w-4 text-gray-500' })
                  ),
              }
            ),
            h(
              DropdownMenuContent,
              { align: 'end' },
              {
                default: () => [
                  h(
                    DropdownMenuItem,
                    {
                      onSelect: () => options.onEdit(user),
                    },
                    { default: () => 'Chỉnh sửa' }
                  ),
                  h(
                    DropdownMenuItem,
                    {
                      class: 'text-red-600 focus:text-red-600',
                      onSelect: () => options.onDelete(user),
                    },
                    { default: () => 'Xoá' }
                  ),
                ],
              }
            ),
          ],
        })
      },
    }),
  ]
}
