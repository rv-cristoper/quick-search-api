import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { HttpModule } from '@nestjs/axios';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: configuration().apiUrl,
        headers: {
          Authorization: `Bearer ${configuration().token}`,
          accept: 'application/json',
        },
      }),
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
