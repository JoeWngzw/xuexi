<template>
    <div id="header">
        <!-- header 最顶部 -->
        <div class="header-top">
            <div class="container">
			<span class="datetime-wrap">
				亚洲/上海:
			</span>

                <span id="currentDateTime">2018/12/31 23:08:49 (UTC +08:00)</span>

                <ul class="top-link-wrap">
                    <li><img src="../assets/wxcz.gif"></li>
                    <li><a class="app-download" href="javascript:;">手机app下载</a></li>
                    <li>|</li>
                    <li><a style="color: #999" href="javascript:;">代理注册</a></li>
                    <li>|</li>
                    <li><a style="color: #999" href="javascript:;"></a>加入收藏</li>
                    <li>
                        <a style="background-position: 0 -80px;" class="ele-lang-zh-cn" href="javascript:;"></a>
                        <a class="ele-lang-en" href="javascript:;"></a>

                    </li>
                </ul>

            </div>
        </div>

        <!-- 头部 -->
        <div class="header">
            <div class="container">
                <div class="venetina-img">
                    <a href="javascript:;">
                        <img src="../assets/logo_s96JYBx.png">
                    </a>
                </div>
                <div class="login-registered fr">
                    <a class="header-login" href="/WebsiteLearning-master/项目/澳门威尼斯人/login.html">登录</a>
                    <a class="header-registered" href="javascript:;">免费注册</a>
                </div>
            </div>
        </div>
        <!-- 导航栏 -->
        <div class="header-navbar">
            <ul class="game-nav" >
                <li><a href="javascript:;">首页</a></li>
                <li v-for="(site,i) in data" v-on:mouseover="changeActive(i)" v-on:mouseout="removeActive($event)">
                    <a class="arrow-down" href="javascript:;">{{site.name}}</a>
                    <p class="triangle"></p>
                    <div class="categoryNav">
                        <div class="categoryList"  :class="[num == i] ? 'active' : '' ">
                            <div v-for="(aa,j) in site.provider">
                                <a href="#">
                                    <img :src="aa.icon">
                                    <p>{{aa.name}}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="fr"><a class="" href="javascript:;">优惠活动</a></li>
                <li class="fr"><a class="" href="javascript:;">代理加盟</a></li>
                <li class="fr"><a class="" href="javascript:;">在线客服</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'header',
        data(){
            return{
                data:[],
                num:null,
            }
        },
        created:function () {
            //为了在内部函数能使用外部函数的this对象，要给它赋值了一个名叫self的变量。
            var self = this;
            axios.get('http://b9088.com/member/gamecategory/?mode=tree')
                .then(function (response) {
                    console.log('成功');
                    console.log(response.data);
                    //把获取的数据赋值给数组
                    self.data = response.data;
                })
                .catch(function (error) {
                    console.log('错误');
                    console.log(error);
                });
        }
        ,
        props:{
        },
        mounted:function () {
        },
        methods:{
            changeActive(aa){
                console.log(aa);
                this.num = aa;
            },
            removeActive(cc){
                this.num = null;
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import '../style/common.css';

    html,body{
        margin: 0;
        padding: 0;
        font-size: 14px;
        font-family:"微软雅黑,宋体";
        background-color: #2a2c3b;
    }

    .header-top,.header,.header-navbar,.banner-box,.announcement,.operating,.slots,.shortcuts,.about,.contact,
    .container,.footer{
        width: 100%;
        /*	border: 1px solid #ccc;
        *//*	background-color: #444;
        */	/*height: 30px;*/
    }

    .header-top .container{
        max-width: 1000px !important;
        width: 100%!important;
        position: relative;
        margin: 0 auto;
        color: #999;
        height: 30px;
        line-height: 30px;
    }

    .top-link-wrap{
        position: absolute;
        width: 300px;
        top: 0;
        right: 0;
        margin: 0px;
    }

    .top-link-wrap li{
        display: inline-block;
    }

    .top-link-wrap img{
        background-size: 100% 100%;
        position: absolute;
        top: 6px;
        right: 305px;
        width: 100px;
        height: 20px;
    }

    .app-download{
        color: #f0ad4e;
        font-weight: 700px;
    }

    .ele-lang-zh-cn,.ele-lang-en{
        background-image: url("../assets/base.435d855.png");
        position: absolute;
        top: 5px;
        right: 50px;
        width: 22px;
        height: 20px;
        display: inline-block;
    }

    .ele-lang-en{
        background-position: 0 -120px;
        right: 28px;
    }
    .header{
        background-color: #313347;
    }

    .header .container{
        max-width: 1000px !important;
        width: 100%!important;
        height: 90px;
        margin: 0 auto;
    }

    .venetina-img{
        overflow: hidden;
    }

    .venetina-img a{
        display: block;
        margin-top: 10px;
    }

    .venetina-img img{
        position: absolute;
        height: 70px;
    }

    .login-registered{
        width: 176px;
        height: 64px;
        margin-top: 15px;
        margin-right: 10px;
    }

    .login-registered a{
        display: inline-block;
        border: 1px solid #fff;
        border-radius: 4px;
        padding:6px 12px;
    }

    .header-login{
        background-color: #fff;
        border-color: #ccc !important;
        color: #333;
        margin-right: 15px;
    }

    .header-login:hover{
        color: #333;
        background-color: #ccc;
        border-color: #ccc;
    }


    .header-registered{
        color: #fff;
        background-color: #f0ad4e;
        border-color: #eea236 !important;
    }

    .header-registered:hover{
        color: #fff;
        background-color: #ec971f;
        border-color: #d58512;
    }


    .header-navbar {
        max-width: 1000px !important;
        width: 100%!important;
        height: 50px;
        background-color: #2a2c3b;
        margin: 0 auto;
    }

    .game-nav{
        margin: 0px;
        padding-left: 0;
    }

    .game-nav li{
        display: inline-block;
        margin-left: 20px;
    }

    .game-nav a{
        display: inline-block;
        width: 100%;
        height: 52px;
        line-height: 52px;
        margin: 0 auto;
        color: #fff;
    }

    .triangle{
        border: solid transparent;
        height: 0;
        width: 0;
        border-top-color: #fff;
        border-width: 4px;
        display: block;
        margin: 0 auto;
        margin-top: -15px;
    }

    .game-nav .puyu:after{
        left: 15px !important;
    }




    .banner-box{
        width: 100%;
        height: 440px;
        background-color: #2a2c3b;
        display: list-item;
        overflow: hidden;

    }

    .banner-box ul{
        margin:0px;
        padding: 0px;
    }

    .banner-box li{
        height: 440px;
    }


    .announcement{
        height: 36px;
        background-color: #2a2c3b;

    }


    .operating{
        height: 98px;
        background-color: #2a2c3b;
    }

    .slots{
        height: 299px;
        background-color: #2a2c3b;
    }


    .shortcuts{
        height: 330px;
        background-color: #2a2c3b;
    }

    .about{
        height: 275px;
        background-color: #2a2c3b;
    }

    .contact{
        height: 76px;
        background-color: #2a2c3b;
    }

    .container{
        height: 60px;
    }

    .footer{
        height: 66px;
        background-color: #2a2c3b;
    }

    .ad{
        position: fixed;
        right: 0;
        top: 50%;
        margin-top: -140px;
        background-image: url("../assets/home.58d75cd.png");
        background-position: 0 -1015px;
        width: 150px;
        height: 287px;
        background-repeat: no-repeat;
    }


    .categoryNav{
        position: absolute;
        width: 100%;
        left: 0;
        margin-top: 5px;
        background-color: #232432;
    }

    .categoryList{
        width: 1000px;
        height: 90px;
        margin: 0 auto;
        display: none;
    }

    .categoryList div{
        float: left;
        margin-top: 5px;
        margin-right: 20px;
    }

    .categoryNav p{
        color: #fff;
        margin-top: -25px;
        text-align: center;
    }

    .categoryList img{
        width: 100px;
        height: 60px;
    }

    .banner-box li{
        height: 440px;
        display: none;
    }

    .banner-box .active{
        display: block;
    }

    .categoryNav .active{
        display: block;
    }
</style>