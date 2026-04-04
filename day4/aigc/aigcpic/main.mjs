// 模块化导入
import{OpenAI} from "openai";
// 导入包的一部分,优化
// es6 解构
import {config} from "dotenv";
config({
    path:'.env'
});
// 进程启动了
// console.log(process.env);

const client = new OpenAI({
        // openai sdk 是AIGC 事实标准
        // 默认发送请求到openai 服务器
        // 可以通过baseURL 自定义服务器地址 LLM 服务代理商或其他模型
    apiKey:process.env.OPENAI_API_KEY,
    baseURL:'https://api.agicto.cn/v1'
});
// 箭头函数
// async 耗时性任务 异步任务
const main = async () =>{
    const response = await client.images.generate({
            model:"dall-e-3" , // 第三代达芬奇模型
            prompt:`
            A spaceship flying through the university
            ` ,// 给LLM下达的指令 **提示词**
            n:1,
            size:'1024x1024'
    });
    console.log(response.data[0].url);
}

main()