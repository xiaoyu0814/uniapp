<template>
	<view class="pie-engine-app">
		<rich-text :nodes="item.messageContent"></rich-text>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			item:{},
			dataList: []
		};
	},
	onLoad(options) {
		this.id = options.id;
		this.queryPublicMessageById();
	},
	methods: {
		queryPublicMessageById() {
			let params = {
				id: this.id
			};

			this.$http.queryPublicMessageById(params).then(res => {
				this.item = res.data.data;
			});
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
}
image {
	max-width: 100% !important;
	max-height: 300rpx !important;
}
img {
	max-width: 100% !important;
	max-height: 400rpx !important;
}

</style>
