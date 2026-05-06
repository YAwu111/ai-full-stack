const ImgUrl = ['record1.svg','record2.svg','record3.svg','record4.svg']

const backtoheadpage = document.getElementById('backtoheadpage');

const panel = document.getElementsByClassName('layer2')[0];

backtoheadpage.addEventListener('click',()=>{
    panel.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let isOpen = false;
let isAnimating = false;

window.addEventListener('wheel', (e) => {
    if (isAnimating) return;
    if (e.deltaY > 0 && !isOpen) {
        panel.classList.add('active');
        isOpen = true;
        lock();
    } else if (e.deltaY < 0 && isOpen) {
        const atTop = panel.scrollTop <= 0;
        if (!atTop) return; // 还在layer2内部向上浏览，不收起
        panel.classList.remove('active');
        isOpen = false;
        lock();
    }
});

const MoreGet = document.getElementById('MoreGet');
MoreGet.addEventListener('click',()=>{
    if(isAnimating) return;
    panel.classList.add('active');
    isOpen = true;
    lock();
});

function openPanel() {
    if (isAnimating) return;
    panel.classList.add('active');
    isOpen = true;
    lock();
}

function closePanel() {
    if (isAnimating) return;
    panel.classList.remove('active');
    isOpen = false;
    lock();
}

const mainSectionIds = new Set(['section-culture', 'section-about', 'section-contact']);

document.querySelectorAll('.site-nav a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').slice(1);
        if (!id) return;
        if (id === 'title') {
            e.preventDefault();
            closePanel();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (mainSectionIds.has(id)) {
            e.preventDefault();
            openPanel();
            const go = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(go, 520);
        }
    });
});

function lock() {
    isAnimating = true;
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

let state = 'idle';
let lastIndex = 0;

const crop = document.querySelector('.CropLayer');

crop.addEventListener('click',e=>{
    if(state === 'droping' || state === 'installing') return;
    crop.classList.add('active');
    AnimatingLock();
})

const AnimatingLock = ()=>{
    state = 'droping';
    crop.addEventListener('animationend',function handleAnimationEnd(){
        state = 'installing';
        crop.classList.remove('active');
        let newIndex = Math.floor(Math.random()*4);
        while(newIndex === lastIndex) newIndex = Math.floor(Math.random()*4);
        lastIndex = newIndex;
        document.querySelector('#RecordImg').src = ImgUrl[lastIndex];
        crop.classList.add('install');
        crop.addEventListener('animationend', function installEnd() {
            crop.classList.remove('install');
            state = 'idle';
            crop.removeEventListener('animationend', installEnd);
        }, { once: true });
        crop.removeEventListener('animationend', handleAnimationEnd);
    })
}