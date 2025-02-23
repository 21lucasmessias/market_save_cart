import { Injectable } from '@nestjs/common';
import { CalculateDto } from './dto/calculate.dto';

@Injectable()
export class CalculateService {
  calculate(dto: CalculateDto) {
    return 'This action returns all calculate';
  }
}
