import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined()
    })

    it('should have redirectToHealth method', () => {
      expect(appController.redirectToHealth).toBeDefined()
    })
  })
})
