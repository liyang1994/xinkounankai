<template>
    <div class="Chat">
        <Menu></Menu>
        <h4>好友列表</h4>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item class="cls" title="chenjiali" name="1">
                <div>性别：女</div>
                <div>年龄：25</div>
            </el-collapse-item>
            <el-collapse-item title="zhangsan" name="2">
                <div>性别：男</div>
                <div>年龄：25</div>
            </el-collapse-item>
            <el-collapse-item title="lisi" name="3">
                <div>性别：男</div>
                <div>年龄：24</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import Menu from './Menu.vue'
export default {
    name: 'Chat',
    components: {
      Menu
    },
    data() {
        return {
            activeNames: ['0']
        }
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
}
</script>
<style scoped>
.cls {
   text-align: left;
}
</style>