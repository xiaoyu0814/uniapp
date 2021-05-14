<template>
	<view class="pie-engine-app">
		<view class="home-list">
			<view v-for="(item, index) in dataList">
				<list-item :item="item" @goDetailsPages="goDetailsPages" :key="item.id"></list-item>
				</view>
			<no-content v-if="dataList.length == 0"></no-content>
			<uni-load-more :status="status" v-if="dataList.length > 0"></uni-load-more>
		</view>
	</view>
</template>

<script>
import listItem from '@/components/list-item/list-item.vue';
import noContent from '@/components/no-content/no-content';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	components: {
		listItem,
		noContent
	},
	data() {
		return {
			dataList: [],
			status: 'more',
			pageNum: 1,
			pageSize: 10,
			stopUpload: true //当上拉加载返回数据为空时禁止请求接口
		};
	},
	onShow() {
		this.pageNum = 1;
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 300
		});
		this.status = 'more';
		this.getIndexInfoList();
	},
	onPullDownRefresh() {
		console.log(12233)
		this.pageNum = 1;
		this.stopUpload = true;
		this.getIndexInfoList();
	},
	onReachBottom() {
		if (this.pageNum > 1 && this.stopUpload) {
			this.getIndexInfoList();
		}
	},
	methods: {
		goDetailsPages(item) {
			uni.navigateTo({
				url: './details-pages?id=' + item.id,
				animationType: 'fade-in'
			});
		},
		getIndexInfoList() {
			let params = {
				code: 'Index-news',
				keyWords: '',
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				queryType: 1
			};
			let IndexInfoList = this.$storage.getStorage('IndexInfoList', 1);
			if (this.pageNum == 1) {
				this.dataList = IndexInfoList;
			}
			let _this = this;
			_this.$http.getIndexInfo(params).then(res => {
				if (res.data.success) {
					uni.stopPullDownRefresh();
					let infoList = res.data.data.list;
					// _this.dataList = res.data.data.list;
					if (_this.pageNum == 1) {
						// 对比缓存跟请求数据是否相同、如果不相等则重新缓存
						if (!_this.$util.contrastArray(infoList, IndexInfoList)) {
							_this.dataList = infoList;
							_this.$storage.setStorage('IndexInfoList', infoList, 1);
						}
					} else {
						this.dataList = [..._this.dataList, ...infoList];
					}
					if (infoList.length < _this.pageSize) {
						_this.stopUpload = false;
						_this.status = 'noMore';
					} else {
						_this.pageNum++;
					}
				}
			});
		}
	},
	onNavigationBarButtonTap(e) {
		// 判断是否是登录状态

		if (e.index == 0) {
			// uni.navigateTo({
			// 	url: './li	ve-streaming',
			// 	animationType: 'fade-in'
			// });
			// #ifdef APP-PLUS
			if (this.$storage.getStorage('liveShowCtrl')) {
				let url = 'https://engine.piesat.cn/live-show-list?mobile=true&token=' + this.$storage.getStorage('token');
				console.log(url);
				plus.runtime.openURL(url);
			} else {
				uni.showToast({
					title: '该功能正在建设中',
					icon: 'none'
				});
			}
			// #endif
		} else if (e.index == 1) {
			uni.navigateTo({
				url: './news-page'
			});
		}

		// this.setStyle(e.index, false);
	},
	/**
	 * 当 searchInput 输入时触发
	 */
	onNavigationBarSearchInputClicked(e) {
		let _this = this;
		uni.navigateTo({
			url: './search-page'
		});
	}
};
</script>

<style lang="scss" scoped>
.pie-engine-app {
	padding: 0 30rpx;
}
.home-list {
	display: flex;
	flex-direction: column;
	.home-list-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #ffffff;
		padding: $global-margin;
		flex: 1;
		margin-top: 20rpx;
		padding: 30rpx;

		.home-item-left {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
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
		color: #f46c6e;
		font-size: 22rpx;
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
		width: 190rpx;
		margin-right: 18rpx;
	}
}
</style>
