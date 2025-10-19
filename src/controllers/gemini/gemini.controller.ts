import { Controller, Param, Query, Post } from '@nestjs/common';

@Controller('gemini')
export class GeminiController {
  @Post(':platform/user/:user')
  async getDocs(
    @Param('platform') platform: string,
    @Param('user') user: string,
    @Query('version') version?: string,
  ): Promise<{ url: string; platform: string; user: string }> {
    const result = new Promise<{
      url: string;
      platform: string;
      user: string;
    }>((resolve) => {
      setTimeout(() => {
        if (version && version === '2') {
          resolve({ url: 'https://onaxsoft.com/gemini/v2/', platform, user });
          return;
        }
        resolve({ url: 'https://onaxsoft.com/gemini/', platform, user });
      }, 1000);
    });
    return await result;
  }
}
