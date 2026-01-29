import { h } from 'vue'
import { createColumnHelper, type ColumnHelper } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Phone } from 'lucide-vue-next'

export interface Member {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'member' | 'vip'
  joinDate: string
  status: 'active' | 'inactive'
  totalSpent: number
}

interface UseMemberColumnsOptions {
  onEdit: (member: Member) => void
  onDelete: (member: Member) => void
}

export function useMemberColumns(options: UseMemberColumnsOptions) {
  const columnHelper = createColumnHelper<Member>()

  return [
    columnHelper.accessor('name', {
      header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Thành viên'),
      cell: info => {
        const member = info.row.original
        return h('div', { class: 'flex items-center gap-3' }, [
          h(
            'div',
            {
              class:
                'flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold',
            },
            member.name
              .split(' ')
              .map(n => n[0])
              .join('')
              .slice(0, 2)
          ),
          h('div', {}, [
            h('div', { class: 'font-medium text-gray-900' }, info.getValue()),
            h('div', { class: 'text-xs text-gray-500' }, member.email),
          ]),
        ])
      },
    }),
    columnHelper.accessor('phone', {
      header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Số điện thoại'),
      cell: info =>
        h('div', { class: 'flex items-center gap-2 text-sm text-gray-600' }, [
          h(Phone, { class: 'h-4 w-4 text-gray-400' }),
          info.getValue(),
        ]),
    }),
    columnHelper.accessor('role', {
      header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Vai trò'),
      cell: info => {
        const role = info.getValue()
        const roleConfig = {
          admin: { label: 'Quản trị', bg: 'bg-purple-100', text: 'text-purple-800' },
          vip: { label: 'VIP', bg: 'bg-yellow-100', text: 'text-yellow-800' },
          member: { label: 'Thành viên', bg: 'bg-blue-100', text: 'text-blue-800' },
        }
        const config = roleConfig[role]
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
        const member = info.row.original
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
                      onSelect: () => options.onEdit(member),
                    },
                    { default: () => 'Chỉnh sửa' }
                  ),
                  h(
                    DropdownMenuItem,
                    {
                      class: 'text-red-600 focus:text-red-600',
                      onSelect: () => options.onDelete(member),
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
