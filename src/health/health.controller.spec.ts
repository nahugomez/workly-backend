import { Test, TestingModule } from '@nestjs/testing'
import type { HealthResponseDto } from './dto/health-response.dto'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'

describe('HealthController', () => {
  let controller: HealthController
  let service: HealthService

  const mockHealthResponse: HealthResponseDto = {
    status: 'ok',
    timestamp: '2026-02-09T15:30:45.123Z',
    version: '0.0.1',
    uptime: 3600.5,
    environment: 'test',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            getHealth: jest.fn().mockReturnValue(mockHealthResponse),
          },
        },
      ],
    }).compile()

    controller = module.get<HealthController>(HealthController)
    service = module.get<HealthService>(HealthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getHealth', () => {
    it('should return health status from service', () => {
      const result = controller.getHealth()

      expect(result).toEqual(mockHealthResponse)
      expect(service.getHealth).toHaveBeenCalled()
    })

    it('should call health service exactly once', () => {
      controller.getHealth()

      expect(service.getHealth).toHaveBeenCalledTimes(1)
    })

    it('should return response with correct structure', () => {
      const result = controller.getHealth()

      expect(result).toHaveProperty('status')
      expect(result).toHaveProperty('timestamp')
      expect(result).toHaveProperty('version')
      expect(result).toHaveProperty('uptime')
      expect(result).toHaveProperty('environment')
    })

    it('should return ok status', () => {
      const result = controller.getHealth()

      expect(result.status).toBe('ok')
    })
  })
})
