import { Injectable } from '@nestjs/common'
import * as packageJson from '../../package.json'
import { HealthResponseDto } from './dto/health-response.dto'

@Injectable()
export class HealthService {
  getHealth(): HealthResponseDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: packageJson.version,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    }
  }
}
