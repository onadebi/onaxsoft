import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "node:path";

const TemplateEngine = (
  app: NestExpressApplication,
  templateEngine?: string,
) => {
  const allowedViewEngines = ["hbs", "ejs"];
  if (!templateEngine && allowedViewEngines.includes(templateEngine || "")) {
    templateEngine = "ejs";
  }
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine(templateEngine!);
};

export default TemplateEngine;
