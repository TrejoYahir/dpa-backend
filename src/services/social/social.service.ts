import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import * as Twitter from 'twitter';
import { TwitterAuthDto } from 'src/dtos/twitter-auth.dto';
import { GoogleCloudService } from '../google-cloud/google-cloud.service';
import { PostDto } from '../../dtos/post.dto';

@Injectable()
export class SocialService {

    constructor(private config: ConfigService, private googleCloud: GoogleCloudService) {
    }

    public async getTwitterPosts(twitterAuth: TwitterAuthDto, count: number): Promise<any> {

        const processedTweets: any[] = [];

        const twitterKeys = {
            consumer_key: this.config.get('TWITTER_CONSUMER_KEY'),
            consumer_secret: this.config.get('TWITTER_CONSUMER_SECRET'),
            access_token_key: twitterAuth.token || this.config.get('TWITTER_ACCESS_KEY'),
            access_token_secret: twitterAuth.secret || this.config.get('TWITTER_ACCESS_SECRET'),
        };

        const twitterClient = new Twitter(twitterKeys);

        const options = {
            screen_name: twitterAuth.userName,
            count,
            tweet_mode: 'extended',
        };

        try {
            const tweets = await twitterClient.get('statuses/user_timeline', options);
            console.log('tweets', tweets);
            console.log('=====================================');
            for (const tweet of tweets) {
                const processedTweet = await this.googleCloud.analyzePost(tweet);
                processedTweet.post = new PostDto(tweet.full_text, tweet.created_at);
                processedTweets.push(processedTweet);
            }
            console.log('processed tweets', processedTweets);
            console.log('=====================================');
            return processedTweets;
        } catch (e) {
            console.log('error', e);
            throw new ServiceUnavailableException();
        }

    }
}
