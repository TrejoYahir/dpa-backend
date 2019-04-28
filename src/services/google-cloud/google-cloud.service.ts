import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import * as language from '@google-cloud/language';

@Injectable()
export class GoogleCloudService {

  private client: any;

  constructor(private config: ConfigService) {
    this.client = new language.LanguageServiceClient();
  }

  public async analyzePost(post: any): Promise<any> {

    // The text to analyze

    const document = {
      content: post,
      type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    const [result] = await this.client.annotateText({ document });
    const sentiment = result.documentSentiment;

    console.log(`Text: ${post}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

  }
}
