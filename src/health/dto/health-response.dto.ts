export interface HealthResponseDto {
  status: 'ok' | 'error'
  timestamp: string
  version: string
  uptime: number
  environment: string
}
