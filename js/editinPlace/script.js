/**
 * @func EditInPlace 就地编辑
 * @param {string} value 初始值
 * @param {element} parentElement 挂载点
 * @param {string} id 自身ID
 */

function EditInPlace(id,value,parentElement){
    this.id = id;
    this.value = value || '这个家伙很懒，什么都没有留下';
    this.parentElement = parentElement;
    this.containerElement = null;
    this.staticElement = null;
    this.fieldElement = null;
    this.confirmButton = null;
    this.cancelButton = null;
    this.createElement();
    this.attachEvent();
}

EditInPlace.prototype = {
    attachEvent:function(){
        this.staticElement.addEventListener('click',()=>{
            this.convertToField();
        });
        this.confirmButton.addEventListener('click',()=>{
            this.save();
        });
        this.cancelButton.addEventListener('click',()=>{
            this.cancel();
        })
    },
    save:function(){
        this.staticElement.innerHTML = this.fieldElement.value;
        this.value = this.fieldElement.value;
        this.convertToText();
    },
    cancel:function(){
        this.convertToText();
    },
    createElement:function(){
        this.containerElement = document.createElement('div');
        // console.log(this.containerElement,Object.prototype.toString.call(this.containerElement));
        this.containerElement.id = this.id;
        this.parentElement.appendChild(this.containerElement);
        // 值
        this.staticElement = document.createElement('span');
        this.staticElement.innerHTML = this.value;
        this.containerElement.appendChild(this.staticElement)

        // 输入框
        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
        this.fieldElement.value = this.value;
        this.containerElement.appendChild(this.fieldElement);

        // 确定按钮
        this.confirmButton = document.createElement('button');
        this.confirmButton.type = 'button';
        this.confirmButton.innerHTML = '确定';
        this.containerElement.appendChild(this.confirmButton);

        // 取消按钮
        this.cancelButton = document.createElement('button');
        this.cancelButton.type = 'button';
        this.cancelButton.innerHTML = '取消';
        this.containerElement.appendChild(this.cancelButton);

        this.convertToText();
    },
    convertToText:function(){
        this.fieldElement.style.display = 'none';
        this.confirmButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.staticElement.style.display = 'inline';
    },
    convertToField:function(){
        this.staticElement.style.display = 'none';
        this.confirmButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';
        this.fieldElement.style.display = 'inline';

        this.fieldElement.value = this.value;
    }
}