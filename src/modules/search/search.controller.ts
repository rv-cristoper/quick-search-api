import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@Controller('search')
@ApiTags('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar información por DNI o RUC' })
  @ApiQuery({
    name: 'documentType',
    enum: ['dni', 'ruc'],
    description: 'Tipo de documento',
  })
  @ApiQuery({ name: 'documentNumber', description: 'Número de documento' })
  async findAll(@Query() query: SearchDto) {
    return {
      message: 'success',
      data: await this.searchService.search(query),
    };
  }
}
