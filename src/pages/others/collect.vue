<template>
	<view>
		<view v-for="(item,index) in dataList" :key="index">
			<list-item :item="item" @goDetailsPages="goDetailsPages"></list-item>	
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
				dataList:[]
			}
		},
		onLoad() {
			this.getCollection();
		},
		methods: {
			getCollection() {
				let params = {};
			
				this.$http.getCollection(params).then(res => {
					if(res.success){
						this.dataList = res.data.data;
					}
					
				});
			},
		}
	}
</script>

<style>

</style>
