import {
  mergeHeaders,
  serializeDataIfNeeded,
  convertToFormDataIfNeeded,
  removeLeadingSlash,
  removeTrailingSlash,
} from './http';

import type {
  ClientConfiguration,
  CreateChatCompletionRequest,
  CreateCompletionRequest,
  CreateEditRequest,
  CreateEmbeddingRequest,
  CreateImageRequest,
  CreateModerationRequest,
  CreateImageEditRequest,
  CreateImageVariationRequest,
  CreateTranscriptionRequest,
  CreateTranslationRequest,
  CreateRequestInfo,
} from './interface';

const BASE_PATH = 'https://api.openai.com';

function buildURL(path: string, base?: string): URL {
  return new URL(path, base || BASE_PATH);
}

export class OpenAIApiBuilder {
  constructor(public configuration: ClientConfiguration) {}

  configure(configuration: ClientConfiguration) {
    this.configuration = { ...this.configuration, ...configuration };
  }

  async createRequest(info: CreateRequestInfo): Promise<Response> {
    const { baseURL, apiVersion = 'v1', headersInit } = this.configuration;

    // 防止外部存在多余的斜杠
    const path = removeTrailingSlash(removeLeadingSlash(apiVersion));

    return fetch(buildURL(`/${path}/${info.url}`, baseURL), {
      method: info.method,
      headers: mergeHeaders(new Headers(info.headers), headersInit),
      body: info.body,
    });
  }

  createChatCompletion(
    createChatCompletionRequest: BodyInit | CreateChatCompletionRequest,
    needsSerialization?: boolean
  ) {
    return this.createRequest({
      url: 'chat/completions',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: serializeDataIfNeeded(
        createChatCompletionRequest,
        needsSerialization
      ),
    });
  }

  createCompletion(
    createCompletionRequest: BodyInit | CreateCompletionRequest,
    needsSerialization?: boolean
  ) {
    return this.createRequest({
      url: 'completions',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: serializeDataIfNeeded(createCompletionRequest, needsSerialization),
    });
  }

  createEdit(
    createEditRequest: BodyInit | CreateEditRequest,
    needsSerialization?: boolean
  ) {
    return {
      url: 'edits',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: serializeDataIfNeeded(createEditRequest, needsSerialization),
    };
  }

  createEmbedding(
    createEmbeddingRequest: BodyInit | CreateEmbeddingRequest,
    needsSerialization?: boolean
  ) {
    return {
      url: 'embeddings',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: serializeDataIfNeeded(createEmbeddingRequest, needsSerialization),
    };
  }

  createImage(
    createImageRequest: BodyInit | CreateImageRequest,
    needsConversion?: boolean
  ) {
    return {
      url: 'images/generations',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: convertToFormDataIfNeeded(createImageRequest, needsConversion),
    };
  }

  createImageEdit(
    createImageEditRequest: BodyInit | CreateImageEditRequest,
    needsConversion?: boolean
  ) {
    return {
      url: ' /images/edits',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: convertToFormDataIfNeeded(createImageEditRequest, needsConversion),
    };
  }

  createImageVariation(
    createImageVariationRequest: BodyInit | CreateImageVariationRequest,
    needsConversion?: boolean
  ) {
    return {
      url: ' /images/variations',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: convertToFormDataIfNeeded(
        createImageVariationRequest,
        needsConversion
      ),
    };
  }

  createModeration(
    createModerationRequest: BodyInit | CreateModerationRequest,
    needsConversion?: boolean
  ) {
    return {
      url: ' /moderations',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: convertToFormDataIfNeeded(createModerationRequest, needsConversion),
    };
  }

  createTranscription(
    createTranscriptionRequest: BodyInit | CreateTranscriptionRequest,
    needsConversion?: boolean
  ) {
    return {
      url: 'audio/transcriptions',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: convertToFormDataIfNeeded(
        createTranscriptionRequest,
        needsConversion
      ),
    };
  }

  createTranslation(
    createTranslationRequest: BodyInit | CreateTranslationRequest,
    needsConversion?: boolean
  ) {
    return {
      url: 'audio/translations',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: convertToFormDataIfNeeded(
        createTranslationRequest,
        needsConversion
      ),
    };
  }

  static build(configuration: ClientConfiguration) {
    return new OpenAIApiBuilder(configuration);
  }
}
