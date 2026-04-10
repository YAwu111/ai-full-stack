import { OpenAI } from "openai";
import dotenv from 'dotenv';
dotenv.config();
const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    baseURL:"https://api.302.ai/v1"
});
const response = await client.chat.completions.create({
    model:'gpt-3.5-turbo',
    max_tokens:256,
    messages: [
        {
            role: 'user',
            content: `
            你现在是一个偏向爱情主义的歌手,现在你的好友胡楚瑜在北方的
            旅途之中偶遇了以为心爱之人,他叫小五,请你现在生成符合你的风格的
            歌曲。
            `
        }
    ]
});
const result = response.choices[0].message.content;
console.log('歌词是:'+result);