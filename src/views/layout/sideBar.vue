<template>
  <div class="menu">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#314158"
      text-color="#bfcbd9"
      unique-opened
      router
      active-text-color="#409eff"
    >
      <el-submenu :index="item.value" v-for="item in menu" :key="item.value">
        <template slot="title">
          <i class="el-icon-location"></i>
          {{ item.name }}
        </template>
        <el-menu-item-group>
          <template slot="title">
            功能
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
            <el-menu-item v-else :key="subItem.value">
              <i class="el-icon-s-operation"></i>
              {{ subItem.name }}
            </el-menu-item>
          </div>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      menu: [ // value: 路由的path
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
                  value: 'spaceDevTree'
                },
                {
                  name: '设备类型',
                  value: 'deviceTypeTree'
                },
                {
                  name: '系统类型',
                  value: 'systemTypeTree'
                }
              ]
            },
            {
              name: '手机App工具',
              value: 'mobile'
            }
          ]
        }
        // {
        //   name: '十六铺',
        //   value: '16Pu',
        //   children: [
        //     {
        //       name: '空间(设备)结构树2',
        //       value: 'spaceDevTree'
        //     }
        //   ]
        // }
      ]
    }
  },
  computed: {
    develop () {
      let project = this.$store.state.project
      let val = this.menu.find(item => item.value === project).children[0].value
      return val
    }
  },
  watch: {},
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    filterChildren (data) {
      if (data.children && data.children.length !== 0) return true
      else return false
    }
  },
  created () {
    // this.$router.push({ path: `/${this.develop}` })
  },
  mounted () { }
}
</script>

<style lang="less" scoped></style>
