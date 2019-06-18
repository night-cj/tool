<template>
  <el-upload
    drag
    multiple
    :headers="uploadHeader"
    :action="uploadUrl"
    :data="params"
    list-type="picture"
    :on-success="handleUpSuccess"
    :on-error="handleUpError"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      <slot name="title">
        将文件拖到此处，或<em><b> 点击上传</b></em>
      </slot>
    </div>
    <div class="el-upload__tip" slot="tip">
      <slot name="tip"> </slot>
    </div>
  </el-upload>
</template>

<script>
// import {  } from '@/request/api.js'
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: {
    uploadHeader () {
      return { Authorization: this.$store.state.token }
    },
    uploadUrl () {
      let url = {
        inport: ''
      }
      return process.env.VUE_APP_BASE_API + this.url
    }
  },
  watch: {},
  methods: {
    handleUpSuccess (res, file, fileList) {
      if (res.status !== 0) this.$message.error('上传失败: ' + res.msg)
      else {
        this.$emit('upSuccess')
        this.$message.success('上传成功!')
      }
    },
    handleUpError (err, file, fileList) {
      this.$message.error('上传失败: ' + file.name)
    }
  },
  created () {

  },
  mounted () { }
}
</script>

<style lang="scss" scoped></style>
