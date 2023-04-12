import type { ClientConfiguration, CreateChatCompletionRequest, CreateCompletionRequest, CreateEditRequest, CreateEmbeddingRequest, CreateImageRequest, CreateModerationRequest, CreateImageEditRequest, CreateImageVariationRequest, CreateTranscriptionRequest, CreateTranslationRequest, CreateRequestInfo } from './interface';
export declare class OpenAIApiBuilder {
    configuration: ClientConfiguration;
    constructor(configuration: ClientConfiguration);
    configure(configuration: ClientConfiguration): void;
    createRequest(info: CreateRequestInfo): Promise<Response>;
    createChatCompletion(createChatCompletionRequest: BodyInit | CreateChatCompletionRequest, needsSerialization?: boolean): Promise<Response>;
    createCompletion(createCompletionRequest: BodyInit | CreateCompletionRequest, needsSerialization?: boolean): Promise<Response>;
    createEdit(createEditRequest: BodyInit | CreateEditRequest, needsSerialization?: boolean): {
        url: string;
        method: string;
        headers: {
            'Content-Type': string;
        };
        body: any;
    };
    createEmbedding(createEmbeddingRequest: BodyInit | CreateEmbeddingRequest, needsSerialization?: boolean): {
        url: string;
        method: string;
        headers: {
            'Content-Type': string;
        };
        body: any;
    };
    createImage(createImageRequest: BodyInit | CreateImageRequest, needsConversion?: boolean): {
        url: string;
        method: string;
        headers: {
            'Content-Type': string;
        };
        body: any;
    };
    createImageEdit(createImageEditRequest: BodyInit | CreateImageEditRequest, needsConversion?: boolean): {
        url: string;
        method: string;
        headers: {
            'Content-Type': string;
        };
        body: any;
    };
    createImageVariation(createImageVariationRequest: BodyInit | CreateImageVariationRequest, needsConversion?: boolean): {
        url: string;
        method: string;
        headers: {
            'Content-Type': string;
        };
        body: any;
    };
    createModeration(createModerationRequest: BodyInit | CreateModerationRequest, needsConversion?: boolean): {
        url: string;
        method: string;
        headers: {
            'Content-Type': string;
        };
        body: any;
    };
    createTranscription(createTranscriptionRequest: BodyInit | CreateTranscriptionRequest, needsConversion?: boolean): {
        url: string;
        method: string;
        headers: {
            'Content-Type': string;
        };
        body: any;
    };
    createTranslation(createTranslationRequest: BodyInit | CreateTranslationRequest, needsConversion?: boolean): {
        url: string;
        method: string;
        headers: {
            'Content-Type': string;
        };
        body: any;
    };
    static build(configuration: ClientConfiguration): OpenAIApiBuilder;
}
//# sourceMappingURL=request.d.ts.map