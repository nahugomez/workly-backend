import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication<App>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.setGlobalPrefix('api/v1', {
      exclude: ['/'],
    })
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  describe('Health Endpoint', () => {
    it('/api/v1/health (GET) should return health status', () => {
      return request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('status', 'ok')
          expect(res.body).toHaveProperty('timestamp')
          expect(res.body).toHaveProperty('version')
          expect(res.body).toHaveProperty('uptime')
          expect(res.body).toHaveProperty('environment')
        })
    })

    it('/api/v1/health (GET) should return valid timestamp', () => {
      return request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200)
        .expect((res) => {
          const timestamp = new Date(res.body.timestamp)
          expect(timestamp.toString()).not.toBe('Invalid Date')
        })
    })

    it('/api/v1/health (GET) should return positive uptime', () => {
      return request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200)
        .expect((res) => {
          expect(typeof res.body.uptime).toBe('number')
          expect(res.body.uptime).toBeGreaterThan(0)
        })
    })
  })

  describe('Root Redirect', () => {
    it('/ (GET) should redirect to /api/v1/health', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(302)
        .expect('Location', '/api/v1/health')
    })
  })
})
