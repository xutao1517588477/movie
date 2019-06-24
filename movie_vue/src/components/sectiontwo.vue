<template>
    <div id="section_three">
        <!--主页面三楼左半部-->
        <div id="section_three_l" class="content">
            <!--主页面三楼左半部上半部-->
            <div class="tat">
                <!--主标题-->
                <span class="tle">{{floor=="floor3"?"1905VIP影院":"艺术影院"}}</span>
                <!--副标题-->
                <span class="sti">{{floor=="floor3"?"更多会员影片":"更多艺术影院"}}</span>
            </div>
            <!--主页面三楼左半部下半部-->
            <div class="con">
                <!--卡片-->
                <div class="cad" v-for="(item,index) of list" :key="index">
                    <img :src="'http://127.0.0.1:3000/'+item.mimgurl" alt="">
                    <!--卡片内的标题与分数-->
                    <div class="tas">
                        <!--标题-->
                        <span class="tit">{{item.mname}}</span>
                        <!--分数-->
                        <span class="sco"><i>{{item.mcode|codeFilter1}}</i>.{{item.mcode|codeFilter2}}</span>
                    </div>
                    <div class="det">{{item.mcontent}}</div>
                </div>
            </div>
        </div>
        <!--主页面三楼右半部-->
        <div class="contentr">
            <div class="tle">{{floor=="floor3"?"点播":"艺术影院"}}排行榜</div>
            <div class="twoul">
                <ul v-for="(rankul,index) of ranklist" :key="index">
                    <!--top3这个样式要根据 rankid 动态绑定-->
                    <li class="li" v-for="(rankli,inx) of rankul" :key="inx"><span class="num" :class="rankli.rankid<4?'top3':''">{{rankli.rankid}}</span>{{rankli.rankname}}</li>
                </ul>
            </div>
            <img :src="'http://127.0.0.1:3000/img/index/'+floor+'_ranklist_img.jpg'" alt="" class="img">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:[],
            ranklist:[],
        };
    },
    props:{
        floor:{default:""}
    },
    filters:{
		codeFilter1(code){
			return Math.floor(code);
		},
		codeFilter2(code){
			return (code*10)%10;
		},
	},
    created(){
		var url="card";
		var obj={lm:this.floor};
        this.axios.get(url,{params:obj}).then(result=>{
			var arr=[];
			for(var i=0;i<result.data.length;i++){
				arr[i]=result.data[i];
			};
            this.list=arr;
        });
        var urll="rank";
        this.axios.get(urll,{params:obj}).then(result=>{
			var arr=[[],[]];
			for(var i=0;i<result.data.length;i++){
				arr[(i-i%5)/5][i%5]=result.data[i];
			};
            this.ranklist=arr;
        });
	},
}
</script>

<style scoped>
    /*公用样式*/
    
    #section_three{
        width: 1000px;
        height: 342px;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        margin-top: 2rem;
    }
    #section_three_l{
        width: 660px;
    }
    /*主页面三楼左半部的下半部下的四个div样式统一，都有三个儿子，依次是图片、片名和分数、简介*/
    .cad>img{
        width: 150px;
        height: 203px;
    }
</style>
