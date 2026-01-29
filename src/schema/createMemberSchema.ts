import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const createMemberSchema = toTypedSchema(
  z.object({
    username: z.string().min(3, { message: 'Username tối thiểu 3 ký tự' }),
    password: z.string().min(8, { message: 'Password tối thiểu 8 ký tự' }),
    email: z.string().email({ message: 'Email không hợp lệ' }),
    phoneNumber: z
      .string()
      .min(1, { message: 'Số điện thoại là bắt buộc' })
      .regex(/^[0-9+\-\s]+$/, { message: 'Số điện thoại chỉ chứa số và ký tự +, -, space' }),
    firstName: z.string().min(1, { message: 'Họ không được để trống' }),
    lastName: z.string().min(1, { message: 'Tên không được để trống' }),
    avatar: z
      .any()
      .optional()
      .refine(file => !file || file instanceof File, 'Vui lòng chọn ảnh đại diện hợp lệ')
      .refine(file => !file || file?.size <= 5000000, 'Kích thước ảnh tối đa 5MB')
      .refine(
        file => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file?.type),
        'Chỉ chấp nhận định dạng .jpg, .png, .webp'
      ),
    systemRoles: z.array(z.string()).min(1, { message: 'Chọn ít nhất 1 vai trò hệ thống' }),
    bandRoles: z.array(z.string()).min(1, { message: 'Chọn ít nhất 1 vai trò ban nhạc' }),
  })
)
