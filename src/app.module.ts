import { Module } from '@nestjs/common';
import { SearchModule } from './modules/search/search.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
