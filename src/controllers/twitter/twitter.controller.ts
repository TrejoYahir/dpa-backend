import { Controller, ServiceUnavailableException, Body, Post, Query } from '@nestjs/common';
import { SocialService } from 'src/services/social/social.service';
import { TwitterAuthDto } from 'src/dtos/twitter-auth.dto';

@Controller('twitter')
export class TwitterController {

    constructor(private socialService: SocialService) { }

    @Post()
    async fetchPosts(@Body() twitterAuth: TwitterAuthDto, @Query() params): Promise<string> {
        try {
            const response = await this.socialService.getTwitterPosts(twitterAuth, params.limit || 100);
            return response;
        } catch (error) {
            console.log('error', error);
            throw new ServiceUnavailableException();
        }
    }
}
