const ipt = document.querySelector('#ipt');
const reply = document.querySelector('#reply');

const endpoint = 'https://api.coze.cn/open_api/v2/chat';

ipt.addEventListener('change',async e=>{
  const prompt = e.target.value;
  const payload = {
    bot_id : '7642325424776790066',
    name: '智能客服',
    user: 'mm',
    query: prompt,
    chat_history:[],
    stream:false,
    custom_variables:{
      prompt:'你是一个AI助手'
    }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer pat_BjMIhWTc6cz6yh1FsRGsxaOUO37mMpzYIPR0t3HNQCXzPhyM4756wgLzaEi9s1fu`
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json();
  console.log(data,'///////////');
  reply.innerHTML = data.messages[0].content;
})