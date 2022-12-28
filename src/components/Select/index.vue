<template>
  <el-select
    :v-model="value"
    v-bind="$attrs"
    :value-key="valueKey ? valueKey : ''"
    :filterable="!!searchKey || filterable"
    :remote="!!searchKey"
    :clearable="clearable"
    :multiple="multiple"
    collapse-tags
    reserve-keyword
    :loading="loading"
    :popper-append-to-body="popperAppendToBody"
    :remote-method="remoteMethod"
    @change="changeEvent"
  >
    <el-option
      v-for="option in optionList"
      :key="option[props.key]"
      :label="option[props.value]"
      :value="valueKey ? option : option[props.key] || ''"
    />
  </el-select>
</template>

<script lang="ts">
/**
 * @Description: 下拉组件
 */
import { defineComponent, reactive, PropType, toRefs } from 'vue'
import { getItemAutocomplete } from '@/api/common'
interface Options {
  key: number | string
  value: string
}
export default defineComponent({
  name: 'GSelect',
  props: {
    // 是否插入body
    popperAppendToBody: {
      type: Boolean,
      default: false
    },
    // 如果设置了该属性，执行请求下拉数据（不是autocomplete）
    reload: {
      type: String,
      default: ''
    },
    // 如果设置了该属性，绑定值为对象
    valueKey: {
      type: String,
      default: ''
    },
    // 搜索内容的key，如果设置了该属性，会启用远程搜索
    searchKey: {
      type: String,
      default: ''
    },
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: true
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: true
    },
    // 是否可多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 下拉数据
    options: {
      type: Array as PropType<Options[]>,
      default: () => []
    },
    // 绑定值
    value: {
      type: [String, Number, Object],
      default: ''
    },
    // 默认id，name，如果是key value，传入props="{key: 'key', value: 'value'}"
    props: {
      type: Object,
      default: () => {
        return {
          key: 'id',
          value: 'name'
        }
      }
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    // // 请求下拉数据
    // function reloadOptions() {}

    // if (props.reload) {
    //   reloadOptions()
    // }

    const select = reactive({
      loading: false,
      optionList: props.options
    })
    // 远程搜索
    const remoteMethod = (query: string) => {
      if (query.trim() !== '') {
        select.loading = true
        getItemAutocomplete(props.searchKey, { keyword: query }).then((res: any) => {
          select.loading = false
          select.optionList = res.options
        })
      } else {
        select.optionList = []
      }
    }
    // 选中值改变
    const changeEvent = (val: any) => {
      emit('update:value', val)
    }

    return {
      ...toRefs(select),
      changeEvent,
      remoteMethod
    }
  }
})
</script>
