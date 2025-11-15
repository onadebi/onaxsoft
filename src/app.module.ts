import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TaskModule } from "./task/task.module";
import { AiModule } from "./ai/ai.module";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [UserModule, TaskModule, AiModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
