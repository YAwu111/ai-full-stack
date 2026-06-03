<script setup>
import { ref } from 'vue'
const count  = ref(0);
const props = defineProps({
    BtnName:{
        type:String,
        required:true
    }
})

const emit = defineEmits(['click']);
function AddSelf(){
    count.value++;
    emit('click');
}
</script>

<template>
    <button type="button" @click="AddSelf">Your {{props.BtnName}} count is: {{count}}</button>
</template>

<style scoped>
button{
    border-radius: 100%;
    border:1px solid white;
    width: 150px;
    height: 210px;
}
button:hover{
    background-color: lightblue;
    transition: all ease-in-out 0.5s;
}
</style>