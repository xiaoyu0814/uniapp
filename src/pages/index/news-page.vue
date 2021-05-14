<template>
	<view class="news-list">
		<view v-for="(item,index) in dataList" :key="index">
			<view class="news-list-item" @tap="goNewsDetails(item)">
<!-- 				<image src="../../static/index.png" class="portraits-img" mode="widthFix"></image>
 -->				<view class="list-item-right">
					<view class="item-right">
						<text class="item-right-title">{{item.topic}}</text>
						<text class="item-right-date">{{item.createTime}}</text>
					</view>
					<rich-text :nodes="item.messageContent" class="item-info"></rich-text>
<!-- 					<text class="item-info">老表，不去你家吃饭了，我去找丁真了</text>
 -->				</view>
			</view>
		</view>
	
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataList:[]
		};
	},
	onLoad() {
		this.queryClientMessage();
	},
	methods: {
		queryClientMessage() {
			this.$http.queryClientMessage().then(res => {
				if (res.data.success) {
				  this.dataList = res.data.data.msgList;
				}
			});
		},
		goNewsDetails(item){
			if(item.messageContent){
				uni.navigateTo({
					url:"./news-details?id="+item.id
				})
			}
			
		}
	}
};
</script>

<style lang="scss" scoped>
.news-list-item {
	display: flex;
	padding: 30rpx 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
}
.portraits-img {
	width: 90rpx;
	height: 90rpx;
	border-radius: 100%;
}
.list-item-right {
	display: flex;
	flex-direction: column;
	margin-left: 20rpx;
	flex: 1;
	.item-right {
		display: flex;
		justify-content: space-between;
		.item-right-title {
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #3f4043;
			letter-spacing: 1px;
		}
		.item-right-date {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #727683;
		}
	}
	.item-info {
		margin-top: 16rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #727683;
	}
}
</style>
