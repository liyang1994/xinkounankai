<template>
    <div class="Menu">
        <div class="bottom-tab">
            <div class="tab-item" @click="switchTo('/main')">
                    <i class="el-icon-box"></i>
                    <span :class="{on: '/main' === $route.path}">首页</span>
                </div>
            <div class="tab-item" @click="switchTo('/search')">
                <i class="el-icon-search"></i>
                    <span :class="{on: '/search' === $route.path}">搜索</span>
                </div>
            <div class="tab-item" @click="switchTo('/chat')">
                    <i class="el-icon-chat-round"></i>
                    <span :class="{on: '/chat' === $route.path}">聊天</span>
                </div>
            <div class="tab-item" @click="switchTo('/setting')">
                    <i class="el-icon-setting"></i>
                    <span :class="{on: '/setting' === $route.path}">我的</span>
                </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Menu',
    data () {
        return {

        }
    },
    methods: {
        switchTo: function (path) {
            // console.log(this.$router)
            this.$router.replace(path)
        }
    }
}
</script>
<style scoped>
.bottom-tab {
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: fixed;
    left: 0px;
    bottom: 0px;
    display: flex;
    z-index: 999;
}
.bottom-tab .tab-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
}  
.bottom-tab .tab-item img{
    width: 35%;
    margin-bottom: 2px;
} 
.bottom-tab .tab-item .on{
   color: red;
} 
</style>