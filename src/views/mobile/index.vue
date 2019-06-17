<template>
  <div class="mobile wh">
    <h4>手机app工具</h4>
    <div class="down m-0-a flex flex-center flex-column p-t-40">
      <p class="txt-center m-b-20">扫码下载app工具</p>
      <a href="http://47.110.58.220/mb/tool/app-release.apk" target="_blank">
        <img src="../../assets/images/qr.png" alt="" class="qr" />
        <el-button type="primary" class="m-t-40">
          点击下载app工具
        </el-button>
      </a>
    </div>
  </div>
</template>

<script>
// import {  } from '@/api'
export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {

  },
  mounted () { }
}
</script>

<style lang="scss" scoped>
.down {
  width: 300px;
  .qr {
    width: 300px;
    height: 300px;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 119, 255, 0.1);
  }
  .el-button {
    width: 100%;
  }
}
</style>
