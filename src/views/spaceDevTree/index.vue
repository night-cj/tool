<template>
  <div class="spaceDevTree wh">
    <div class="tip" v-if="treeType === 'space'">
      <div>
        <i class="el-icon-s-home" style="color: #409EFF"></i>
        <span>: 空间</span>
      </div>
      <div>
        <i class="el-icon-printer" style="color: red"></i>
        <span>: 设备</span>
      </div>
    </div>
    <add-space
      v-model="showAdd"
      :path="path"
      :oneLevel="treeData.length"
      :handleData="handleData"
      v-if="treeType === 'space'"
    ></add-space>
    <add-device-type
      v-model="showAdd"
      :path="path"
      :handleData="handleData"
      :treeType="treeType"
      v-else
    ></add-device-type>
    <add-device
      v-model="showAddDev"
      :path="path"
      :handleData="handleData"
    ></add-device>
    <div class="add-box">
      <div class="tree-content">
        <div class="heads">
          <div class="ps">
            <span style="color: red"> * </span>
            拖动节点可改变层级关系
          </div>
          <div>
            {{ treeTypeData.find(item => item.value === treeType).name }}
          </div>
        </div>
        <hr />
        <el-button
          :type="treeType === 'space' ? 'primary' : 'success'"
          plain
          round
          @click="
            showAdd = true
            handleData = 0
          "
          style="margin-bottom: 10px"
          v-if="!treeData.length || treeType !== 'space'"
        >
          {{ treeType | btnNameFilter }}
        </el-button>
        <tree
          :treeData.sync="treeData"
          :treeType="treeType"
          @clickBtn="clickBtn"
          @drag="drag"
        ></tree>
      </div>
    </div>
  </div>
</template>

<script>
import tree from '@/components/tree'
import addSpace from './addSpace'
import addDevice from './addDevice'
import addDeviceType from './addDeviceType'
import {
  SpaceDelete,
  DeviceTypeDelete,
  DeviceSystemTypeDelete,
  SpaceGet,
  DeviceTypeGet,
  DeviceSystemTypeGet,
  SpaceUpdateRank,
  DeviceTypeUpdateRank,
  DeviceSystemTypeUpdateRank,
  DeviceDelete,
  DeviceGetAll,
  DeviceUpdate
} from '@/request/api.js'

export default {
  components: {
    tree,
    addSpace,
    addDeviceType,
    addDevice
  },
  data () {
    return {
      showAdd: false,
      showAddDev: false,
      treeData: [],
      deviceList: [],
      handleData: {},
      path: '',
      space_dev: true,
      treeType: sessionStorage.getItem('Tool_Index'),
      treeTypeData: [
        {
          name: '空间(设备)结构',
          value: 'space',
          type: 'primary'
        },
        {
          name: '设 备 类 型',
          value: 'device',
          type: 'success'
        },
        {
          name: '系 统 类 型',
          value: 'system',
          type: 'info'
        }
      ]
    }
  },
  filters: {
    btnNameFilter (val) {
      let data = {
        space: '创 建 空 间',
        device: '添加设备类型',
        system: '添加系统类型'
      }
      return data[val]
    }
  },
  watch: {
    showAdd (val) {
      if (!val) this.handleData = {}
      else {
        if (!this.treeData.length) this.handleData = 0
      }
    },
    showAddDev (val) {
      if (!val) this.handleData = {}
    },
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.changSelect(to.params.id)
    }
  },
  methods: {
    async getTreeData () {
      let res
      this.treeData = []
      let params = { includeDescendant: true }
      if (this.treeType === 'space') res = await SpaceGet(params)
      else if (this.treeType === 'device') res = await DeviceTypeGet(params)
      else if (this.treeType === 'system') res = await DeviceSystemTypeGet(params)
      if (res.status !== 0) return
      if (this.treeType === 'space') {
        let info = await DeviceGetAll(params)
        if (info.status !== 0) return
        this.deviceList = info.data
        this.treeData.push(res.data)
        this.mergeTree(this.treeData)
      } else {
        let arr = [{
          name: this.treeType === 'device' ? '设备类型' : '系统类型',
          id: 0,
          hide: true,
          children: res.data.children
        }]
        this.treeData = arr
      }
    },
    mergeTree (data) {
      data.forEach(ele => {
        let find = this.deviceList.filter(item => item.spaceId === ele.id)
        if (find) {
          find.forEach(ele => {
            this.$set(ele, 'children', [])
          })
          ele.children.push(...find)
        }
        if (ele.children && ele.children.length !== 0) this.mergeTree(ele.children)
      })
    },
    async clickBtn (data) {
      let path
      if (data.node.location) path = data.node.location
      if (data.node.spaceLable) path = data.node.spaceLable + '.' + data.node.name
      if (path) this.path = path.split('.').join(' / ')
      switch (data.type) {
        case 'add':
          this.showAdd = true
          this.handleData = data.node.id
          break
        case 'addDev':
          this.showAddDev = true
          this.handleData = data.node.id
          break
        case 'edit':
          if (data.node.spaceId) this.showAddDev = true
          else this.showAdd = true
          this.handleData = data.node
          break
        case 'remove':
          let id = { id: data.node.id }
          let handle = {
            space: () => {
              if (data.node.spaceId) return DeviceDelete(id)
              else return SpaceDelete(id)
            },
            device: () => DeviceTypeDelete(id),
            system: () => DeviceSystemTypeDelete(id)
          }
          handle[this.treeType]().then(res => {
            if (res.status === 0) this.getTreeData()
          })
          break
        default:
          break
      }
    },
    drag (val, type) {
      let request = {
        space: () => {
          if (type) DeviceUpdate({ id: val.sourceId, spaceId: val.targetId })
          else SpaceUpdateRank(val)
        },
        device: () => DeviceTypeUpdateRank(val),
        system: () => DeviceSystemTypeUpdateRank(val)
      }
      request[this.treeType]()
    },
    changSelect (val) {
      this.treeType = val
      this.getTreeData()
    }
  },
  created () {
    this.getTreeData()
  }
}
</script>

<style lang="scss">
.spaceDevTree {
  position: relative;
}
.form {
  width: 50%;
  margin: 0 auto;
}
.add-box {
  width: 100%;
  height: 100%;
  text-align: center;
  .add {
    padding: 10%;
  }
}

.tree-content {
  width: 70%;
  height: 100%;
  margin: 0 auto;
  padding-top: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 16px;
  .heads {
    display: flex;
    justify-content: center;
    .ps {
      position: absolute;
      left: 16%;
      color: #aaa;
      font-size: 14px;
    }
    .el-select {
      position: absolute;
      right: 18%;
    }
  }
}
.tip {
  position: absolute;
  right: 0;
  top: 0;
  color: #999;
  padding: 6px;
  background-color: #fff;
  font-size: 14px;
}
.btn {
  position: absolute;
  right: 0;
  top: 0;
}
.el-input {
  width: 70%;
  margin-right: 20px;
}
</style>
