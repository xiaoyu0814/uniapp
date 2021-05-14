<template>
	<view id="find">
		<view class="uni-margin-wrap">
			<swiper-banner :fromTo="'find-banner'"></swiper-banner>
		</view>
		<view class="hotApplication" v-if="liveShowCtrl">
			<view class="hotApplication_header">
				<text>热门应用</text>
				<text class="iconfont rotate" @click="showAll()">&#xe633;</text>
			</view>
			<view class="hotApplication_list">
				<view class="hotApplication_item" v-for="(item,index) in hotApplication_list" :key="index" @click="goTo_hotApplication(item)"
				 v-if="index>3?(hotApplication_show?true:false):true">
					<image class="img_style" :src="item.url" mode="widthFix"></image>
					<text>{{item.label}}</text>
				</view>
			</view>
		</view>
		<view class="hotActivity">
			<text style="font-weight: bold;">热门活动</text>
			<view class="hotActivity_list" v-for="(item,index) in hotActivity_list" :key="index">
				<view class="hotActivity_item" @click="goTo_hotActivity(item)">
<!-- 					<image class="hotActivity_icon" :src="item.logoUrl" mode="widthFix"></image>
 -->					<image class="img_style" :src="item.imageUrl" mode="widthFix"></image>
					<text class="hotActivity_title">{{item.startStatus == 0 ? "未开始" : (item.startStatus == 1 ? "进行中" : "已结束")}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import swiperBanner from "@/components/swiper/swiper.vue"
	export default {
		components:{
			swiperBanner
		},
		data() {
			return {
				hotApplication_show: false,
				hotApplication_list: [{
						url: "../../static/classificationOfGroundFeatures.png",
						label: "地物分类",
						router: "/pages/find/components/AI"
					},
					{
						url: "../../static/roadExtraction.png",
						label: "道路提取",
						router: "/pages/find/components/AI"
					},
					{
						url: "../../static/aircraftIdentification.png",
						label: "飞机识别",
						router: "/pages/find/components/AI"
					},
					{
						url: "../../static/shipDetection.png",
						label: "舰船检测",
						router: "/pages/find/components/AI"
					},
					{
						url: "../../static/airportInspection.png",
						label: "机场检测",
						router: "/pages/find/components/AI"
					},
					{
						url: "../../static/buildingIdentification.png",
						label: "建筑物识别",
						router: "/pages/find/components/AI"
					}
				],
				hotActivity_list: [{
						url: "../../static/activity1.png",
						icon: "../../static/competition.png",
						label: "正在进行",
						router: "/pages/find/components/hotActivity"
					},
					{
						url: "../../static/activity2.png",
						icon: "../../static/competition.png",
						label: "",
						router: "/pages/find/components/hotActivity"
					},
				],
				router: "/pages/find/components/advertisement",
				url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
			}
		},
		computed:{
			liveShowCtrl(){
			if( this.$storage.getStorage('liveShowCtrl')){
				return true;
			  }	{
				  return false
			  }
			}
			
		},
		methods: {
			showAll() {
				this.hotApplication_show = !this.hotApplication_show
			},
			goTo_hotApplication(item) {
				uni.navigateTo({
					url: item.router + "?name=" + item.label,
					animationType: 'fade-in'
				});
			},
			goTo_hotActivity(item) {
				uni.navigateTo({
					url: "/pages/find/components/link?link=" + item.url
				});
			},
			getActivityList() {
				let params = {
					status: 0
				}
				this.$http.getActivityList(params).then(res => {
					if (res.data.success) {
						this.hotActivity_list = res.data.data.list
					}
				})
			}
		},
		onShow() {
			this.getActivityList();
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			this.getInfo();
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		}

	}
</script>

<style lang="scss" scoped>
	#find {
		/* padding: 10px; */
		background-color: #F9F9F9;
		min-height: calc(100vh - 95px);
	}

	.uni-margin-wrap {
		width: 100%;
		height: 422rpx;
	}

	.hotApplication {
		margin-top: 40rpx;
		padding: 40rpx;
		background-color: #fff;
	}

	.hotApplication_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: bold;
	}

	.rotate {
		transform: rotate(90deg);
	}

	.hotApplication_list {
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		flex-wrap: wrap;
		margin-top: 40rpx;
	}

	.hotApplication_item {
		width: 25%;
		/* height: 0px; */
		padding: 10rpx;
		font-size: 20rpx;
		text-align: center;
		box-sizing: border-box;
	}

	.hotActivity {
		margin-top: 40rpx;
		// margin-bottom: 50px;
		padding: 40rpx;
		background-color: #FFF;
	}

	.hotActivity_list {
		position: relative;
	}

	.hotActivity_item {
		margin-top: 28rpx;
	}

	.hotActivity_icon {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		right: 10px;
		top: -50rpx;
		z-index: 1;
	}

	.hotActivity_title {
		position: absolute;
		left: 20rpx;
		top: 10rpx;
		color: #fff;
		font-size: 12px;
	}

	.img_style {
		width: 100%;
		height: 350rpx;
	}
</style>
