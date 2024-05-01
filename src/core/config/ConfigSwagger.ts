import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const configSwagger = (app) => {
  const swaggerDoc = new DocumentBuilder()
    .setTitle('MEAL PLAN (ML)')
    .setDescription('This Application in Process')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('/', app, SwaggerModule.createDocument(app, swaggerDoc));
};
