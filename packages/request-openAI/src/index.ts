import {OpenAIApiClient} from './client';
import {Configuration} from './interface';
class OpenAI {
  constructor(config: Configuration) {
    const openai: OpenAIApiClient = OpenAIApiClient.builder({
      baseURL: config.baseURL,
      headersInit: {
        Authorization: `Bearer ${config.apiKey}`,
        'OpenAI-Organization': config.apiOrg || '',
      },
    });
    return openai;
  }
}

export default OpenAI;
