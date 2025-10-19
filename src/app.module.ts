import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiController } from './controllers/gemini/gemini.controller';

@Module({
  imports: [],
  controllers: [AppController, GeminiController],
  providers: [AppService],
})
export class AppModule {}
