<template>
	<view id="setPassword">
		<view class="title">设置密码</view>
		<view class="input_box">
			<input v-model="password" class="uni-input" focus placeholder="请输入密码" />
		</view>
		<view class="input_box">
			<input v-model="confirmPassword" class="uni-input" password placeholder="请再次输入密码" />
		</view>
		<view class="botton_box">
			<button type="primary" @click="setPwd">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: "",
				verification: "",
				password: "",
				confirmPassword: "",
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
			setPwd() {
				let params = {
					tel: this.tel,
					captcha: this.verification,
					pwd: this.password,
					conPwd: this.confirmPassword,
					isMd5:false
				};
				this.$http.regist(params).then(res => {
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
		onLoad(option) {
			option.tel = this.tel;
			option.verification = this.verification;
		}
	}
</script>

<style lang="scss">
	#setPassword {
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
</style>
