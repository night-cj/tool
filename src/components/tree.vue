<template>
  <el-tree
    :data="treeData"
    :props="defaultProps"
    node-key="id"
    :default-expand-all="true"
    highlight-current
    draggable
    accordion
    :indent="indent"
    ref="tree"
    @node-click="handleNodeClick"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drop="handleDrop"
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
  >
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <div class="top-tree-head">
        <span class="icon">
          <i
            class="el-icon-s-home"
            style="color: #409EFF"
            v-if="data.location"
          ></i>
          <i class="el-icon-printer" style="color: red" v-if="data.spaceId"></i>
        </span>
        <span class="lable">
          <span style="font-size: 16px;">{{ data[rename.name] }}</span>
          <span
            style="font-size: 14px; color: #67C23A"
            v-if="data[rename.value]"
          >
            <span> ( </span>
            <span style="color: red" v-if="data.spaceId">{{
              data[rename.value]
            }}</span>
            <span style="color: #409eff" v-else>{{ data[rename.value] }}</span>
            <span> ) </span>
          </span>
        </span>
        <span class="down_select" :class="hideHandle ? '' : 'hide'">
          <slot :data="data">
            <el-button-group v-show="!data.hide">
              <el-button
                size="mini"
                @click.stop="clickBtn('addDev', data)"
                v-if="
                  treeType === 'space' && data.parentId !== 0 && data.location
                "
              >
                添加设备</el-button
              >
              <el-button
                size="mini"
                @click.stop="clickBtn('add', data)"
                v-if="!data.spaceId"
              >
                {{ treeType === 'space' ? '添加子空间' : '添 加' }}</el-button
              >
              <el-button size="mini" @click.stop="clickBtn('edit', data)">
                编 辑</el-button
              >
              <el-button
                size="mini"
                @click.stop="clickBtn('remove', data)"
                :disabled="data.children.length !== 0"
              >
                删 除</el-button
              >
            </el-button-group>
          </slot>
        </span>
      </div>
    </span>
  </el-tree>
</template>

<script>
export default {
  props: {
    icons: {
      type: Array,
      default: () => {
        return []
      }
    },
    treeData: Array,
    expand: {
      type: Boolean,
      default: false
    },
    rename: {
      type: Object,
      default: () => {
        return {
          name: 'name',
          value: 'code'
        }
      }
    },
    hideHandle: {
      type: Boolean,
      default: false
    },
    indent: {
      type: Number,
      default: 42
    },
    treeType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      updatePank: {
        sourceId: 0,
        targetId: 0
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleNodeClick (data, node) {
      // this.breadcrumbData = data
    },
    handleDragStart (node, ev) {
      // 收起所有二级展节点
      this.$refs.tree.store._getAllNodes().map(ele => {
        if (ele.level === 1 || ele.level === 2) ele.expanded = true
        else ele.expanded = false
      })
      this.updatePank.sourceId = node.key
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      // 展开进入节点和父节点,收起其他节点
      this.$refs.tree.store._getAllNodes().map(ele => {
        if (dropNode.id === ele.id) {
          ele.expanded = true
          if (ele.parent) {
            this.expandParent(ele.parent)
          }
        }
        if (dropNode.level === ele.level && dropNode.id !== ele.id) ele.expanded = false
      })
    },
    async handleDrop (draggingNode, dropNode, dropType, ev) {
      let type = draggingNode.data.spaceId // 拖动设备
      if (dropType === 'none') {
        this.$message.warning('已在当前节点中!')
        return
      }
      // 第一级节点,可放置节点前后,其他只能放置节点中
      if (dropType === 'inner') this.updatePank.targetId = dropNode.key
      else this.updatePank.targetId = 0
      this.$emit('drag', this.updatePank, type)
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.spaceId) return false
      return type === 'inner' // 仅限插入节点中
    },
    allowDrag (draggingNode) {
      // 根节点不允许拖拽
      return draggingNode.id !== 1
    },
    expandParent (ele) {
      ele.expanded = true
      if (!ele.parent) return
      this.expandParent(ele.parent)
    },
    clickBtn (val, data) {
      this.$emit('clickBtn', { type: val, node: data })
    }
  },
  created () { },
  mounted () { }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.custom-tree-node {
  width: 100%;
  height: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  .top-tree-head {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    .icon {
      padding: 0 10px;
      i {
        font-size: 18px;
      }
    }
    .lable {
      font-size: 20px;
    }
  }
}
/deep/.el-tree-node__content {
  height: auto;
  .el-tree-node__expand-icon {
    color: #00ffff;
    font-weight: bold;
    font-size: 18px;

    &:before {
      content: '\E6E0';
    }

    &.is-leaf {
      color: transparent;
    }
  }
  .down_select {
    margin-left: auto;
    margin-right: 5%;
  }
}
.el-tree-node__content:hover
  > .custom-tree-node
  > .top-tree-head
  > .down_select {
  display: block;
}
.hide {
  display: none;
}
</style>
