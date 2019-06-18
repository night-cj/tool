<template>
  <div class="menu">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#314158"
      text-color="#bfcbd9"
      unique-opened
      router
      active-text-color="#409eff"
      :default-active="$route.path"
      @select="selectMenu"
    >
      <el-submenu :index="item.value" v-for="item in menu" :key="item.value">
        <template slot="title">
          <i class="el-icon-location"></i>
          {{ item.name }}
        </template>
        <div v-for="subItem in item.children" :key="subItem.value">
          <el-submenu :index="subItem.value" v-if="filterChildren(subItem)">
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              {{ subItem.name }}
            </template>
            <el-menu-item
              :index="val.value"
              v-for="val in subItem.children"
              :key="val.value"
              >{{ val.name }}</el-menu-item
            >
          </el-submenu>
          <el-menu-item v-else :index="subItem.value">
            <i class="el-icon-s-operation"></i>
            {{ subItem.name }}
          </el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      menu: [
        {
          name: '梅赛德斯-奔驰',
          value: 'MB',
          children: [
            {
              name: '空间(设备)结构树',
              value: 'spaceDev',
              children: [
                {
                  name: '空间(设备)',
                  value: '/spaceDevTree/space'
                },
                {
                  name: '设备类型',
                  value: '/spaceDevTree/device'
                },
                {
                  name: '系统类型',
                  value: '/spaceDevTree/system'
                }
              ]
            },
            {
              name: '上传文件',
              value: '/upload'
            },
            {
              name: '手机App工具',
              value: '/mobile'
            }
          ]
        }
      ]
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    filterChildren (data) {
      if (data.children && data.children.length !== 0) return true
      else return false
    },
    selectMenu (index) {
      let idxArr = index.slice(1).split('/')
      if (idxArr[0] === 'spaceDevTree') sessionStorage.setItem('Tool_Index', idxArr[1])
    }
  },
  created () {
  },
  mounted () { }
}
</script>

<style lang="less" scoped></style>
