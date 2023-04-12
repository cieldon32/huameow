## How to use
```
import OpenAI from '@huameow/request-openAI';
function App() {
  const openai = new OpenAI({
    baseURL: 'https://xxx',
    apiKey: 'sk-xxx',
    apiOrg: 'org-xxx',
  });
  const onSend = async () => {
    const res = await openai.createChatCompletion(
      {"model":"gpt-3.5-turbo","temperature":0.7,"max_tokens":2048,"top_p":1,"frequency_penalty":0,"presence_penalty":0,"messages":[{"role":"user","content":"aaaa"}]},
    );
    console.log('openai', res)
  }
  return (
    <div>
      <button onClick={onSend}>发送</button>
    </div>
  )
}
```
