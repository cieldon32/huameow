import { OpenAIApiBuilder } from './request';
import { ClientConfiguration, CreateCompletionRequest, CreateCompletionResponse, CreateChatCompletionResponse, CreateChatCompletionRequest } from './interface';
export declare class OpenAIApiClient {
    api: OpenAIApiBuilder;
    constructor(config: ClientConfiguration);
    createCompletion(body: CreateCompletionRequest): Promise<CreateCompletionResponse>;
    createChatCompletion(body: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse>;
    static builder(configuration?: ClientConfiguration): OpenAIApiClient;
}
//# sourceMappingURL=client.d.ts.map