import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const config = new DocumentBuilder()
  .setTitle("OnaxSoft API")
  .setDescription("The OnaxSoft API description")
  .setVersion("1.0")
  .addTag("onaxsoft")
  .build();

const setupSwagger = (app: INestApplication) => {
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);
};

export default setupSwagger;
