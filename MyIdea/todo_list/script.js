const btns = document.querySelectorAll('button');
btns.forEach(btn =>{
    btn.addEventListener('click',()=>{
        if(btn.id === 'add'){
            AddThing();
        }
        else{
            ClearThing();
        }
    });
})
function AddThing(){
        const val = document.querySelector('#content').value;
        if(!val) return;
        const newList = document.createElement('div');
        newList.className='list';
        newList.textContent=val;
        document.querySelector('.lists').appendChild(newList);

        const newBtn = document.createElement('button');
        newBtn.type='button';
        newBtn.textContent = '❌';
        newBtn.className='delete';
        newList.appendChild(newBtn);
        newBtn.addEventListener('click',e=>{
            newBtn.parentElement.remove();
        })
    }
function ClearThing(){
        document.querySelector('.lists').innerHTML ='';
    }