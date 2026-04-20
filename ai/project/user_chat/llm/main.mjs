import{OpenAI}from 'openai';
import dotenv from 'dotenv';
import http from 'http';
import url from 'url';
dotenv.config({
    path:'.env'
});
const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    baseURL:"https://api.agicto.cn/v1"
})

const getCompletion = async(prompt,model = 'gpt-3.5-turbo') => {
    const messages = [{
        role:"user",
        content:prompt
    }];
    const result = await client.chat.completions.create({
        model,
        messages,
        temperature:.1
    })
    return result.choices[0].message.content;
}
// const result = await getCompletion('你好');
// console.log(result);
http.createServer(async (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const parsedUrl=url.parse(req.url,true);
    // console.log(parsedUrl);
    const prompt = `
    ${parsedUrl.query.data}
    请根据上面的JSON数据，回答${parsedUrl.query.question}这个问题
    `;
    const result = await getCompletion(prompt);
    let info = {
        result
    };
    res.status = 200;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(info));
}).listen(1314);