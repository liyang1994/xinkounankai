<template>
    <div class="InGame">
        <el-page-header class="header" @back="goBack" content="InGame">
        </el-page-header>
        <!-- <Menu></Menu> -->
        
        <el-row style="padding: 10px;">
            <el-col :span="24"><div class="grid-content bg-purple-dark"><b>房间号:{{roomid}}</b></div></el-col>
        </el-row>
        <div class="main">
            <el-row v-for="(item,index) in list">
                <el-col :span="4" style="text-align: right;">
                    <div class="grid-content bg-purple">
                        <!-- <b>{{index+1}}.</b> -->
                        
                        <el-avatar icon="el-icon-user-solid"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="12" style="text-align: left;font-size: 22px;padding: 6px;">
                    <div class="grid-content bg-purple-light">
                        {{item.username}}
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import Menu from './Menu.vue'
export default {
    name: 'InGame',
    data () {
        return {
            roomid: this.$route.params.id,
            list: []
        }
    },
    components: {
      Menu
    },
    methods: {
      goBack() {
        console.log('go back');
         this.$router.push({path:'/main'})
      }
    },
    mounted: function () {
        this.$axios({
            method:'get',									
            url:'http://127.0.0.1:8888/selectRoom/'+this.roomid,
        }).then((response) =>{          //返回promise(ES6语法)
            console.log(response.data)       //请求成功返回的数
            if(response.data.length > 0) {
               this.list = response.data
            } 
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        })
    }
}
</script>
<style scoped>
.header {
    background-color: aliceblue;
    padding: 8px;
    margin-top: -10px;
    margin-left: -10px;
    margin-right: -8px;
    border-bottom: 1px solid #d8d5d5;
}
.main {
    border: 1px solid #777;
    background-color: floralwhite;
}
</style>