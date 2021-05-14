<template>
	<view class="no-content">
		<image class="no-content-img" src="../../static/noCentent.png"></image>

		<text class="no-content-text">{{ title }}</text>
		<!-- <text class="no-content-desc">{{ desc }}</text> -->
	</view>
</template>

<script>
export default {
	props: {
		title: {
			default: '暂未数据'
		},
		desc: {
			default: '暂未数据'
		}
	}
};
</script>

<style lang="scss" scoped>
.no-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 750rpx;
	height: 100vh;
	
}
.no-content-img {
	width: 263upx;
	height: 228upx;
	margin-bottom: 30rpx;
}
.no-content-text {
	font-size: 32upx;
	line-height: 50upx;
	color: #333;
	text-align: center;
}
.no-content-desc {
	font-size: 28upx;
	line-height: 50upx;
	color: #666;
	text-align: center;
}
</style>
