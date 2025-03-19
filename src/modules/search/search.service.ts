import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DocumentType, SearchDto } from './dto/search.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async search(query: SearchDto) {
    const path = {
      [DocumentType.DNI]: `/reniec`,
      [DocumentType.RUC]: `/sunat`,
    };
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<{
            razonSocial?: string;
            nombreCompleto?: string;
            digitoVerificador?: string;
          }>(
            `${path[query.documentType]}/${query.documentType}?numero=${query.documentNumber}`,
          )
          .pipe(
            catchError((e: AxiosError) => {
              throw e;
            }),
          ),
      );
      return {
        fullName: data.nombreCompleto || data.razonSocial,
        checkDigit: data.digitoVerificador,
      };
    } catch {
      throw new NotFoundException({
        message: 'No se encontró información',
      });
    }
  }
}
