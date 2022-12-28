<template>
	<div> {{ data }}</div>
	<div> {{ copyData }} </div>
	<div> {{ formData.code }}</div>
	<div>{{ cartNum }}</div>
	<el-button @click="handleAdd">add</el-button>
	<el-button @click="handleRoute">route</el-button>
	<el-button @click="handleGetData">get action</el-button>
</template>

<script lang="ts">
	import { useStore } from "vuex"
	import { defineComponent, ref, Ref, watch, reactive, toRefs, emit, props,computed, onMounted} from 'vue'
	import router from '@/router'
	import store from '@/store'
	export default defineComponent({
		props: {
			name: {
				default: "",
				type: String,
			}
		},
		setup(props, content) {
			
			const {store, getters, commit , dispatch} = useStore()
			console.log(useStore())
			
			let data  = ref(1)
			let copyData = ref(1)
			let form = reactive({
				formData : {
					code: 1,
					name: ""
				}
			})
			watch(data, (V, O) => {
				console.log(V, O)
				copyData.value = V
			})
			let handleAdd = () => {
				content.emit('close', 1)
				commit("addCart", data.value++)
			}
			
			const handleRoute = () => {
				router.push('/home')
			}
			const cartNum = ref(1)
			
			const handleGetData = () => {
				dispatch('getCart', 'data')
			}
			
			// 测试生命周期
			onMounted(()=>{
				console.log('App onMounted');
				dispatch('getCart', 'data')
			}); 
			
			return {
				data,
				handleAdd,
				copyData,
				...toRefs(form),
				handleRoute,
				cartNum: computed(() => getters["cartNum"]),
				handleGetData,
			} 
		}
	})
	
</script>

<style>
</style>