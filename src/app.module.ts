import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitterController } from './controllers/twitter/twitter.controller';
import { SocialService } from './services/social/social.service';
import { ConfigModule } from './config/config.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http.filter';
import { GoogleCloudService } from './services/google-cloud/google-cloud.service';

@Module({
  imports: [ConfigModule],
  controllers: [AppController, TwitterController],
  providers: [
    AppService,
    SocialService,
    GoogleCloudService,
    /* {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
    }, */
  ],
})
export class AppModule {}
