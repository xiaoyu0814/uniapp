<template>
	<view id="swiper">
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in swiper_list" :key="index">
				<view class="swiper-item">
					<image class="img_style" style="height: 100%;width: 100%;" @click="goTo_advertisement(item)" :src="item.imageUrlApp"></image>
					<text class="swiper_item_title" v-if="item.mainTitle!=''?true:false">{{item.mainTitle}}</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 1000,
				swiper_list:[]
			}
		},
		props:{
			fromTo:{
				type: String,
				default: "find-banner"
			}
		},
		created(){
			this.getInfo();
		},
		methods:{
			goTo_advertisement(item) {
				if (item.jumpType == 0) {
					if (item.linkUrl == "无" || item.linkUrl == "") {
						
					} else {
						uni.navigateTo({
							url: "/pages/find/components/link?link=" + item.linkUrl,
							animationType: 'fade-in'
						});
					}
				} else {
					uni.navigateTo({
						url: '/pages/find/components/richText?id=' + item.id,
						animationType: 'fade-in'
					});
				}
			},
			getInfo() {
				let params = {
					code: this.fromTo
				}
				this.$http.clientBannerList(params).then(res => {
					if (res.data.success) {
						this.swiper_list = res.data.data
					}
				})
			},
		}
	}
</script>

<style>
	#swiper,.swiper{
		width: 100%;
		height: 100%;
	}
	
	.swiper-item {
		display: block;
		height: 422rpx;
		position: relative;
	}
	
	.swiper_item_title {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10rpx;
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
	}
</style>
