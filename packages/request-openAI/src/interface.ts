export interface Configuration{
  baseURL?: string;
  apiKey?: string;
  apiOrg?: string;
}

export interface ClientConfiguration {
  /**
   * 基础路径
   *
   * @defaultValue 'https://api.openai.com'
   */
  baseURL?: string;

  /**
   * API 版本
   *
   * @defaultValue 'v1'
   */
  apiVersion?: string;

  /**
   * OpenAI 的 API Key
   *
   * @param name security name
   * @memberof Configuration
   */
  apiKey?: string;

  /**
   * OpenAI 的 机构ID
   */
  organization?: string;

  /**
   * TODO 预留
   */
  username?: string;

  /**
   * TODO 预留
   */
  password?: string;

  /**
   * TODO 预留
   */
  accessToken?: string;

  /**
   * 自定义请求头
   */
  headersInit?: Record<string, string>;
}

export enum ChatCompletionMessageRoleEnum {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
}

export interface ChatCompletionRequestMessage {
  /**
   * The name of the user in a multi-user chat
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  name?: string;
  /**
   * The role of the author of this message.
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  role: ChatCompletionMessageRoleEnum;
  /**
   * The contents of the message
   * @type {string}
   * @memberof ChatCompletionRequestMessage
   */
  content: string;
}

export type ChatCompletionResponseMessage = Omit<
  ChatCompletionRequestMessage,
  'name'
>;

/**
 *
 * @export
 * @interface CreateChatCompletionRequest
 */
export interface CreateChatCompletionRequest {
  /**
   * ID of the model to use. Currently, only `gpt-3.5-turbo` and `gpt-3.5-turbo-0301` are supported.
   * @type {string}
   * @memberof CreateChatCompletionRequest
   */
  model: string;
  /**
   * The messages to generate chat completions for, in the [chat format](/docs/guides/chat/introduction).
   * @type {Array<ChatCompletionRequestMessage>}
   * @memberof CreateChatCompletionRequest
   */
  messages: Array<ChatCompletionRequestMessage>;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.  We generally recommend altering this or `top_p` but not both.
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or `temperature` but not both.
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  top_p?: number | null;
  /**
   * How many chat completion choices to generate for each input message.
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  n?: number | null;
  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with the stream terminated by a `data: [DONE]` message.
   * @type {boolean}
   * @memberof CreateChatCompletionRequest
   */
  stream?: boolean | null;
  /**
   *
   * @type {CreateChatCompletionRequestStop}
   * @memberof CreateChatCompletionRequest
   */
  stop?: CreateChatCompletionRequestStop;
  /**
   * The maximum number of tokens allowed for the generated answer. By default, the number of tokens the model can return will be (4096 - prompt tokens).
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  max_tokens?: number;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model\'s likelihood to talk about new topics.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  presence_penalty?: number | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model\'s likelihood to repeat the same line verbatim.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  frequency_penalty?: number | null;
  /**
   * Modify the likelihood of specified tokens appearing in the completion.  Accepts a json object that maps tokens (specified by their token ID in the tokenizer) to an associated bias value from -100 to 100. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.
   * @type {object}
   * @memberof CreateChatCompletionRequest
   */
  logit_bias?: object | null;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateChatCompletionRequest
   */
  user?: string;
}
/**
 * @type CreateChatCompletionRequestStop
 * Up to 4 sequences where the API will stop generating further tokens.
 * @export
 */
export type CreateChatCompletionRequestStop = Array<string> | string;

/**
 *
 * @export
 * @interface CreateChatCompletionResponse
 */
export interface CreateChatCompletionResponse {
  /**
   *
   * @type {string}
   * @memberof CreateChatCompletionResponse
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof CreateChatCompletionResponse
   */
  object: string;
  /**
   *
   * @type {number}
   * @memberof CreateChatCompletionResponse
   */
  created: number;
  /**
   *
   * @type {string}
   * @memberof CreateChatCompletionResponse
   */
  model: string;
  /**
   *
   * @type {Array<CreateChatCompletionResponseChoicesInner>}
   * @memberof CreateChatCompletionResponse
   */
  choices: Array<CreateChatCompletionResponseChoicesInner>;
  /**
   *
   * @type {CreateCompletionResponseUsage}
   * @memberof CreateChatCompletionResponse
   */
  usage?: CreateCompletionResponseUsage;
}
/**
 *
 * @export
 * @interface CreateChatCompletionResponseChoicesInner
 */
