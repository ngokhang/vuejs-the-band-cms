import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Customer, CustomerListParams } from '@/types/customer'

const defaultPagination: CustomerListParams = {
  page: 1,
  pageSize: 10,
  query: '',
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'Nguyễn Văn A', phone: '0901234567', email: 'a@example.com' },
  { id: '2', name: 'Trần Thị B', phone: '0912345678', email: null },
  { id: '3', name: 'Lê Văn C', phone: '0923456789', email: 'c@example.com' },
]

export const useCustomerStore = defineStore('customer', () => {
  const pagination = ref<CustomerListParams>({ ...defaultPagination })
  const customersList = ref<Customer[]>([...mockCustomers])

  function setPagination(paginationArgs: CustomerListParams) {
    pagination.value = {
      page: paginationArgs.page,
      pageSize: paginationArgs.pageSize,
      query: paginationArgs.query ?? '',
    }
  }

  function clearPagination() {
    pagination.value = { ...defaultPagination }
  }

  function addCustomer(customer: Omit<Customer, 'id'>) {
    const id = String(Date.now())
    customersList.value.push({ ...customer, id })
  }

  function updateCustomer(id: string, payload: Partial<Omit<Customer, 'id'>>) {
    const idx = customersList.value.findIndex(c => c.id === id)
    const current = idx !== -1 ? customersList.value[idx] : undefined
    if (current === undefined) return
    customersList.value[idx] = {
      id: current.id,
      name: payload.name ?? current.name,
      phone: payload.phone ?? current.phone,
      email: payload.email !== undefined ? payload.email : current.email,
    }
  }

  function removeCustomer(id: string) {
    customersList.value = customersList.value.filter(c => c.id !== id)
  }

  return {
    pagination,
    customersList,
    setPagination,
    clearPagination,
    addCustomer,
    updateCustomer,
    removeCustomer,
  }
})
