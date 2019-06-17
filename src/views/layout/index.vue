<template>
  <div class="home wh">
    <el-container class="wh">
      <el-aside width="240px" style="background-color: #314158">
        <h3 class="head-title">POMS 工具</h3>
        <side-bar></side-bar>
        <h5 class="logout pointer" @click="logout">
          <i class="el-icon-switch-button p-r-10"></i>
          <span>退 出</span>
        </h5>
      </el-aside>
      <el-container>
        <el-main style="background-color: #EDF0F5">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { localStorage } from '@/utils'
import sideBar from './sideBar'

export default {
  name: 'home',
  components: {
    sideBar
  },
  methods: {
    logout () {
      localStorage('Tool_Token', 'remove')
      localStorage('Tool_Project', 'remove')
      this.$router.push({ path: '/login' })
      location.reload()
    }
  }
}
</script>

<style lang="scss">
.el-aside {
  position: relative;
  .head-title {
    background-color: #2b2f3a;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
  }
  .logout {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    background-color: #2b2f3a;
    line-height: 40px;
    padding-left: 60px;
    color: #fff;
    border-bottom: 6px solid #000;
    i {
      color: red;
    }
  }
}
</style>