export interface CreateChatCompletionResponseChoicesInner {
  /**
   *
   * @type {number}
   * @memberof CreateChatCompletionResponseChoicesInner
   */
  index?: number;
  /**
   *
   * @type {ChatCompletionResponseMessage}
   * @memberof CreateChatCompletionResponseChoicesInner
   */
  message?: ChatCompletionResponseMessage;
  /**
   *
   * @type {string}
   * @memberof CreateChatCompletionResponseChoicesInner
   */
  finish_reason?: string;
}

/**
 *
 * @export
 * @interface CreateCompletionRequest
 */
export interface CreateCompletionRequest {
  /**
   * ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models/overview) for descriptions of them.
   * @type {string}
   * @memberof CreateCompletionRequest
   */
  model: string;
  /**
   *
   * @type {CreateCompletionRequestPrompt}
   * @memberof CreateCompletionRequest
   */
  prompt?: CreateCompletionRequestPrompt | null;
  /**
   * The suffix that comes after a completion of inserted text.
   * @type {string}
   * @memberof CreateCompletionRequest
   */
  suffix?: string | null;
  /**
   * The maximum number of [tokens](/tokenizer) to generate in the completion.  The token count of your prompt plus `max_tokens` cannot exceed the model\'s context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  max_tokens?: number | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.  We generally recommend altering this or `top_p` but not both.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or `temperature` but not both.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  top_p?: number | null;
  /**
   * How many completions to generate for each prompt.  **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  n?: number | null;
  /**
   * Whether to stream back partial progress. If set, tokens will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with the stream terminated by a `data: [DONE]` message.
   * @type {boolean}
   * @memberof CreateCompletionRequest
   */
  stream?: boolean | null;
  /**
   * Include the log probabilities on the `logprobs` most likely tokens, as well the chosen tokens. For example, if `logprobs` is 5, the API will return a list of the 5 most likely tokens. The API will always return the `logprob` of the sampled token, so there may be up to `logprobs+1` elements in the response.  The maximum value for `logprobs` is 5. If you need more than this, please contact us through our [Help center](https://help.openai.com) and describe your use case.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  logprobs?: number | null;
  /**
   * Echo back the prompt in addition to the completion
   * @type {boolean}
   * @memberof CreateCompletionRequest
   */
  echo?: boolean | null;
  /**
   *
   * @type {CreateCompletionRequestStop}
   * @memberof CreateCompletionRequest
   */
  stop?: CreateCompletionRequestStop | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model\'s likelihood to talk about new topics.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  presence_penalty?: number | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model\'s likelihood to repeat the same line verbatim.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  frequency_penalty?: number | null;
  /**
   * Generates `best_of` completions server-side and returns the \"best\" (the one with the highest log probability per token). Results cannot be streamed.  When used with `n`, `best_of` controls the number of candidate completions and `n` specifies how many to return – `best_of` must be greater than `n`.  **Note:** Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   * @type {number}
   * @memberof CreateCompletionRequest
   */
  best_of?: number | null;
  /**
   * Modify the likelihood of specified tokens appearing in the completion.  Accepts a json object that maps tokens (specified by their token ID in the GPT tokenizer) to an associated bias value from -100 to 100. You can use this [tokenizer tool](/tokenizer?view=bpe) (which works for both GPT-2 and GPT-3) to convert text to token IDs. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.  As an example, you can pass `{\"50256\": -100}` to prevent the <|endoftext|> token from being generated.
   * @type {object}
   * @memberof CreateCompletionRequest
   */
  logit_bias?: object | null;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateCompletionRequest
   */
  user?: string;
}
/**
 * @type CreateCompletionRequestPrompt
 * The prompt(s) to generate completions for, encoded as a string, array of strings, array of tokens, or array of token arrays.  Note that <|endoftext|> is the document separator that the model sees during training, so if a prompt is not specified the model will generate as if from the beginning of a new document.
 * @export
 */
