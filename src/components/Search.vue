<template>
    <div class="Search">
        <Menu></Menu>
        
            <el-row>
                <el-col :span="18"><div class="grid-content bg-purple">
                    <el-input
                        placeholder="请输入内容"
                        v-model="room"
                        clearable>
                    </el-input>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">
                    <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
                </div></el-col>
            </el-row>
       
            <el-row v-show="list.length == 0&&msg">
                <el-col class="nodate" :span="24"><div class="grid-content bg-purple-dark">搜索不到房间信息</div></el-col>
            </el-row>
            <div class="main"  v-show="list.length > 0">
                <el-row>
                    <el-col :span="9" style="padding-top: 8px;"><div class="grid-content bg-purple-dark">房间号：{{room}}</div></el-col>
                    <el-col :span="9" style="padding-top: 8px;"><div class="grid-content bg-purple-dark">人数：{{list.length}}</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple-dark"><el-button type="success" plain @click="insert()">加入</el-button></div></el-col>
                </el-row>
            </div>

            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="70%"
                :before-close="handleClose">
            <span>该用户已在房间{{roomid}}, 是否继续?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false;go()">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>
<script>
import Menu from './Menu.vue'
export default {
    name: 'Search',
    components: {
      Menu
    },
    data() {
        return {
            room: '',
            msg: false,
            list: [],
            dialogVisible: false,
            roomid: ''
        }
    },
    methods:{
        search: function () {
            if(this.room == '') {
                return 
            }
            this.$axios({
                method:'get',									
                url:'http://127.0.0.1:8888/selectRoom/'+this.room,
            }).then((response) =>{          //返回promise(ES6语法)
                console.log(response.data)       //请求成功返回的数
                if(response.data.length > 0) {
                     this.msg = false
                    this.list = response.data
                } else {
                    this.msg = true
                }
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
        },
        insert: function () {
            var user = JSON.parse(localStorage.getItem('user'))
            this.$axios({
                method:'post',									
                url:'http://127.0.0.1:8888/isRoom/',
                params: {
                    id: user.id
                }
            }).then((response) =>{          //返回promise(ES6语法)
                console.log(response.data)       //请求成功返回的数
                if(response.data != 0) {
                    this.roomid = response.data[0].roomid
                    this.dialogVisible = true
                    // this.$confirm('该用户已在房间' + response.data[0].roomid + ', 是否继续?', '提示', {
                    //     confirmButtonText: '确定',
                    //     cancelButtonText: '取消',
                    //     type: 'warning',
                    //     width: '150px'
                    // }).then(() => {
                    //     this.go()
                    // }).catch(() => {
                                
                    // });
                } else {
                     this.go()
                }
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
        },
        go: function () {
            var user = JSON.parse(localStorage.getItem('user'))
            this.$axios({
                method:'post',									
                url:'http://127.0.0.1:8888/insert/',
                params: {
                    roomid:this.room,
                    username: user.username,
                    id: user.id
                }
            }).then((response) =>{          //返回promise(ES6语法)
                console.log(response.data)       //请求成功返回的数
                if(response.data.length > 0) {
                    this.$message({
                        message: '加入成功',
                        type: 'success'
                    });
                    this.$router.push({path:'/ingame/'+response.data[0].roomid})
                } else {
                     this.$message({
                        message: '加入失败',
                        type: 'error'
                    });
                }
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
        }
    }
}
</script>
<style scoped>
.nodate {
    padding: 5px;
    color: #777;
}
.main {
    border: 1px solid #777;
    background-color: floralwhite;
    padding: 5px;
    margin-top: 10px; 
}
</style>