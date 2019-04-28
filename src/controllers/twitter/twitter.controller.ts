import { Controller, ServiceUnavailableException, Body, Post } from '@nestjs/common';
import { SocialService } from 'src/services/social/social.service';
import { TwitterAuthDto } from 'src/dtos/twitter-auth.dto';

@Controller('twitter')
export class TwitterController {

    constructor(private socialService: SocialService) { }

    @Post()
    fetchPosts(@Body() twitterAuth: TwitterAuthDto): string {
        const response = this.socialService.getTwitterPosts(twitterAuth, 100).then((data) => {
            console.log('sucess', data[0].text);
            return response;
        }).catch((error) => {
            console.log('error', error);
            throw new ServiceUnavailableException();
        });

        return response;
    }
}
