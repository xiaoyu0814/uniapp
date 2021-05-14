<template>
	<view class="pie-engine-app">
		<view class="details-title">
			<text class="main-title">{{item.mainTitle}}</text>
		</view>
		<u-parse :content="item.content" @preview="preview" @navigate="navigate" />
		
		<!-- <rich-text :nodes="item.content"></rich-text> -->
		<view class="like-collection">
			<view class="like-collection-item" @tap="likeCollection(2)">
				<text class="iconfont icon-xin" :class="{isActive:item.collectionStatus}"></text>
				<text class="like-num">{{item.collectionCount}}</text>
			</view>
			<view class="like-collection-item"  @tap="likeCollection(1)">
				<text class="iconfont icon-dianzan2" :class="{isActive:item.thumbUpStatus}"></text>
				<text class="like-num">{{item.thumbUpCount}}</text>
			</view>
		</view>
		<view class="related-reading">
			<view class="related-reading-title">
				<text class="related-reading-text">相关阅读</text>
			</view>
			<view v-for="(item,index) in dataList">
				<list-item :item="item"  @goDetailsPages="goDetailsPages"></list-item>
				
			</view>
			
		</view>
	</view>
</template>

<script>
import listItem from '@/components/list-item/list-item.vue';
import uParse from '@/components/gaoyia-parse/parse.vue'


export default {
	components: {
		listItem,
		uParse
	},
	data() {
		return {
			id: '',
			item:{},
			dataList: []
		};
	},
	onLoad(options) {
		this.id = options.id;
		this.queryDetailsById();
		this.getChangeBatch();
	},
	methods: {
		  preview(src, e) {
		      // do something
		    },
		    navigate(href, e) {
		      // do something
		    },
		queryDetailsById() {
			let params = {
				id: this.id
			};

			this.$http.queryDetailsById(params).then(res => {
				this.item = res.data.data;
				// uni.setNavigationBarTitle({
				//     title: this.item.mainTitle
				// });
			});
		},
		getChangeBatch() {
			let params = {
				idList:this.id
			};
			this.$http.getChangeBatch(params).then(res => {
				if(res.data.success){
					this.dataList = res.data.data;
				}
			});
		},
		likeCollection(type){
			let params = {
				newsId: this.id,
				type:type
			};
			
			this.$http.likeCollection(params).then(res => {
				if(res.data.success){
					// uni.showToast({
					// 	icon: "none",
					// 	title: "操作成功"
					// });
					this.queryDetailsById();
				}
				
				
			});
		},
		goDetailsPages(item) {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 300
			});
			this.id =item.id;
			this.queryDetailsById();
			this.getChangeBatch();
		},
	}
};
</script>

<style lang="scss">
.pie-engine-app {
	background:#F9F9F9 ;
	max-width: 100%;
	overflow: hidden;
	min-height: 100vh;
	padding: 30rpx;
	.details-title{
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.main-title{
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #333333;
	}
}
image {
	max-width: 100% !important;
	max-height: 300rpx !important;
}
img {
	max-width: 100% !important;
	max-height: 400rpx !important;
	width: 100% !important;
}
.like-collection {
	display: flex;
	justify-content: space-between;
	margin-top: 30rpx;
}
.like-num {
	margin-left: 10rpx;
}
.related-reading{
	margin-top: 20rpx;
}
.like-collection-item{
	.iconfont{
		color: #666666;
	}
	.isActive{
		color: #f46c6e;
	}
}
.related-reading-title{
	display: flex;
	justify-content: center;
	.related-reading-text{
		font-size: 36rpx;
		color: #333333;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
	}
}
</style>