export type CreateCompletionRequestPrompt =
  | Array<any>
  | Array<number>
  | Array<string>
  | string;

/**
 * @type CreateCompletionRequestStop
 * Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
 * @export
 */
export type CreateCompletionRequestStop = Array<string> | string;

/**
 *
 * @export
 * @interface CreateCompletionResponse
 */
export interface CreateCompletionResponse {
  /**
   *
   * @type {string}
   * @memberof CreateCompletionResponse
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof CreateCompletionResponse
   */
  object: string;
  /**
   *
   * @type {number}
   * @memberof CreateCompletionResponse
   */
  created: number;
  /**
   *
   * @type {string}
   * @memberof CreateCompletionResponse
   */
  model: string;
  /**
   *
   * @type {Array<CreateCompletionResponseChoicesInner>}
   * @memberof CreateCompletionResponse
   */
  choices: Array<CreateCompletionResponseChoicesInner>;
  /**
   *
   * @type {CreateCompletionResponseUsage}
   * @memberof CreateCompletionResponse
   */
  usage?: CreateCompletionResponseUsage;
}
/**
 *
 * @export
 * @interface CreateCompletionResponseChoicesInner
 */
export interface CreateCompletionResponseChoicesInner {
  /**
   *
   * @type {string}
   * @memberof CreateCompletionResponseChoicesInner
   */
  text?: string;
  /**
   *
   * @type {number}
   * @memberof CreateCompletionResponseChoicesInner
   */
  index?: number;
  /**
   *
   * @type {CreateCompletionResponseChoicesInnerLogprobs}
   * @memberof CreateCompletionResponseChoicesInner
   */
  logprobs?: CreateCompletionResponseChoicesInnerLogprobs | null;
  /**
   *
   * @type {string}
   * @memberof CreateCompletionResponseChoicesInner
   */
  finish_reason?: string;
}
/**
 *
 * @export
 * @interface CreateCompletionResponseChoicesInnerLogprobs
 */
export interface CreateCompletionResponseChoicesInnerLogprobs {
  /**
   *
   * @type {Array<string>}
   * @memberof CreateCompletionResponseChoicesInnerLogprobs
   */
  tokens?: Array<string>;
  /**
   *
   * @type {Array<number>}
   * @memberof CreateCompletionResponseChoicesInnerLogprobs
   */
  token_logprobs?: Array<number>;
  /**
   *
   * @type {Array<object>}
   * @memberof CreateCompletionResponseChoicesInnerLogprobs
   */
  top_logprobs?: Array<object>;
  /**
   *
   * @type {Array<number>}
   * @memberof CreateCompletionResponseChoicesInnerLogprobs
   */
  text_offset?: Array<number>;
}
/**
 *
 * @export
 * @interface CreateCompletionResponseUsage
 */
export interface CreateCompletionResponseUsage {
  /**
   *
   * @type {number}
   * @memberof CreateCompletionResponseUsage
   */
  prompt_tokens: number;
  /**
   *
   * @type {number}
   * @memberof CreateCompletionResponseUsage
   */
  completion_tokens: number;
  /**
   *
   * @type {number}
   * @memberof CreateCompletionResponseUsage
   */
  total_tokens: number;
}
/**
 *
 * @export
 * @interface CreateEditRequest
 */
export interface CreateEditRequest {
  /**
   * ID of the model to use. You can use the `text-davinci-edit-001` or `code-davinci-edit-001` model with this endpoint.
   * @type {string}
   * @memberof CreateEditRequest
   */
  model: string;
  /**
   * The input text to use as a starting point for the edit.
   * @type {string}
   * @memberof CreateEditRequest
   */
  input?: string | null;
  /**
   * The instruction that tells the model how to edit the prompt.
   * @type {string}
   * @memberof CreateEditRequest
   */
  instruction: string;
  /**
   * How many edits to generate for the input and instruction.
   * @type {number}
   * @memberof CreateEditRequest
   */
  n?: number | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.  We generally recommend altering this or `top_p` but not both.
   * @type {number}
   * @memberof CreateEditRequest
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or `temperature` but not both.
   * @type {number}
   * @memberof CreateEditRequest
   */
  top_p?: number | null;
}
/**
 *
 * @export
 * @interface CreateEditResponse
 */
