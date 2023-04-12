/* eslint-disable @typescript-eslint/no-explicit-any */
function serializeDataIfNeeded(data, needsSerialization) {
    if (!data)
        return;
    return needsSerialization && typeof data === 'object'
        ? JSON.stringify(data)
        : data || '';
}
function convertToFormDataIfNeeded(data, needsConversion) {
    if (!data)
        return;
    if (typeof data === 'object' && needsConversion) {
        const formData = new FormData();
        for (const key in data) {
            // eslint-disable-next-line no-prototype-builtins
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                if (value in File) {
                    formData.append(key, value, value.name);
                }
                else if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(key, item);
                    });
                }
                else {
                    formData.append(key, value[key]);
                }
            }
        }
        return formData;
    }
    return data;
}
function mergeHeaders(headers, init) {
    const mergedHeaders = new Headers(init);
    headers.forEach((value, key) => {
        mergedHeaders.append(key, value);
    });
    return mergedHeaders;
}
function removeLeadingSlash(path) {
    return path.startsWith('/') ? path.slice(1) : path;
}
function removeTrailingSlash(path) {
    return path.endsWith('/') ? path.slice(0, -1) : path;
}

const BASE_PATH = 'https://api.openai.com';
function buildURL(path, base) {
    return new URL(path, base || BASE_PATH);
}
class OpenAIApiBuilder {
    constructor(configuration) {
        this.configuration = configuration;
    }
    configure(configuration) {
        this.configuration = Object.assign(Object.assign({}, this.configuration), configuration);
    }
    async createRequest(info) {
        const { baseURL, apiVersion = 'v1', headersInit } = this.configuration;
        // 防止外部存在多余的斜杠
        const path = removeTrailingSlash(removeLeadingSlash(apiVersion));
        return fetch(buildURL(`/${path}/${info.url}`, baseURL), {
            method: info.method,
            headers: mergeHeaders(new Headers(info.headers), headersInit),
            body: info.body,
        });
    }
    createChatCompletion(createChatCompletionRequest, needsSerialization) {
        return this.createRequest({
            url: 'chat/completions',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: serializeDataIfNeeded(createChatCompletionRequest, needsSerialization),
        });
    }
    createCompletion(createCompletionRequest, needsSerialization) {
        return this.createRequest({
            url: 'completions',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: serializeDataIfNeeded(createCompletionRequest, needsSerialization),
        });
    }
    createEdit(createEditRequest, needsSerialization) {
        return {
            url: 'edits',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: serializeDataIfNeeded(createEditRequest, needsSerialization),
        };
    }
    createEmbedding(createEmbeddingRequest, needsSerialization) {
        return {
            url: 'embeddings',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: serializeDataIfNeeded(createEmbeddingRequest, needsSerialization),
        };
    }
    createImage(createImageRequest, needsConversion) {
        return {
            url: 'images/generations',
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: convertToFormDataIfNeeded(createImageRequest, needsConversion),
        };
    }
    createImageEdit(createImageEditRequest, needsConversion) {
        return {
            url: ' /images/edits',
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: convertToFormDataIfNeeded(createImageEditRequest, needsConversion),
        };
    }
    createImageVariation(createImageVariationRequest, needsConversion) {
        return {
            url: ' /images/variations',
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: convertToFormDataIfNeeded(createImageVariationRequest, needsConversion),
        };
    }
    createModeration(createModerationRequest, needsConversion) {
        return {
            url: ' /moderations',
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: convertToFormDataIfNeeded(createModerationRequest, needsConversion),
        };
    }
    createTranscription(createTranscriptionRequest, needsConversion) {
        return {
            url: 'audio/transcriptions',
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: convertToFormDataIfNeeded(createTranscriptionRequest, needsConversion),
        };
    }
    createTranslation(createTranslationRequest, needsConversion) {
        return {
            url: 'audio/translations',
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: convertToFormDataIfNeeded(createTranslationRequest, needsConversion),
        };
    }
    static build(configuration) {
        return new OpenAIApiBuilder(configuration);
    }
}

async function transformResponse(response) {
    if (response.ok) {
        const res = await response.json();
        const ex = res.error;
        return ex ? Promise.reject(new Error(ex.message || '请求失败')) : res;
    }
    return Promise.reject(new Error(response.statusText));
}
class OpenAIApiClient {
    constructor(config) {
        this.api = OpenAIApiBuilder.build(config);
    }
    async createCompletion(body) {
        return transformResponse(await this.api.createCompletion(body, true));
    }
    async createChatCompletion(body) {
        return transformResponse(await this.api.createChatCompletion(body, true));
    }
    static builder(configuration) {
        return new OpenAIApiClient(Object.assign({ baseURL: window.location.origin }, configuration));
    }
}

class OpenAI {
    constructor(config) {
        const openai = OpenAIApiClient.builder({
            baseURL: config.baseURL,
            headersInit: {
                Authorization: `Bearer ${config.apiKey}`,
                'OpenAI-Organization': config.apiOrg || '',
            },
        });
        return openai;
    }
}

export { OpenAI as default };
//# sourceMappingURL=request-open-ai.esm.js.map
