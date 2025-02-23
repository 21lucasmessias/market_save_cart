import { Body, Controller, Post } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { CalculateDto } from './dto/calculate.dto';

@Controller('calculate')
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Post()
  create(@Body() dto: CalculateDto) {
    return this.calculateService.calculate(dto);
  }
}
