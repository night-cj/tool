<template>
  <div class="home wh">
    <el-container class="wh">
      <el-aside width="200px">
        <side-bar></side-bar>
      </el-aside>

      <el-container>
        <el-header
          style="text-align: right; font-size: 12px; background-color: #eee;"
        >
          <span>王小虎</span>
        </el-header>

        <el-main>
          <div>111</div>
          <div>111</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import sideBar from './sideBar'

export default {
  name: 'home',
  components: {
    sideBar
  }
}
</script>
