import { h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Phone, Mail } from 'lucide-vue-next'
import type { Customer } from '@/types/customer'

interface UseCustomerColumnsOptions {
  onView: (customer: Customer) => void
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export function useCustomerColumns(options: UseCustomerColumnsOptions) {
  const columnHelper = createColumnHelper<Customer>()

  return [
    columnHelper.display({
      id: 'customer',
      header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Khách hàng'),
      cell: info => {
        const c = info.row.original
        const initials =
          c.name
            .trim()
            .split(/\s+/)
            .map(n => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase() || '?'
        return h('div', { class: 'flex items-center gap-3' }, [
          h(
            'div',
            {
              class:
                'flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold',
            },
            initials
          ),
          h('div', {}, [
            h('div', { class: 'font-medium text-gray-900' }, c.name),
            h('div', { class: 'text-xs text-gray-500' }, c.email ?? '—'),
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
    columnHelper.accessor('email', {
      header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Email'),
      cell: info =>
        h('div', { class: 'flex items-center gap-2 text-sm text-gray-600' }, [
          h(Mail, { class: 'h-4 w-4 text-gray-400' }),
          info.getValue() ?? '—',
        ]),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => h('span', { class: 'sr-only' }, 'Thao tác'),
      cell: info => {
        const customer = info.row.original
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
                        'h-8 w-8 rounded-full hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-emerald-500',
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
                    { onSelect: () => options.onView(customer) },
                    { default: () => 'Xem chi tiết' }
                  ),
                  h(
                    DropdownMenuItem,
                    { onSelect: () => options.onEdit(customer) },
                    { default: () => 'Chỉnh sửa' }
                  ),
                  h(
                    DropdownMenuItem,
                    {
                      class: 'text-red-600 focus:text-red-600',
                      onSelect: () => options.onDelete(customer),
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
