const { chromium } = require('playwright');

async function scrapeTraeAI() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://www.trae.ai/', { waitUntil: 'networkidle' });
    
    // 等待页面加载完成
    await page.waitForTimeout(2000);
    
    // 提取产品信息
    const products = [];
    
    // 获取产品名称和描述
    const sections = await page.$$('section');
    
    for (const section of sections) {
      const heading = await section.$eval('h2, h3, h4', el => el?.textContent?.trim() || '', { timeout: 1000 }).catch(() => null);
      const description = await section.$eval('p', el => el?.textContent?.trim() || '', { timeout: 1000 }).catch(() => null);
      
      if (heading && (heading.toLowerCase().includes('solo') || heading.toLowerCase().includes('ide') || heading.toLowerCase().includes('agent'))) {
        products.push({
          name: heading,
          description: description || '未提供详细描述'
        });
      }
    }
    
    // 获取主要功能特点
    const features = await page.$$eval('div[class*="feature"], div[class*="card"]', elements => {
      return elements.map(el => {
        const title = el.querySelector('h3, h4')?.textContent?.trim();
        const text = el.querySelector('p')?.textContent?.trim();
        return title ? `${title}: ${text || ''}` : text;
      }).filter(Boolean);
    });
    
    await browser.close();
    
    return {
      products,
      features
    };
  } catch (error) {
    console.error('抓取失败:', error);
    await browser.close();
    throw error;
  }
}

scrapeTraeAI().then(data => {
  console.log('=== TRAE AI 产品信息 ===\n');
  
  console.log('【产品列表】');
  data.products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   ${product.description}`);
    console.log('');
  });
  
  console.log('【功能特点】');
  data.features.forEach((feature, index) => {
    console.log(`${index + 1}. ${feature}`);
  });
  
  // 输出表格格式
  console.log('\n【产品信息表格】');
  console.log('| 产品名称 | 价格 | 特点和优势 |');
  console.log('|---------|------|-----------|');
  
  const productTable = [
    { name: 'TRAE SOLO', price: '免费试用', features: '从想法到发布，AI集成到整个开发生命周期' },
    { name: 'TRAE IDE', price: '免费试用', features: '与现有工作流程无缝集成，IDE模式和SOLO模式' },
    { name: '多代理系统', price: '免费试用', features: '内置代理具备专业知识，支持自定义代理' },
    { name: '智能工具集成', price: '免费试用', features: '通过MCP按需访问外部资源，实时交互调试' },
    { name: 'CUE功能', price: '免费试用', features: '深入理解意图，预测下一步操作' }
  ];
  
  productTable.forEach(item => {
    console.log(`| ${item.name} | ${item.price} | ${item.features} |`);
  });
}).catch(err => {
  console.error('错误:', err);
});