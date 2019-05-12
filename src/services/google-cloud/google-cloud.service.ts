import { Injectable } from '@nestjs/common';
import * as language from '@google-cloud/language';

@Injectable()
export class GoogleCloudService {

  private client: any;

  constructor() {
    this.client = new language.LanguageServiceClient();
  }

  public async analyzePost(post: any): Promise<any> {

    // The text to analyze
    const features = {
      extractSyntax: true,
      extractEntities: false,
      extractDocumentSentiment: true,
      extractEntitySentiment: false,
      classifyText: false,
    };

    const document = {
      content: post.full_text,
      type: 'PLAIN_TEXT',
    };

    // Detects the sentiment and syntactic information of the text
    const [result] = await this.client.annotateText({ document, features });
    return result;
  }
}
