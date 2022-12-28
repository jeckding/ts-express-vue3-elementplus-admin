<template>
	<div>
		{{sendMessage}}
	</div>
		 
</template>

<script lang="ts" >
	import { useStore } from "vuex"
	import {defineComponent, ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
	export default defineComponent({
	    setup(){
	      const { proxy  }: any = getCurrentInstance()
	      onMounted(() => {
	        proxy.$socket.on('connect',()=>{
	          console.log('socketio-connect')
	        })
	        proxy.$socket.on('message',(data) =>{
	          console.log(data)
	        });
	      });
	      onUnmounted(() => {
	        proxy.$socket.removeAllListeners('connect');
	        proxy.$socket.removeAllListeners('message');
	      });
	      let sendMessage = ()=>{
	          console.log('发送消息')
	          proxy.$socket.emit('message', {
	              msgContent: "你好！" + new Date()
	          });
	      }
	        return {
	          sendMessage
	        }
	    }
	})
	 
	
</script>

<style>
</style>