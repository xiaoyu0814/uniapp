<template>
	<view class="bannerLink">
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				src:""
			}
		},
		onLoad(option) {
			this.src = option.link + "?token=" + this.$storage.getStorage("token") + "&mobile=true";
		}
	}
</script>

<style>
</style>
