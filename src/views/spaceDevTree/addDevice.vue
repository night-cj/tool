<template>
  <el-dialog
    title="设备操作"
    :visible.sync="dialogVisible"
    :before-close="close"
    @close="close"
  >
    <crumbs v-bind="$attrs"></crumbs>
    <el-form
      :model="form"
      :rules="rules"
      ref="addForm"
      style="width:80%; margin: 0 auto"
    >
      <el-form-item
        prop="name"
        label="设备名称："
        :label-width="formLabelWidth"
      >
        <div style="display: flex;">
          <el-input v-model="form.name" placeholder="请输入设备名称"></el-input>
          <div>例：<span style="font-weight: 700">2#空调</span></div>
        </div>
      </el-form-item>
      <el-form-item
        prop="code"
        label="设备编码："
        :label-width="formLabelWidth"
        :rules="[
          {
            required: handleData.code,
            message: '请输入设备编码',
            trigger: 'blur'
          },
          { min: 6, max: 6, message: '长度为6位数', trigger: 'blur' }
        ]"
      >
        <div style="display: flex;">
          <el-input
            v-model="form.code"
            type="number"
            placeholder="请输入设备6位数字编码"
          ></el-input>
          <div>例：<span style="font-weight: 700">192463</span></div>
        </div>
      </el-form-item>
      <el-form-item
        prop="mark"
        label="设备流水号："
        :label-width="formLabelWidth"
      >
        <div style="display: flex;">
          <el-input
            v-model="form.mark"
            type="number"
            placeholder="请输入设备流水号"
          ></el-input>
          <div>例：<span style="font-weight: 700">003</span></div>
        </div>
      </el-form-item>
      <el-form-item
        prop="deviceTypeId"
        label="设备类型："
        :label-width="formLabelWidth"
      >
        <el-cascader
          v-model="deviceTypeId"
          :options="devTypeList"
          :props="selects"
          placeholder="请选择设备类型"
          :show-all-levels="false"
          @change="changeSelect"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="系统类型：" :label-width="formLabelWidth">
        <el-cascader
          v-model="deviceSystemTypeId"
          :options="sysTypeList"
          :props="selects"
          placeholder="请选择系统类型"
          :show-all-levels="false"
          @change="changeSelect"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="设备描述信息：" :label-width="formLabelWidth">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="请输入设备描述信息"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addNode">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { DeviceTypeGet, DeviceSystemTypeGet, DeviceAdd, DeviceUpdate } from '@/request/api.js'
import crumbs from './crumbs'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    handleData: {
      type: [Object, Number],
      default: 0
    }
  },
  components: { crumbs },
  data () {
    return {
      dialogVisible: this.value,
      deviceTypeId: [],
      deviceSystemTypeId: [],
      form: {
        mark: '',
        code: '',
        name: '',
        description: '',
        spaceId: 0,
        deviceTypeId: '',
        deviceSystemTypeId: ''
      },
      formLabelWidth: '120px',
      devTypeList: [],
      sysTypeList: [],
      selects: { label: 'name', value: 'id', checkStrictly: true },
      rules: {
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        mark: [
          { required: true, message: '请输入设备流水号', trigger: 'blur' },
          { min: 1, max: 5, message: '长度为1 ~ 5位数', trigger: 'blur' }
        ],
        deviceTypeId: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  filters: {
    ruleFilter (val) {
      if (typeof val === 'object' && val.code) return 'editCode'
      else return 'code'
    }
  },
  watch: {
    value (val) {
      this.dialogVisible = val
      if (val) {
        this.getDevType()
        this.getSysType()
      }
    },
    dialogVisible (val) {
      this.$emit('input', val)
    },
    handleData: {
      handler (newVal, oldVal) {
        if (typeof newVal === 'number') { // 添加
          this.form.spaceId = newVal
        } else {
          if (!newVal.spaceId) return
          let targetObj = {}
          Object.keys(newVal).forEach(keys => { // 深拷贝
            if (newVal[keys] && typeof newVal[keys] === 'object') delete newVal[keys]
            else targetObj[keys] = newVal[keys]
          })
          this.form = targetObj
          this.deviceTypeId = this.getParent(newVal.deviceTypeId, this.devTypeList)
          this.deviceSystemTypeId = this.getParent(newVal.deviceSystemTypeId, this.sysTypeList)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    close (done) {
      this.$refs.addForm.resetFields()
      this.form = {
        mark: null,
        code: '',
        name: '',
        description: '',
        spaceId: 0,
        deviceTypeId: '',
        deviceSystemTypeId: ''
      }
      this.deviceTypeId = []
      this.deviceSystemTypeId = []
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
          if (isEdit) res = await DeviceUpdate(this.form)
          else res = await DeviceAdd(this.form)
          if (res.status !== 0) return
          this.$parent.getTreeData()
          this.dialogVisible = false
          this.close()
        } else {
          return false
        }
      })
    },
    async getDevType () {
      let res = await DeviceTypeGet({ includeDescendant: true })
      this.devTypeList = res.data.children
      this.fileterChildren(this.devTypeList)
    },
    async getSysType () {
      let res = await DeviceSystemTypeGet({ includeDescendant: true })
      this.sysTypeList = res.data.children
      this.fileterChildren(this.sysTypeList)
    },
    fileterChildren (data) {
      data.forEach(ele => {
        if (ele.children.length === 0) delete ele.children
        else this.fileterChildren(ele.children)
      })
    },
    // 获取父级
    getParent (id, tree) {
      let currentId = id
      let arr = []
      seekNode(tree)
      function seekNode (data) {
        data.forEach(ele => {
          if (ele.id === currentId) {
            arr.unshift(ele.id)
            currentId = ele.parentId
            seekNode(tree)
          } else {
            if (currentId === 0) return
            if (ele.children && ele.children.length !== 0) seekNode(ele.children)
          }
        })
      }
      return arr
    },
    changeSelect (val) {
      this.$set(this.form, 'deviceTypeId', this.deviceTypeId[this.deviceTypeId.length - 1])
      this.$set(this.form, 'deviceSystemTypeId', this.deviceSystemTypeId[this.deviceSystemTypeId.length - 1])
    }
  },
  created () {
    let token = localStorage.getItem('tree_token')
    if (token) {
      this.getDevType()
      this.getSysType()
    }
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
