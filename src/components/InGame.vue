<template>
    <div class="InGame">
        <el-page-header class="header" @back="goBack" content="InGame">
        </el-page-header>
        <!-- <Menu></Menu> -->
        
        <el-row style="padding: 10px;">
            <el-col :span="24"><div class="grid-content bg-purple-dark"><b>房间号:{{roomid}}</b></div></el-col>
        </el-row>
        <div class="main">
            <el-card class="box-card">
                <div v-for="item in list" :key="item" class="text item">
                    <el-row>
                        <el-col :span="4" style="text-align: right;">
                            <div class="grid-content bg-purple">
                                <el-avatar icon="el-icon-user-solid"></el-avatar>
                            </div>
                        </el-col>
                        <el-col :span="12" style="text-align: left;font-size: 22px;padding: 6px;">
                            <div class="grid-content bg-purple-light">
                                {{item.username}}
                            </div>
                        </el-col>
                    </el-row> 
                    <!-- <el-avatar icon="el-icon-user-solid"></el-avatar>{{item.username}} -->
                </div>
            </el-card>
            <!-- <el-row v-for="(item,index) in list">
                <el-col :span="4" style="text-align: right;">
                    <div class="grid-content bg-purple">
                        
                        <el-avatar icon="el-icon-user-solid"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="12" style="text-align: left;font-size: 22px;padding: 6px;">
                    <div class="grid-content bg-purple-light">
                        {{item.username}}
                    </div>
                </el-col>
            </el-row> -->
        </div>
        <div class="liaotian" v-show="liaotian.length>0">
            <el-card class="box-card">
                <div v-for="obj in liaotian" :key="obj" class="text item">
                    <el-row>
                        <el-col :span="24" style="text-align: right;">
                            <div class="grid-content bg-purple">
                                {{obj}}
                            </div>
                        </el-col>
                    </el-row> 
                </div>
            </el-card>
        </div>
        <div class="bottom-tab">
            <el-row>
               
                <el-col :span="20"><div >
                    <el-input
                        placeholder="请输入内容"
                        v-model="centent"
                        clearable>
                    </el-input>
                </div></el-col>
                <el-col :span="4"><div>
                    <el-button  icon="el-icon-s-promotion" @click="fasong()"></el-button>
                </div></el-col>
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
            list: [],
            timer: null,
            centent: '',
            liaotian: []
        }
    },
    components: {
      Menu
    },
    methods: {
        goBack() {
            console.log('go back');
            window.clearInterval(this.timer)
            this.timer = null
            this.$router.push({path:'/main'})
        },
        selectRoom() {
            this.$axios({
                method:'get',									
                url:'http://127.0.0.1:8888/selectRoom/'+this.roomid,
            }).then((response) =>{          //返回promise(ES6语法)
                console.log(response.data)       //请求成功返回的数
                if(response.data.length > 0) {
                    this.list = response.data
                    //setTimeout(this.selectRoom(),3000)    
                } 
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
        },
        fasong(){
            this.liaotian.push(this.centent)
            this.liaotian.reverse();
            console.log(this.centent)
            this.centent = ''
        }
    },
    mounted: function () {
        this.selectRoom()
        //this.timer = setInterval(this.selectRoom,5000)    
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
.bottom-tab {
    width: 100%;
    height: 40px;
    background-color: #fff;
    position: fixed;
    left: 0px;
    bottom: 0px;
    display: flex;
    z-index: 999;
}
.liaotian {
    margin-top: 10px;
    max-height: 250px;
    height: 250px;
    overflow:scroll;
}
/* .main {
    border: 1px solid #777;
    background-color: floralwhite;
} */
</style>