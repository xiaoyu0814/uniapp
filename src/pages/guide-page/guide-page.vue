<template>
	<view>
		<text class="skip-button" @tap="launchFlag(-1)">跳过</text>
		<swiper class="swiper">
			
			<swiper-item duration="300" v-for="(item, index) in guideList" :key="index">
				<image class="swiper-item" :src="item" @click="launchFlag(index)" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				guideList: ['/static/guide/guide1.jpg', '/static/guide/guide2.jpg', '/static/guide/guide3.jpg']
			};
		},

		methods: {
			launchFlag(index) {
				if(index == -1){
					uni.setStorage({
						key: 'launchFlag',
						data: true
					});
					uni.switchTab({
						url: '/pages/index/index'
					});
					
				}
				/*
				 向本地存储中设置launchFlag的值，即启动标识；
				*/
				if (index == this.guideList.length - 1) {
					// #ifdef APP-PLUS
					if (plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE) {
						uni.setStorage({
							key: 'launchFlag',
							data: true
						});
							uni.switchTab({
								url: '/pages/index/index'
							});
						
					} else {
						if ((plus.os.name).toLowerCase() == 'ios') {
							this.$permission.openPermission();
						} else {
							uni.showToast({
								title:"网络异常，请检查网络",
								icon:"none"
							})
						}
						
					}  
					// #endif

				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	.swiper {
		height: 100vh;

		.swiper-item {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	.skip-button{
		position: fixed;
		top: 60rpx;
		z-index: 200;
		right: 60rpx;
	}
</style>
