/**
 * Pre-sign Cloudinary: validate avatar file và upload file lên Cloudinary
 * dùng signed params (avatarUpload) từ backend.
 */

export interface AvatarUploadParams {
  uploadUrl: string
  timestamp: number
  signature: string
  folder: string
  cloudName: string
  apiKey: string
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export function validateAvatarFile(
  file: File | null
): { valid: true } | { valid: false; message: string } {
  if (!file) return { valid: false, message: 'Chọn file ảnh' }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, message: 'Chỉ chấp nhận ảnh (JPEG, PNG, WebP, GIF)' }
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { valid: false, message: 'File không được quá 5MB' }
  }
  return { valid: true }
}

/**
 * Upload file ảnh lên Cloudinary dùng pre-sign params.
 * Không set Content-Type để browser/axios tự thêm multipart boundary.
 */
export async function uploadAvatarToCloudinary(
  imageFile: File,
  params: AvatarUploadParams
): Promise<string> {
  const formData = new FormData()
  formData.append('file', imageFile)
  formData.append('api_key', params.apiKey)
  formData.append('timestamp', String(params.timestamp))
  formData.append('signature', params.signature)
  formData.append('folder', params.folder)

  const response = await fetch(params.uploadUrl, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      (data?.error as { message?: string })?.message ?? data?.message ?? 'Upload thất bại'
    throw new Error(message)
  }

  if (!data.secure_url) {
    throw new Error('Response không có secure_url')
  }

  return data.secure_url
}
