const products = [
    { id: 1, name: "智能协作平台", category: "软件服务", price: 1299, desc: "企业协同办公与流程管理平台，支持移动端审批与消息通知。"},
    { id: 2, name: "营销自动化套件", category: "营销增长", price: 1999, desc: "集线索管理、营销活动触达、转化分析于一体。"},
    { id: 3, name: "数据可视化大屏", category: "数据分析", price: 1499, desc: "多维度经营数据实时展示，支持定制化看板。"},
    { id: 4, name: "人力资源管理系统", category: "软件服务", price: 2399, desc: "覆盖招聘、入职、绩效、薪酬等全流程。"},
    { id: 5, name: "智能客服机器人", category: "客户服务", price: 999, desc: "7x24 自动应答，降低人工客服压力。"},
    { id: 6, name: "供应链优化引擎", category: "数据分析", price: 2699, desc: "通过预测分析优化库存与配送策略。"},
    { id: 7, name: "品牌官网搭建服务", category: "营销增长", price: 799, desc: "快速构建高转化品牌官网，支持A/B测试。"},
    { id: 8, name: "售后工单系统", category: "客户服务", price: 1199, desc: "统一管理工单分配、进度追踪与满意度评价。"}
];

const newsList = [
    { id: 1, type: "公司动态", title: "智汇科技发布 2026 智能运营解决方案", date: "2026-03-20", summary: "全新方案聚焦降本增效，帮助中小企业完成数字化升级。"},
    { id: 2, type: "行业观察", title: "企业数字化转型的三大关键路径", date: "2026-03-13", summary: "从组织、流程、工具三方面梳理实施策略。"},
    { id: 3, type: "公司动态", title: "华东服务中心正式启用", date: "2026-02-23", summary: "区域服务能力进一步增强，覆盖 12 个城市。"},
    { id: 4, type: "客户案例", title: "某制造企业交付周期缩短 31%", date: "2026-02-02", summary: "通过流程改造和数据看板联动实现效率提升。"},
    { id: 5, type: "行业观察", title: "AI 在客服场景中的落地趋势", date: "2026-01-15", summary: "结合多模态与知识库，客服效率显著提升。"},
    { id: 6, type: "客户案例", title: "零售品牌会员复购率提升实践", date: "2026-01-05", summary: "围绕生命周期运营构建自动化营销链路。"}
];

function initCommon() {
    initMenu();
    setActiveNav();
    setFooterYear();
    updateCartUI();
}

function initMenu() {
    const btn = document.querySelector("#menuBtn");
    const links = document.querySelector("#navLinks");
    if (!btn || !links) return;
    btn.addEventListener("click", () => links.classList.toggle("show"));
}

function setActiveNav() {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((link) => {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        }
    });
}

function setFooterYear() {
    const y = document.querySelector("#year");
    if (y) y.textContent = String(new Date().getFullYear());
}

function getCartCount() {
    return Number(localStorage.getItem("corp_cart_count") || 0);
}

function updateCartUI() {
    const count = getCartCount();
    document.querySelectorAll(".js-cart-count").forEach((el) => {
        el.textContent = String(count);
    });
}

function addToCart(num = 1) {
    localStorage.setItem("corp_cart_count", String(getCartCount() + num));
    updateCartUI();
    alert("已加入购物车（本地模拟）");
}

function initSlider() {
    const slides = Array.from(document.querySelectorAll(".slide"));
    if (!slides.length) return;
    let idx = 0;
    const show = (i) => {
        idx = (i + slides.length) % slides.length;
        slides.forEach((s, index) => s.classList.toggle("active", index === idx));
    };
    document.querySelector("#prevSlide")?.addEventListener("click", () => show(idx - 1));
    document.querySelector("#nextSlide")?.addEventListener("click", () => show(idx + 1));
    setInterval(() => show(idx + 1), 4200);
}

function paginate(items, pageSize, page) {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
}

function renderPagination(root, total, pageSize, current, onClick) {
    if (!root) return;
    const pageCount = Math.ceil(total / pageSize);
    root.innerHTML = "";
    for (let i = 1; i <= pageCount; i += 1) {
        const btn = document.createElement("button");
        btn.textContent = String(i);
        if (i === current) btn.classList.add("active");
        btn.addEventListener("click", () => onClick(i));
        root.appendChild(btn);
    }
}

