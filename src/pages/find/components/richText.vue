<template>
	<view id="richText">
		<!-- {{item.content}} -->
		<rich-text :nodes="item.content"></rich-text>
		
		<view class="like-collection" v-if="false">
			<view class="like-collection-item" @tap="likeCollection(2)">
				<text class="iconfont icon-xin" :class="{isActive:item.collectionStatus}"></text>
				<text class="like-num">{{item.collectionCount}}</text>
			</view>
			<view class="like-collection-item"  @tap="likeCollection(1)">
				<text class="iconfont icon-dianzan2" :class="{isActive:item.thumbUpStatus}"></text>
				<text class="like-num">{{item.thumbUpCount}}</text>
			</view>
		</view>
		<view class="related-reading" v-if="false">
			<view class="">
				<text>相关阅读</text>
			</view>
			<view v-for="(item,index) in dataList">
				<list-item :item="item" :key="item.id" @goDetailsPages="goDetailsPages"></list-item>
			</view>
		</view>
	</view>
</template>

<script>
import listItem from '@/components/list-item/list-item.vue';
export default {
	components: {
		listItem
	},
	data() {
		return {
			id: '',
			item:{},
			dataList: []
		};
	},
	methods: {
		queryDetailsById() {
			let params = {
				id: this.id
			};
			this.$http.bannerById(params).then(res => {
				this.item = res.data.data;
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
	},
	onLoad(options) {
		this.id = options.id;
		this.queryDetailsById();
		// this.getChangeBatch();
	}
};
</script>

<style lang="scss">
	#richText {
		background:#F9F9F9 ;
		max-width: 100%;
		overflow: hidden;
		min-height: calc(100vh - 150rpx);
		padding: 30rpx;
	}
	image {
		max-width: 100% !important;
	}
	img {
		max-width: 100% !important;
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

</style>