export interface CreateEditResponse {
  /**
   *
   * @type {string}
   * @memberof CreateEditResponse
   */
  object: string;
  /**
   *
   * @type {number}
   * @memberof CreateEditResponse
   */
  created: number;
  /**
   *
   * @type {Array<CreateCompletionResponseChoicesInner>}
   * @memberof CreateEditResponse
   */
  choices: Array<CreateCompletionResponseChoicesInner>;
  /**
   *
   * @type {CreateCompletionResponseUsage}
   * @memberof CreateEditResponse
   */
  usage: CreateCompletionResponseUsage;
}
/**
 *
 * @export
 * @interface CreateEmbeddingRequest
 */
export interface CreateEmbeddingRequest {
  /**
   * ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models/overview) for descriptions of them.
   * @type {string}
   * @memberof CreateEmbeddingRequest
   */
  model: string;
  /**
   *
   * @type {CreateEmbeddingRequestInput}
   * @memberof CreateEmbeddingRequest
   */
  input: CreateEmbeddingRequestInput;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateEmbeddingRequest
   */
  user?: string;
}
/**
 * @type CreateEmbeddingRequestInput
 * Input text to get embeddings for, encoded as a string or array of tokens. To get embeddings for multiple inputs in a single request, pass an array of strings or array of token arrays. Each input must not exceed 8192 tokens in length.
 * @export
 */
export type CreateEmbeddingRequestInput =
  | Array<any>
  | Array<number>
  | Array<string>
  | string;

/**
 *
 * @export
 * @interface CreateEmbeddingResponse
 */
export interface CreateEmbeddingResponse {
  /**
   *
   * @type {string}
   * @memberof CreateEmbeddingResponse
   */
  object: string;
  /**
   *
   * @type {string}
   * @memberof CreateEmbeddingResponse
   */
  model: string;
  /**
   *
   * @type {Array<CreateEmbeddingResponseDataInner>}
   * @memberof CreateEmbeddingResponse
   */
  data: Array<CreateEmbeddingResponseDataInner>;
  /**
   *
   * @type {CreateEmbeddingResponseUsage}
   * @memberof CreateEmbeddingResponse
   */
  usage: CreateEmbeddingResponseUsage;
}
/**
 *
 * @export
 * @interface CreateEmbeddingResponseDataInner
 */
export interface CreateEmbeddingResponseDataInner {
  /**
   *
   * @type {number}
   * @memberof CreateEmbeddingResponseDataInner
   */
  index: number;
  /**
   *
   * @type {string}
   * @memberof CreateEmbeddingResponseDataInner
   */
  object: string;
  /**
   *
   * @type {Array<number>}
   * @memberof CreateEmbeddingResponseDataInner
   */
  embedding: Array<number>;
}
/**
 *
 * @export
 * @interface CreateEmbeddingResponseUsage
 */
export interface CreateEmbeddingResponseUsage {
  /**
   *
   * @type {number}
   * @memberof CreateEmbeddingResponseUsage
   */
  prompt_tokens: number;
  /**
   *
   * @type {number}
   * @memberof CreateEmbeddingResponseUsage
   */
  total_tokens: number;
}

/**
 *
 * @export
 * @interface CreateImageRequest
 */
export interface CreateImageRequest {
  /**
   * A text description of the desired image(s). The maximum length is 1000 characters.
   * @type {string}
   * @memberof CreateImageRequest
   */
  prompt: string;
  /**
   * The number of images to generate. Must be between 1 and 10.
   * @type {number}
   * @memberof CreateImageRequest
   */
  n?: number | null;
  /**
   * The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`.
   * @type {string}
   * @memberof CreateImageRequest
   */
  size?: CreateImageRequestSizeEnum;
  /**
   * The format in which the generated images are returned. Must be one of `url` or `b64_json`.
   * @type {string}
   * @memberof CreateImageRequest
   */
  response_format?: CreateImageRequestResponseFormatEnum;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateImageRequest
   */
  user?: string;
}