function initProductsPage() {
    const root = document.querySelector("#productGrid");
    if (!root) return;
    const select = document.querySelector("#categoryFilter");
    const search = document.querySelector("#productSearch");
    const pager = document.querySelector("#productPager");
    const pageSize = 6;
    let page = 1;

    function getFiltered() {
        const c = select?.value || "全部";
        const q = (search?.value || "").trim();
        return products.filter((item) => {
            const matchC = c === "全部" || item.category === c;
            const matchQ = !q || item.name.includes(q);
            return matchC && matchQ;
        });
    }

    function render() {
        const data = getFiltered();
        const list = paginate(data, pageSize, page);
        root.innerHTML = list.map((item) => `
            <article class="product-card">
                <div class="cover"></div>
                <div class="content">
                    <span class="tag">${item.category}</span>
                    <h3>${item.name}</h3>
                    <p class="muted">${item.desc}</p>
                    <p class="price">￥${item.price}</p>
                    <a class="btn btn-primary" href="product-detail.html?id=${item.id}">查看详情</a>
                </div>
            </article>
        `).join("");
        renderPagination(pager, data.length, pageSize, page, (p) => {
            page = p;
            render();
        });
    }

    select?.addEventListener("change", () => {
        page = 1;
        render();
    });
    search?.addEventListener("input", () => {
        page = 1;
        render();
    });
    render();
}

function initProductDetail() {
    const title = document.querySelector("#pdTitle");
    if (!title) return;
    const id = Number(new URLSearchParams(location.search).get("id") || 1);
    const data = products.find((p) => p.id === id) || products[0];
    let qty = 1;
    title.textContent = data.name;
    document.querySelector("#pdCategory").textContent = data.category;
    document.querySelector("#pdDesc").textContent = data.desc;
    document.querySelector("#pdPrice").textContent = `￥${data.price}`;
    const qtyEl = document.querySelector("#qtyNum");
    const sync = () => {
        qtyEl.textContent = String(qty);
    };
    document.querySelector("#qtyMinus")?.addEventListener("click", () => {
        qty = Math.max(1, qty - 1);
        sync();
    });
    document.querySelector("#qtyPlus")?.addEventListener("click", () => {
        qty += 1;
        sync();
    });
    document.querySelector("#addCartBtn")?.addEventListener("click", () => addToCart(qty));
    sync();
}

function initNewsPage() {
    const root = document.querySelector("#newsGrid");
    if (!root) return;
    const select = document.querySelector("#newsFilter");
    const render = () => {
        const v = select?.value || "全部";
        const list = newsList.filter((n) => v === "全部" || n.type === v);
        root.innerHTML = list.map((n) => `
            <article class="news-card">
                <div class="cover"></div>
                <div class="content">
                    <span class="tag">${n.type}</span>
                    <h3>${n.title}</h3>
                    <p class="muted">${n.summary}</p>
                    <p class="muted">${n.date}</p>
                    <a class="btn btn-primary" href="news-detail.html?id=${n.id}">阅读详情</a>
                </div>
            </article>
        `).join("");
    };
    select?.addEventListener("change", render);
    render();
}

function initNewsDetail() {
    const title = document.querySelector("#newsTitle");
    if (!title) return;
    const id = Number(new URLSearchParams(location.search).get("id") || 1);
    const n = newsList.find((x) => x.id === id) || newsList[0];
    title.textContent = n.title;
    document.querySelector("#newsMeta").textContent = `${n.type} | ${n.date}`;
    document.querySelector("#newsSummary").textContent = n.summary;
}

function validateForm(form, rules) {
    let ok = true;
    rules.forEach((rule) => {
        const input = form.querySelector(`[name='${rule.name}']`);
        const err = form.querySelector(`[data-err='${rule.name}']`);
        const value = (input?.value || "").trim();
        let msg = "";
        if (rule.required && !value) msg = "此项不能为空";
        if (!msg && rule.pattern && !rule.pattern.test(value)) msg = rule.message || "格式不正确";
        if (err) err.textContent = msg;
        if (msg) ok = false;
    });
    return ok;
}

function initContactForm() {
    const form = document.querySelector("#contactForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const ok = validateForm(form, [
            { name: "name", required: true },
            { name: "email", required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "请输入正确邮箱" },
            { name: "phone", required: true, pattern: /^1\d{10}$/, message: "请输入11位手机号" },
            { name: "message", required: true }
        ]);
        if (ok) {
            alert("留言提交成功！我们会在1个工作日内联系您。");
            form.reset();
            form.querySelectorAll(".error").forEach((x) => (x.textContent = ""));
        }
    });
}

function initCareerForm() {
    const form = document.querySelector("#careerForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const ok = validateForm(form, [
            { name: "fullname", required: true },
            { name: "position", required: true },
            { name: "email", required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "邮箱格式错误" }
        ]);
        if (ok) {
            alert("简历投递成功（前端模拟）");
            form.reset();
            form.querySelectorAll(".error").forEach((x) => (x.textContent = ""));
        }
    });
}

function initFaq() {
    document.querySelectorAll(".faq-item .faq-q").forEach((btn) => {
        btn.addEventListener("click", () => btn.closest(".faq-item")?.classList.toggle("open"));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initCommon();
    initSlider();
    initProductsPage();
    initProductDetail();
    initNewsPage();
    initNewsDetail();
    initContactForm();
    initCareerForm();
    initFaq();
});
