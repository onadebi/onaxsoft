import { Controller, Param, Query, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Ai Ops')
@Controller('api/ai')
export class AiController {

  @ApiOperation({ summary: 'Get documentation URL for a user on a platform' })
  @ApiResponse({ status: 200, description: 'Documentation URL retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Documentation not found' })
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
