<template>
	<view id="AI">
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				src:"",
			}
		},
		methods:{},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			if(option.name == "地物分类"){
				this.src = "http://cloud.piesat.cn/pieapp/v2/#/steps_view"
				// this.src = "http://localhost:8081/#/steps_view"
			}else if(option.name == "建筑物识别"){
				this.src = "https://cloud.piesat.cn/pieapp/v2/#/aimodel?type=BUILD"
				// this.src = "http://localhost:8081/#/aimodel?type=BUILD"
			}else if(option.name == "道路提取"){
				this.src = "https://cloud.piesat.cn/pieapp/v2/#/ai?type=ROADS"
				// this.src = "http://localhost:8081/#/ai?type=ROADS"
			}else if(option.name == "飞机识别"){
				this.src = "https://cloud.piesat.cn/pieapp/v2/#/ai?type=PLANE"
				// this.src = "http://localhost:8081/#/ai?type=PLANE"
			}else if(option.name == "舰船检测"){
				this.src = "https://cloud.piesat.cn/pieapp/v2/#/ai?type=SHIP"
				// this.src = "http://localhost:8081/#/ai?type=SHIP"
			}else if(option.name == "机场检测"){
				this.src = "https://cloud.piesat.cn/pieapp/v2/#/ai?type=AIRPORT"
				// this.src = "http://localhost:8081/#/ai?type=AIRPORT"
			}
		}
	}
	
</script>
