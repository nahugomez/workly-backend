import { Test, TestingModule } from '@nestjs/testing'
import * as packageJson from '../../package.json'
import { HealthService } from './health.service'

describe('HealthService', () => {
  let service: HealthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile()

    service = module.get<HealthService>(HealthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getHealth', () => {
    it('should return health status with all required fields', () => {
      const result = service.getHealth()

      expect(result).toHaveProperty('status')
      expect(result).toHaveProperty('timestamp')
      expect(result).toHaveProperty('version')
      expect(result).toHaveProperty('uptime')
      expect(result).toHaveProperty('environment')
    })

    it('should return status as "ok"', () => {
      const result = service.getHealth()

      expect(result.status).toBe('ok')
    })

    it('should return valid ISO 8601 timestamp', () => {
      const result = service.getHealth()

      expect(result.timestamp).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      )
      expect(new Date(result.timestamp).toString()).not.toBe('Invalid Date')
    })

    it('should return version from package.json', () => {
      const result = service.getHealth()

      expect(result.version).toBe(packageJson.version)
      expect(result.version).toBe('0.0.1')
    })

    it('should return uptime as positive number', () => {
      const result = service.getHealth()

      expect(typeof result.uptime).toBe('number')
      expect(result.uptime).toBeGreaterThan(0)
    })

    it('should return environment from NODE_ENV or default to development', () => {
      const result = service.getHealth()

      expect(typeof result.environment).toBe('string')
      expect(result.environment.length).toBeGreaterThan(0)
    })

    it('should return consistent structure on multiple calls', () => {
      const result1 = service.getHealth()
      const result2 = service.getHealth()

      expect(Object.keys(result1).sort()).toEqual(Object.keys(result2).sort())
      expect(result1.status).toBe(result2.status)
      expect(result1.version).toBe(result2.version)
    })
  })
})
