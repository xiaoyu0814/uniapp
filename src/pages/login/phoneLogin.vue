<template>
	<view id="phoneLogin">
		<view class="title">手机快捷登录</view>
		<view class="input_box">
			<input v-model="tel" class="uni-input" focus placeholder="请输入手机号" />
		</view>
		<view class="input_box">
			<input v-model="verification" class="uni-input" placeholder="请输入验证码" />
			<text class="getCode_botton" v-if="getCode_show" @click="getVerification">获取验证码</text>
			<text class="getCode_botton" v-if="!getCode_show" :class="!getCode_show?'button_bgColor':''" >{{second}}s重新发送</text>
		</view>
		<view class="botton_box">
			<button type="primary" @click="checkTelWithCode">登录</button>
		</view>
		<view class="other_box">
			<text @click="goTo_userLogin">账号密码登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				second: 60,
				getCode_show: true,
				tel: "",
				verification: "",
			}
		},
		methods: {
			getVerification() {
				let _this = this;
				let regex = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
				if (!this.tel) {
					uni.showToast({
						icon: "none",
						title: "请输入手机号"
					});
				} else if (!regex.test(this.tel)) {
					uni.showToast({
						icon: "none",
						title: "手机号格式有误"
					});
				} else {
					this.getCode_show = false;
					let interval = setInterval(() => {
						this.second--;
						if (this.second == 0) {
							clearInterval(interval);
							this.second = 60;
							this.getCode_show = true;
						};
					}, 1000);
					let params = {
						tel: this.tel
					};
					this.$http.getCodeByTel(params).then(res => {
						uni.showToast({
							icon: "none",
							title: res.data.message
						});
					}).catch(err => {
						uni.showToast({
							icon: "none",
							title: err
						});
					});
				}
			},
			checkTelWithCode() {
				let params = {
					tel: this.tel,
					captcha: this.verification
				}
				this.$http.checkTelWithCode(params).then(res => {
					if (res.data.success) {
						this.checkExists();
					} else {
						uni.showToast({
							icon: "none",
							title: res.data.message
						});
					}
				})
			},
			checkExists() {
				let params = {
					tel: this.tel
				};
				this.$http.checkExists(params).then(res => {
					//false表示不存在 然后去设置密码
					if (!res.data.success) {
						this.$router.push({
							path: "/pages/login/setPassword" + "?tel=" + this.tel + "&verification=" + this.verification
						});
					} else {
						this.Login();
					}
				})
				.catch(err => {
					Toast({
						message: err,
						duration: 1000
					});
				});
			},
			Login() {
				let regex = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
				if (!this.tel) {
					uni.showToast({
						icon: "none",
						title: "请输入手机号"
					});
				} else if (!regex.test(this.tel)) {
					uni.showToast({
						icon: "none",
						title: "手机号格式有误"
					});
				} else {
					let params = {
						tel: this.tel,
						captcha: this.verification
					}
					this.$http.loginByTel(params).then(res => {
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
			goTo_userLogin() {
				uni.navigateTo({
					url: "/pages/login/userLogin",
					animationType: 'fade-in'
				});
			},
		},
		onLoad() {}
	}
</script>

<style lang="scss">
	#phoneLogin {
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
		position: relative;
	}

	.getCode_botton {
		position: absolute;
		right: 20rpx;
		bottom: 6rpx;
		border-radius: 4px;
		padding: 10rpx 20rpx;
		font-size: 14px;
		background-color: #007aff;
		color: #fff;
		border: 1px solid #007aff;
	}

	.botton_box {
		padding-top: 100rpx;
	}

	.other_box {
		text-align: right;
		padding: 40rpx 0;
		font-size: 12px;
		color: #00aaff;
	}
	.button_bgColor {
		background-color: #007aff;
		color: #fff;
		border: 1px solid #007aff;
	}
</style>
