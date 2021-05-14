<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// #ifdef APP-PLUS
		this.appUpdate();
		this.islaunchFlag();
		if(!this.$storage.getStorage('liveShowCtrl')){
			this.liveShowCtrl();
		}
		
		// #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		liveShowCtrl() {
			let os = plus.os.name.toLowerCase();
			if(os!="ios"){
				this.$storage.setStorage('liveShowCtrl',"liveShowCtrl");
			}
			this.$http.liveShowCtrl({}, os).then(res => {
				if (res.data.success) {
					if (res.data.data.status == 1) {
						this.$storage.setStorage('liveShowCtrl',"liveShowCtrl");
					}
				}
			});
		},
		// 是否显示引导
		islaunchFlag() {
			const launchFlag = uni.getStorageSync('launchFlag');
			if (!launchFlag) {
				uni.redirectTo({
					url: '/pages/guide-page/guide-page'
				});
			}
		},
		/* app更新检测 */
		appUpdate() {
			let os = plus.os.name.toLowerCase();
			let param = {
				name: 'PIEEngine',
				system: os,
				appid: plus.runtime.appid,
				version: plus.runtime.version
			};
			this.$http.appUpdate(param).then(res => {
				res = res.data;
				if (res.code == 0) {
					let updata = res.data;
					if (updata.version == plus.runtime.version ){
						return;
					}
					if (updata.isPublish == 0 && updata.updateType == 1) {
						uni.downloadFile({
							url: updata.downloadUrl,
							success: downloadResult => {
								if (downloadResult.statusCode === 200) {
									plus.runtime.install(
										downloadResult.tempFilePath,
										{
											force: false
										},
										function() {
											console.log('install success...');
											plus.runtime.restart();
										},
										function(e) {
											console.error('install fail...');
										}
									);
								}
							}
						});
					} else if (updata.isPublish == 0 && updata.updateType == 2 && os == 'android') {
						uni.showModal({
							title: '更新提示',
							content: updata.record,
							confirmColor: '#FF9C00',
							success: function(res) {
								if (res.confirm) {
									plus.runtime.openURL(updata.downloadUrl);
								} else if (res.cancel) {
									plus.runtime.quit();
								}
							}
						});
					} else if (updata.isPublish == 0 && updata.updateType == 2 && os == 'ios') {
						uni.showModal({
							title: '更新提示',
							content: updata.record,
							confirmColor: '#FF9C00',
							success: function(res) {
								if (res.confirm) {
									plus.runtime.openURL(updata.downloadUrl);
								} else if (res.cancel) {
								}
							}
						});
					}
				}
			});
		}
	}
};
</script>

<style>
@import './common/iconfont/iconfont.css';
@import url("/components/gaoyia-parse/parse.css");

/* @font-face {
	  font-family: 'iconfont';  
	  src: url('//at.alicdn.com/t/font_2317203_dzwu81l87no.eot');
	  src: url('//at.alicdn.com/t/font_2317203_dzwu81l87no.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_2317203_dzwu81l87no.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_2317203_dzwu81l87no.woff') format('woff'),
	  url('//at.alicdn.com/t/font_2317203_dzwu81l87no.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_2317203_dzwu81l87no.svg#iconfont') format('svg');
	}
	.iconfont {
		font-family: iconfont;
		font-size: 18rpx;
	} */
#find uni-swiper .uni-swiper-dots-horizontal {
	left: auto;
	right: 20rpx;
}
</style>
