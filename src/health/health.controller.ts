import { Controller, Get } from '@nestjs/common'
import type { HealthResponseDto } from './dto/health-response.dto'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): HealthResponseDto {
    return this.healthService.getHealth()
  }
}
