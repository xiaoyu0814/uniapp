<template>
	<view class="list-item" >
		<view class="home-list-item"  v-if="item.picModel==2" @tap="goDetailsPages(item)">
			<view class="home-item-left">
				<text class="home-item-title">{{item.mainTitle}}</text>
				<view class="home-foot-info">
					<text class="author-name">{{item.author}}</text>
					<view class="like">
						<text class="iconfont icon-xin" :class="{isActive:item.collectionStatus}"></text>
						<text class="like-num">{{item.thumbUpCount}}</text>
					</view>
				</view>
			</view>
			<image v-if="item.imageUrl" :src="item.imageUrl" class="item-img" mode="widthFix"></image>
		</view>
		<view class="home-list-item" v-if="item.picModel==1"   @tap="goDetailsPages(item)">
			<view class="home-item-left">
				<text class="home-item-title">{{item.mainTitle}}</text>
				<image  v-if="item.imageUrl" :src="item.imageUrl" class="item-img-2" mode="scaleToFill"></image>
	
				<view class="home-foot-info">
					<text class="author-name">{{item.author}}</text>
					<view class="like">
						<text class="iconfont icon-xin" :class="{isActive:item.collectionStatus}"></text>
						<text class="like-num">{{item.thumbUpCount}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="home-list-item" v-if="item.picModel==3"   @tap="goDetailsPages(item)">
			<view class="home-item-left">
				<text class="home-item-title">{{item.mainTitle}}</text>
				<text class="home-item-intro">
					{{item.deputyTitle}}
				</text>
				<view class="img-list" >
					<template v-for="img in item.imageUrlList">
						<image class="img-list-item" v-if="img" :src="img"  mode="widthFix" :key="img"></image>
					</template>
				</view>
				<view class="home-foot-info">
					<text class="author-name">{{item.author}}</text>
					<view class="like">
						<text class="iconfont icon-xin" :class="{isActive:item.collectionStatus}"></text>
						<text class="like-num">{{item.thumbUpCount}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name:"listItem",
		props:{
			// dataList:{
			// 	type:Array,
			// 	default:[]
			// },
			item:{
				type:Object,
				default:()=>{
					return {};
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			goDetailsPages(){
				this.$emit("goDetailsPages",this.item)
			}
		}
	}
</script>


<style lang="scss" scoped>

	.home-list-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #ffffff;
		padding: $global-margin;
		flex: 1;
		margin-top: 20rpx;
		border-radius: 10rpx;
		.home-item-left {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex:1;
		}

		.item-img {
			width: 200rpx;
			height: 200rpx;
			margin-left: 20rpx;
		}

		.home-item-intro {
			margin-top: 36rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #727683;
		}
	}


.item-img-2 {
	margin-top: 28rpx;
	height: 350rpx;
	width: 100%;
	margin-bottom: 18rpx;
}

.home-item-title {
	font-size: 30rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
}

.home-foot-info {
	display: flex;
	justify-content: space-between;
	.iconfont {
		color: #666666;
		font-size: 22rpx;
	}
	.isActive{
		color: #f46c6e;
	}
	.like-num {
		font-size: 24rpx;
		margin-left: 6rpx;
		color: #666666;
	}
	.author-name {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
}

.img-list {
	display: flex;
	flex-wrap: nowrap;
	margin: 20rpx 0;

	.img-list-item {
		width:33.3333%;
		margin-right: 18rpx;
	}
	.img-list-item:last-child{
		margin-right: 0;
	}
}
</style>

