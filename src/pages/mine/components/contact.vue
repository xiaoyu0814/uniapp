<template>
	<view id="Contact">
		<web-view :src="src" :style="{top:style_type!==0?(style_type==1?'-130rpx':(style_type==2?'-180rpx':'-100rpx')):'0',bottom: '0'}"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: "",
				style_type: 0
			}
		},
		methods: {
			onLoad(option) {
				if (option.name == "数据资源") {
					this.src = "https://engine.piesat.cn/dataset-list?token=" + this.$storage.getStorage("token")+"&mobile=true";
					// this.style_type = 1;
					this.style_type = 0;
				} else if (option.name == "在线帮助") {
					this.src = "https://engine.piesat.cn/engine-studio/tutorials?token=" + this.$storage.getStorage("token")+"&mobile=true";
					// this.style_type = 2;
					this.style_type = 0;
				} else if (option.name == "运营数据") {
					this.src = "http://engine.piesat.cn/manage-web/#/staticsForManager?token=" + this.$storage.getStorage("token");
					this.style_type = 0;
				} else if (option.name == "联系我们") {
					this.src = "https://engine.piesat.cn/contact?token=" + this.$storage.getStorage("token")+"&mobile=true";
					// this.style_type = 1;
					this.style_type = 0;
				} else if (option.name == "人才招聘") {
					this.src = "https://piesat.cheng95.cn/position/search?channel=0";
					this.style_type = 3;
				} else if (option.name == "积分商城") {
					this.src = "https://engine.piesat.cn/user-center/Credits?token=" + this.$storage.getStorage("token")+"&mobile=true";
					// this.style_type = 2;
					this.style_type = 0;
				}
			}
		}
	}
</script>
