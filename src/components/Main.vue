<template>
    <div class="Main">
        <Menu></Menu>
        <el-button type="info"  plain>创建房间</el-button>
    </div>
    
</template>
<script>
import Menu from './Menu.vue'
export default {
    name: 'Main',
    components: {
      Menu
    },
    data () {
        return {
            tabBarImgArr:[   //图片切换
                // {normal: require('./../../../static/img/icon_home.png'), selected: require('./../../../static/img/icon_home_selected.png')},
                // {normal: require('./../../../static/img/icon_intro.png'), selected: require('./../../../static/img/icon_intro_selected.png')},
                // {normal: require('./../../../static/img/icon_search.png'), selected: require('./../../../static/img/icon_search_selected.png')},
                // {normal: require('./../../../static/img/icon_chat.png'), selected: require('./../../../static/img/icon_chat_selected.png')},
                // {normal: require('./../../../static/img/icon_mine.png'), selected: require('./../../../static/img/icon_mine_selected.png')}
            ]
        }
    },
    methods:{
        // switchTo: function (path) {
        //     // console.log(this.$router)
        //     this.$router.replace(path)
        // }
    }
}
</script>
<style scoped>
    
</style>