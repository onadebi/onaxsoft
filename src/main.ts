import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupSwagger from './modules/swagger.module';
import appsettings from './configs/appsettings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(process.env.PORT ?? appsettings.port);
}
bootstrap()
  .then(() => {
    console.log(
      `Application is running on: http://localhost:${process.env.PORT ?? appsettings.port}`,
    );
  })
  .catch((error) => {
    console.error('Bootstrap failed', error);
  });
