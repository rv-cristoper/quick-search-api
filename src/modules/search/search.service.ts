import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SearchDto } from './dto/search.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async search(query: SearchDto) {
    try {
      const {
        data: { data },
      } = await firstValueFrom(
        this.httpService
          .post<{
            data: {
              nombre_completo?: string;
              nombre_o_razon_social?: string;
              codigo_verificacion?: string;
            };
          }>(`${query.documentType}`, {
            [query.documentType]: query.documentNumber,
          })
          .pipe(
            catchError((e: AxiosError) => {
              throw e;
            }),
          ),
      );
      return {
        fullName: data.nombre_completo || data.nombre_o_razon_social,
        checkDigit: data.codigo_verificacion,
      };
    } catch {
      throw new NotFoundException({
        message: 'No se encontró información',
      });
    }
  }
}
