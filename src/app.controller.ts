import { Controller, Get, Redirect } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  @Redirect('/api/v1/health', 302)
  redirectToHealth() {
    // Redirect root to health endpoint
  }
}
