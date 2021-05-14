<template>
	<view id="userLogin">
		<view class="title">账号密码登录</view>
		<view class="input_box">
			<input v-model="userName" class="uni-input" focus placeholder="请输入用户名" />
		</view>
		<view class="input_box">
			<input v-model="password" class="uni-input" password placeholder="请输入密码" />
		</view>
		<view class="botton_box">
			<button type="primary" @click="login">登录</button>
		</view>
		<view class="other_box">
			<text @click="goTo_resetPassword">忘记密码</text>
			<text @click="goTo_phoneLogin">手机快捷登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: "",
				password: "",
			}
		},
		methods: {
			goTo_phoneLogin() {
				uni.navigateTo({
					url: "/pages/login/phoneLogin",
					animationType: 'fade-in'
				});
			},
			goTo_resetPassword() {
				uni.navigateTo({
					url: "/pages/login/resetPassword",
					animationType: 'fade-in'
				});
			},
			login() {
				let params = {
					username: this.userName,
					password: this.password,
					isMd5: false
				};
				this.$http.userLogin(params).then(res => {
					if (res.data.success) {
						this.$storage.setStorage("token",res.data.data.token);
						this.$storage.setStorage("userId",res.data.data.userData.userId);
						this.$storage.setStorage("userName",res.data.data.userData.userName);
						uni.reLaunch({
							url: "/pages/index/index"
						});
					} else {
						uni.showToast({
							icon: "none",
							title: res.data.message
						});
					}
				}).catch(err => {
					uni.showToast({
						icon: "none",
						title: err
					});
				});
			}
		},
		onLoad() {}
	}
</script>

<style lang="scss">
	#userLogin {
		padding: 40rpx;
		background-color: #f4f8f4;
		min-height: 100vh;
		padding-top: 160rpx;
		box-sizing: border-box;
	}

	.title {
		font-size: 20px;
		margin-bottom: 100rpx;
	}

	.input_box {
		margin-bottom: 60rpx;
		border-bottom: 1px solid #ccc;
		padding: 10rpx;
	}

	.botton_box {
		padding-top: 100rpx;
	}

	.other_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 0;
		font-size: 12px;
		color: #00aaff;
	}
</style>
