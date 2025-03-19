import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setUpSwagger(app: INestApplication) {
  SwaggerModule.setup('doc', app, () => {
    const config = new DocumentBuilder()
      .setTitle('Quick Search API')
      .setDescription(
        'API de búsqueda rápida para documentos de identidad DNI y RUC.',
      )
      .build();

    return SwaggerModule.createDocument(app, config);
  });
}
