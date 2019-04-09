import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import * as Twitter from 'twitter';
import { TwitterAuthDto } from 'src/dtos/twitter-auth.dto';

@Injectable()
export class SocialService {

    constructor(private config: ConfigService) {
    }

    public getTwitterPosts(twitterAuth: TwitterAuthDto, count: number): any {

        const twitterKeys = {
            consumer_key: this.config.get('TWITTER_CONSUMER_KEY'),
            consumer_secret: this.config.get('TWITTER_CONSUMER_SECRET'),
            access_token_key: twitterAuth.token || this.config.get('TWITTER_ACCESS_KEY'),
            access_token_secret: twitterAuth.secret || this.config.get('TWITTER_ACCESS_SECRET')
        }
        
        let twitterClient = new Twitter(twitterKeys);

        const options = {
            screen_name: twitterAuth.username,           
            count: count
        };

        return twitterClient.get('statuses/user_timeline', options);

    }
}
