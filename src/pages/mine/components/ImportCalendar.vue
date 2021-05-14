<template>
	<view>
		<model-calendar :sendYear="toYear" :sendMonth="toMonth" :dataSource="signData" :totalNum="sumCount" @dateChange="getData"
		 @clickChange="clickSign">
		</model-calendar>
		<view class='count'>
			<text>截至目前，已坚持打卡</text>
			<view class='daynumber'>
				<text class='number'>{{sumCount}}</text>
				<text class='day'>天</text>
			</view>

			<view>本月累积打卡<text class="monthSum">{{signData.length}}</text>天</view>
			<text>请再接再厉，继续努力!</text>
		</view>
	</view>
</template>

<script>
	import modelCalendar from '@/components/Calendar/Calendar.vue';

	export default {
		data() {
			return {
				toYear: parseInt(new Date().getFullYear()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				sumCount: 0,
				signData: []
			};
		},
		components: {
			modelCalendar
		},
		created() {
			//获取当前用户当前任务的签到状态
			this.getData(this.toYear + "-" + this.toMonth);
		},
		methods: {
			clickSign(day) {
				this.$http.sign().then(res => {
					if (res.data.success) {
						uni.showToast({
							title: "签到成功",
							icon: 'none',
							duration: 2000
						});
						this.signData.push(day);
						this.sumCount++;
						setTimeout(()=>{
							this.getData(this.toYear + "-" + this.toMonth);
						},1000)
					}
				});
			},
			//当模板的时候可以直接引入，然后触发子组件事件到父界面去控制数据

			//获取当前用户该任务的签到数组
			getData(val) {
				let y = val.split('-')[0];
				let m = parseInt(val.split('-')[1])<10?"0"+parseInt(val.split('-')[1]):parseInt(val.split('-')[1]);
				let params = {
					dateTime:y+"-"+m
				}
				this.$http.getSignInfo(params).then(res => {
					if(res.data.success){
						this.sumCount = res.data.data.total // 签到总数
						let num = res.data.data.detail,
							newSign = [],
							today = new Date().getDate();
						for (let i = 0; i < num.length; i++) {
							if (parseInt(num[i]) > today) {
								break;
							}
							newSign.push(val + "-" + num[i])
						}
						console.log(newSign);//最后传给组件的格式看这里-------------
						this.signData = newSign;
					}
				})
				//this.$http.postHttp("Comment/GetRecord", {//可以通过后台接口去获取你的打卡数据
				// 	Year: y,
				// 	Month: m,
				// }, (res) => {
				//console.log(res);
				// this.sumCount = 88; //res.SumCount

				// if (y == this.toYear && m == this.toMonth) {
					//这是我造的假数据！！！
					// let num = ["2", "3", "6", "8", "12", "15"],
					// 	newSign = [],
					// 	today = new Date().getDate();
					// for (let i = 0; i < num.length; i++) {
					// 	if (parseInt(num[i]) > today) {
					// 		break;
					// 	}
					// 	newSign.push(y + "-" + m + "-" + num[i])
					// }
					
					// console.log(newSign);//最后传给组件的格式看这里-------------
					// this.signData = newSign;
				// } else {
					// console.log(1155334854)
					// this.signData = [];
				// }
				// })
			},
		}
	}
</script>

<style lang='scss'>
	.count .daynumber {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.count .daynumber .day {
		margin-top: 50rpx;
	}

	.count {
		margin: 20rpx;
		padding: 30rpx;
		display: flex;
		text-align: center;
		border-radius: 10px;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		align-items: center;
	}

	.count .number {
		color: #fff;
		font-size: 60rpx;
		background-color: #94db98;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 20rpx;
	}

	.monthSum {
		color: red;
		font-size: 40rpx;
	}

	.count text {
		margin: 10rpx;
	}
</style>
