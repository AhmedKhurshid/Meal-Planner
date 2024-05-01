import { NestFactory } from '@nestjs/core';
import { configSwagger, configValidation } from 'core/config';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(configValidation);
  configSwagger(app);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  // await app.listen(parseInt(process.env.PORT) || 2000);
  await app.listen(parseInt(process.env.PORT) || 3000); 

  
}
bootstrap();


// import { NestFactory } from '@nestjs/core';
// import { configSwagger, configValidation } from 'core/config';
// import { AppModule } from './app.module';
// import { join } from 'path';
// import { NestExpressApplication } from '@nestjs/platform-express';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   app.setGlobalPrefix('api');
//   app.useGlobalPipes(configValidation);
//   configSwagger(app);
//   app.enableCors();
//   app.useStaticAssets(join(__dirname, '..', 'public'), {
//     prefix: '/public/',
//   });

//   // Specify your custom IP address and port
//   await app.listen(parseInt(process.env.PORT) || 3014, '192.168.100.86');
// }

// bootstrap();