export const CreateImageRequestSizeEnum = {
  _256x256: '256x256',
  _512x512: '512x512',
  _1024x1024: '1024x1024',
} as const;

export type CreateImageRequestSizeEnum =
  (typeof CreateImageRequestSizeEnum)[keyof typeof CreateImageRequestSizeEnum];

export const CreateImageRequestResponseFormatEnum = {
  Url: 'url',
  B64Json: 'b64_json',
} as const;

export type CreateImageRequestResponseFormatEnum =
  (typeof CreateImageRequestResponseFormatEnum)[keyof typeof CreateImageRequestResponseFormatEnum];

/**
 *
 * @export
 * @interface CreateModerationRequest
 */
export interface CreateModerationRequest {
  /**
   *
   * @type {CreateModerationRequestInput}
   * @memberof CreateModerationRequest
   */
  input: CreateModerationRequestInput;
  /**
   * Two content moderations models are available: `text-moderation-stable` and `text-moderation-latest`.  The default is `text-moderation-latest` which will be automatically upgraded over time. This ensures you are always using our most accurate model. If you use `text-moderation-stable`, we will provide advanced notice before updating the model. Accuracy of `text-moderation-stable` may be slightly lower than for `text-moderation-latest`.
   * @type {string}
   * @memberof CreateModerationRequest
   */
  model?: string;
}
/**
 * @type CreateModerationRequestInput
 * The input text to classify
 * @export
 */
export type CreateModerationRequestInput = Array<string> | string;

/**
 *
 * @export
 * @interface CreateModerationResponse
 */
export interface CreateModerationResponse {
  /**
   *
   * @type {string}
   * @memberof CreateModerationResponse
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof CreateModerationResponse
   */
  model: string;
  /**
   *
   * @type {Array<CreateModerationResponseResultsInner>}
   * @memberof CreateModerationResponse
   */
  results: Array<CreateModerationResponseResultsInner>;
}
/**
 *
 * @export
 * @interface CreateModerationResponseResultsInner
 */
export interface CreateModerationResponseResultsInner {
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInner
   */
  flagged: boolean;
  /**
   *
   * @type {CreateModerationResponseResultsInnerCategories}
   * @memberof CreateModerationResponseResultsInner
   */
  categories: CreateModerationResponseResultsInnerCategories;
  /**
   *
   * @type {CreateModerationResponseResultsInnerCategoryScores}
   * @memberof CreateModerationResponseResultsInner
   */
  category_scores: CreateModerationResponseResultsInnerCategoryScores;
}
/**
 *
 * @export
 * @interface CreateModerationResponseResultsInnerCategories
 */
export interface CreateModerationResponseResultsInnerCategories {
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  hate: boolean;
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'hate/threatening': boolean;
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'self-harm': boolean;
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  sexual: boolean;
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'sexual/minors': boolean;
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  violence: boolean;
  /**
   *
   * @type {boolean}
   * @memberof CreateModerationResponseResultsInnerCategories
   */
  'violence/graphic': boolean;
}

/**
 *
 * @export
 * @interface CreateModerationResponseResultsInnerCategoryScores
 */
export interface CreateModerationResponseResultsInnerCategoryScores {
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  hate: number;
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'hate/threatening': number;
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'self-harm': number;
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  sexual: number;
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'sexual/minors': number;
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  violence: number;
  /**
   *
   * @type {number}
   * @memberof CreateModerationResponseResultsInnerCategoryScores
   */
  'violence/graphic': number;
}

export interface CreateImageEditRequest {
  image: File;
  prompt: string;
  mask?: File;
  n?: number;
  size?: string;
  responseFormat?: string;
  user?: string;
}

export interface CreateImageVariationRequest {
  image: File;
  n?: number;
  size?: string;
  responseFormat?: string;
  user?: string;
}

export interface CreateTranscriptionRequest {
  file: File;
  model: string;
  prompt?: string;
  responseFormat?: string;
  temperature?: number;
  language?: string;
}

export interface CreateTranslationRequest {
  file: File;
  model: string;
  prompt?: string;
  responseFormat?: string;
  temperature?: number;
}

export interface CreateRequestInfo {
  url: string;
  method?: string;
  headers: Record<string, string>;
  body: BodyInit;
}
