export interface Customer {
  id: string
  name: string
  phone: string
  email?: string | null
}

export interface CustomerListParams {
  page: number
  pageSize: number
  query?: string | null
}

export type CreateCustomerPayload = Omit<Customer, 'id'>
export type UpdateCustomerPayload = Partial<Omit<Customer, 'id'>>
