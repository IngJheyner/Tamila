import { Controller, Get } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  @Get()
  index(): string {
    return 'Hello World!';
  }
}
