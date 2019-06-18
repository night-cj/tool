<template>
  <div class="upload wh">
    <h4>上传文件</h4>
    <div class="upload-demo" v-if="fileSetList.length">
      <div class="m-b-20 flex flex-center align-center">
        <p class="f-size-16 m-b-10 m-r-20">请选择文件类型 :</p>
        <el-radio-group v-model="radio" class="radio">
          <el-radio
            :label="item.guid"
            v-for="item in fileSetList"
            :key="item.guid"
          >
            {{ item.subject }}
          </el-radio>
        </el-radio-group>
      </div>
      <hr />
      <div class="flex flex-evenly m-t-40">
        <file-upload
          :url="upUrl"
          :params="{ Guid: radio }"
          @upSuccess="
            getFiltes(fileSetList.find(item => item.guid === radio).id)
          "
        >
          <template v-slot:title>
            <span>将 </span>
            <em>{{ fileSetList.find(item => item.guid === radio).subject }}</em>
            <span> 相关文件拖到此处，或 </span>
            <b><em>点击上传</em></b>
          </template>
        </file-upload>
        <file-list :data.sync="fileList"></file-list>
      </div>
    </div>
  </div>
</template>

<script>
import { FileSetGetAll, FileSetGet } from '@/request/api.js'
import fileUpload from '@/components/upload'
import fileList from './fileList'

export default {
  components: { fileUpload, fileList },
  data () {
    return {
      radio: '',
      upUrl: '/api/FileSet/AddResource',
      fileSetList: [],
      fileList: {}
    }
  },
  computed: {
  },
  watch: {
    radio (val) {
      let id = this.fileSetList.find(item => item.guid === val).id
      this.getFiltes(id)
    }
  },
  methods: {
    async getFileSet () {
      let res = await FileSetGetAll()
      this.fileSetList = res.data
      this.radio = res.data[0].guid
    },
    async getFiltes (id) {
      let res = await FileSetGet({ id: id })
      this.fileList = res.data[0]
      this.fileList.resources.forEach(ele => {
        let name = ele.relativePath.split('_')
        this.$set(ele, 'name', name[0].slice(8))
      })
    },
  },
  created () {
    this.getFileSet()
  }
}
</script>

<style lang="scss" scoped>
</style>
