# vue 3 流式输出 demo

## 初始化项目
- npm init vite
  vite是最近最优秀的前端脚手架
  做项目前先要个基建
  init 初始化
- 选择
  - Vue 3 
  - javascript 
- 生成项目模版
  src/ 开发目录 主要的代码会在这 

- vue 基础语法
  .vue 后缀文件 
  App.vue 根组件
  三明治
  script
  template
  css 

- 响应式数据
  变量 -> 数据 -> 响应式数据对象  ref 
  聚焦于业务 ，不用去写DOM API了
  js 早期的命令式编程 机械 
  - 监听事件
  - 变量的值加一
  - 获得dom节点
  - 修改dom节点的内容
  vue focus 于业务， ref响应式的理念
  - 模版需要消费响应式数据 {{count}} 
  - vue let count =  ref(0)
    count.value = 100;
  - 模版会自动更新

- data: {"id":"07915f9d-d7b9-4a36-8c86-9f371e2eeb22","object":"chat.completion.chunk","created":1765007358,"model":"deepseek-chat","system_fingerprint":"fp_eaab8d114b_prod0820_fp8_kvcache","choices":[{"index":0,"delta":{"content":""},"logprobs":null,"finish_reason":"stop"}],"usage":{"prompt_tokens":18,"completion_tokens":2100,"total_tokens":2118,"prompt_tokens_details":{"cached_tokens":0},"prompt_cache_hit_tokens":0,"prompt_cache_miss_tokens":18}}


data: {"id":"07915f9d-d7b9-4a36-8c86-9f371e2eeb22","object":"chat.completion.chunk","created":1765007358,"model":"deepseek-chat","system_fingerprint":"fp_eaab8d114b_prod0820_fp8_kvcache","choices":[{"index":0,"delta":{"content":"存在"},"logprobs":null,"finish_reason":null}]}
