import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupSwagger from './modules/swagger.module';
import appsettings from './configs/appsettings';
import { ValidationPipe } from '@nestjs/common';
import { CaseInsensitiveQueryPipe } from './modules/pipes/CaseInsensitiveQueryPipe ';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  const PORT = appsettings.env === 'development' ? appsettings.port : 0; // Port 0 means let the OS assign an available port

  app.useGlobalPipes(
    new CaseInsensitiveQueryPipe(),
    new ValidationPipe({
      transform: true, // 👈 Enables query/body/class transformation
      whitelist: true, // optional: strips unknown fields
    }),
  );
  await app.listen(PORT);
  return app;
}

bootstrap()
  .then(async (app) => {
    try {
      const serverUrl = await app.getUrl();
      console.log(`Application is running at: ${serverUrl}`);
    } catch {
      console.log('Application is running (port assigned by hosting provider)');
    }
  })
  .catch((error) => {
    console.error('Bootstrap failed', error);
  });
