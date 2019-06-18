<template>
  <el-dialog
    title="空间操作"
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
        label="空间名称："
        :label-width="formLabelWidth"
      >
        <div style="display: flex;">
          <el-input v-model="form.name" placeholder="请输入空间名称"></el-input>
          <div>
            例：<span style="font-weight: 700">
              {{ $attrs.oneLevel ? '地下一层' : '梅赛德斯奔驰' }}
            </span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="空间简称：" :label-width="formLabelWidth">
        <div style="display: flex;">
          <el-input
            v-model="form.businessCode"
            placeholder="请输入空间简称"
          ></el-input>
          <div>
            例：<span style="font-weight: 700">
              {{ $attrs.oneLevel ? 'B1F' : 'MB' }}
            </span>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        prop="code"
        label="空间编码："
        :label-width="formLabelWidth"
      >
        <div style="display: flex;">
          <el-input
            v-model="form.code"
            type="number"
            placeholder="请输入空间6位数字编码"
          ></el-input>
          <div>例：<span style="font-weight: 700">081647</span></div>
        </div>
      </el-form-item>
      <el-form-item label="空间描述信息：" :label-width="formLabelWidth">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="请输入空间描述信息"
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
import { SpaceAdd, SpaceUpdate } from '@/request/api.js'
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
      form: {
        parentId: 0,
        code: '',
        name: '',
        description: '',
        businessCode: '',
        order: 0
      },
      formLabelWidth: '120px',
      rules: {
        name: [
          { required: true, message: '请输入空间名称', trigger: 'blur' }
        ],
        code: [
          { message: '请输入空间编码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6位数', trigger: 'blur' }
        ],
        businessCode: [
          { required: true, message: '请输入有效内容', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z_]{1,}$/, message: '仅限字母、数字、下划线' }
        ]
      }
    }
  },
  computed: {},
  watch: {
    value (val) {
      this.dialogVisible = val
    },
    dialogVisible (val) {
      this.$emit('input', val)
    },
    handleData: {
      handler (newVal, oldVal) {
        if (typeof newVal === 'number') { // 添加
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
          if (isEdit) res = await SpaceUpdate(this.form)
          else res = await SpaceAdd(this.form)
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
