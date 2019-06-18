<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>{{ data.subject + '文件列表' }}</span>
    </div>
    <el-table
      :data="data.resources"
      style="width: 100%"
      @selection-change="selectRow"
    >
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="name" label="文件名"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" plain size="mini" @click="downFile(row)"
            >下 载</el-button
          >
          <el-button type="warning" plain size="mini" @click="deleteFile(row)"
            >删 除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="primary"
      size="medium"
      @click="deleteFile(0)"
      class="m-t-10 m-l-20"
      v-if="selectArr.length !== 0"
      >删除选中</el-button
    >
  </el-card>
</template>

<script>
import { FileSetDeleteResource } from '@/request/api.js'
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  data () {
    return {
      selectArr: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    downFile (data) {

    },
    async deleteFile (data) {
      console.log(data)
      let params
      params = {
        entity: this.data.id,
        value: data ? [data.id] : this.selectArr
      }
      let res = await FileSetDeleteResource(params)
      if (res.status !== 0) return
      this.$parent.getFiltes(this.data.id)
    },
    selectRow (data) {
      this.selectArr = data.map(item => item.id)
    }
  },
  created () {

  },
  mounted () { }
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 30%;
}
</style>
