<template>
  <el-dialog
    :title="`${lable}类型操作`"
    :visible.sync="dialogVisible"
    :before-close="close"
    @close="close"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="addForm"
      style="width:80%; margin: 0 auto"
    >
      <el-form-item
        prop="name"
        :label="`${lable}类型名称：`"
        :label-width="formLabelWidth"
      >
        <div style="display: flex;">
          <el-input
            v-model="form.name"
            :placeholder="`请选择${lable}类型名称`"
          ></el-input>
          <div>
            例：<span style="font-weight: 700">{{
              treeType === 'device' ? '排风机' : '消防系统'
            }}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        prop="identifier"
        :label="`${lable}类型简称：`"
        :label-width="formLabelWidth"
      >
        <div style="display: flex;">
          <el-input
            v-model="form.identifier"
            :placeholder="`请输入${lable}类型简称`"
          ></el-input>
          <div>
            例：<span style="font-weight: 700">{{
              treeType === 'device' ? 'PFJ' : 'XFXT'
            }}</span>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addNode">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { DeviceTypeAdd, DeviceTypeUpdate, DeviceSystemTypeAdd, DeviceSystemTypeUpdate } from '@/request/api.js'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    handleData: {
      type: [Object, Number],
      default: 0
    },
    treeType: {
      type: String,
      default: ''
    }
  },
  components: {},
  data () {
    return {
      lable: '',
      dialogVisible: this.value,
      form: {
        parentId: 0,
        name: '',
        identifier: ''
      },
      formLabelWidth: '140px',
      rules: {
        name: [
          { required: true, message: '请输入空间名称', trigger: 'blur' }
        ],
        identifier: [
          { required: true, message: '请输入有效内容', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z_]{1,}$/, message: '仅限字母、数字、下划线' }
        ]
      }
    }
  },
  computed: {},
  filters: {
    treeTypeFilter (val) {
      let data = {
        device: '设备',
        system: '系统'
      }
      return data[val]
    }
  },
  watch: {
    value (val) {
      this.dialogVisible = val
      if (!val) return
      this.lable = this.$options.filters.treeTypeFilter(this.treeType)
    },
    dialogVisible (val) {
      this.$emit('input', val)
    },
    handleData: {
      handler (newVal, oldVal) {
        if (typeof newVal === 'number') { // 添加子节点
          this.form.parentId = newVal
        } else {
          let targetObj = {}
          Object.keys(newVal).forEach(keys => { // 深拷贝
            if (newVal[keys] && typeof newVal[keys] === 'object') {
              delete newVal[keys]
              delete newVal.parentId
            } else {
              targetObj[keys] = newVal[keys]
            }
          })
          this.form = targetObj
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    close (done) {
      this.$refs.addForm.resetFields()
      if (done) done()
    },
    addNode () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          let isEdit = typeof this.handleData === 'object'
          for (var key in this.form) {
            if (this.form[key] === this.handleData[key] && key !== 'id') delete this.form[key]
          }
          let res
          if (isEdit) {
            if (this.treeType === 'device') res = await DeviceTypeUpdate(this.form)
            else res = await DeviceSystemTypeUpdate(this.form)
          } else {
            if (this.treeType === 'device') res = await DeviceTypeAdd(this.form)
            else res = await DeviceSystemTypeAdd(this.form)
          }
          if (res.status !== 0) return
          this.$parent.getTreeData()
          this.dialogVisible = false
          this.close()
        } else {
          return false
        }
      })
    }
  },
  created () {

  },
  mounted () { }
}
</script>

<style lang="scss" scoped>
.Numcode {
  font-weight: bold;
  color: #444;
}
.el-input {
  width: 70%;
  margin-right: 20px;
}
</style>
