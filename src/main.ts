import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupSwagger from './modules/swagger.module';
import appsettings from './configs/appsettings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  const PORT = appsettings.env === 'development' ? appsettings.port : 0;
  await app.listen(PORT); // Port 0 means let the OS assign an available port
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
