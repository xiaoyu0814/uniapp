/* 该文件已全局引入，无需每个界面在引入 */
import http from './config';

const port = {
	piecloud: 'https://piecloud.piesat.cn', //本地域名
	cloud: 'https://cloud.piesat.cn', //华为域名
	engine: 'https://engine.piesat.cn'
}
let csops = port.engine + '/api/v1'
let user = port.engine + '/user/behavior/api/v1'
let loginCheck = port.engine + '/dev/account/api' //登录接口
let engine = port.engine //登录接口

const test = (data) => {
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
		url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
		data,
	})
}

/* 
	个人头像上传 
	作者：wux
*/
const setHeadPortrait = http.config.baseUrl + '/user/setHeadPortrait';

/* 
	评论图片上传 
	作者：wux
*/
const addOrderEvaluateImg = http.config.baseUrl + '/order/addOrderEvaluateImg';

/* 
	获取信息(相关规则)
	作者：wux
	informationType：客服电话0， 竞拍规则1， 福豆规则2， 福利说明3， 抽奖规则4， 邀请规则5
*/
const getInformation = (data) => {
	return http.request({
		url: '/user/getInformation',
		method: 'post',
		data,
	})
}


/* 
	获取竞拍页导航栏目
	author：xueyf
	token 用户标识
*/
const getBiddingTab = (data) => {
	return http.request({
		url: '/user/getNavigationLabel',
		method: 'post',
		data
	})
}

/* 
 *@mazy获取当前的竞拍信息
 * 传值：
 *activityId：活动id
 * currentPrice：当前价
 * token：用户token
 */

const getBiddingInfo = (data) => {
	return http.request({
		url: '/auction/getActivityAuction',
		method: 'post',
		data
	})
}
/*@mazy 
 *一点豆竞拍 
 * token：用户token
 * activityId：活动id
 * eachIncrease：单次消耗福豆数	
 *type
 */
const auctionProcess = (data) => {
	return http.request({
		url: '/auction/auctionProcess',
		method: 'post',
		data
	})
}

/* 
	委托竞拍
	author：xueyf
	token：用户标识
	activityId：活动id
	entrustTimes：委托竞购次数
	type：请求步骤类型
*/
const entrustAuction = (data) => {
	return http.request({
		url: '/auction/entrustAuction',
		method: 'post',
		data
	})
}

/* 
	取消委托
	author：xueyf
	token：用户标识
	activityId：活动id
*/
const cancelDelegate = (data) => {
	return http.request({
		url: '/auction/cancelEntrustAuction',
		method: 'post',
		data
	})
}

/* 
	追加委托
	author：xueyf
	token：用户标识
	activityId：活动id
	entrustTimes：委托竞购次数
	type：请求步骤类型
*/
const additionalCommissioned = (data) => {
	return http.request({
		url: '/auction/appendEntrustAuction',
		method: 'post',
		data
	})
}

/* 
	删除订单
	author：xueyf
	token：用户标识
	orderId：订单id
*/
const setOrderDelStatus = (data) => {
	return http.request({
		url: '/order/setOrderDelStatus',
		method: 'post',
		data
	})
}





// 用户名密码登陆
const userLogin = (data) => {
	return http.request({
		baseUrl: loginCheck,
		url: '/auth/login',
		method: 'get',
		data
	})
}
// 手机号获取验证码
const getCodeByTel = (data) => {
	return http.request({
		baseUrl: loginCheck,
		url: '/auth/getCodeByTel',
		method: 'get',
		data
	})
}
// 检测手机号和验证码是否正确
const checkTelWithCode = (data) => {
	return http.request({
		baseUrl: loginCheck,
		url: '/auth/checkTelWithCode',
		method: 'get',
		data
	})
}
// 确认密码
const regist = (data) => {
	return http.request({
		baseUrl: loginCheck,
		url: '/auth/regist',
		method: 'post',
		data
	})
}
// 检测手机号是否注册
const checkExists = (data) => {
	return http.request({
		baseUrl: loginCheck,
		url: '/auth/checkExists',
		method: 'get',
		data
	})
}
// 手机号登陆
const loginByTel = (data) => {
	return http.request({
		baseUrl: loginCheck,
		url: '/auth/loginByTel',
		method: 'get',
		data
	})
}
// 手机号重置密码
const updatePwdByTel = (data) => {
	return http.request({
		baseUrl: loginCheck,
		url: '/sys/user/updatePwdByTel',
		method: 'post',
		data
	})
}

//查询我的信息
const queryUserByToken = (data) => {
	return http.request({
		baseUrl: loginCheck,
		url: '/sys/user/queryUserByToken',
		method: 'get',
		data
	})
}
//签到
const sign = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/sign',
		method: 'get',
		data
	})
}
//判断当天是否签到(true表示已经签到)
const checkSign = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/sign/checkSign',
		method: 'get',
		data
	})
}

// 获取资讯接口
const getIndexInfo = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/news/getInfo',
		method: 'get',
		data
	})
}
// 根据id获取资讯接口
const queryDetailsById = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/news/newsInfoById',
		method: 'get',
		data
	})
}
// 更新个人信息
const updateUser = (data) => {
	return http.request({
		baseUrl: loginCheck,
		url: '/sys/user/updateUser',
		method: 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data
	})
}
// 退出登录
const logout = (data) => {
	return http.request({
		baseUrl: loginCheck,
		url: '/auth/logout',
		method: 'get',
		data
	})
}
// 获取轮播图列表(用户客户端查询使用)
const clientBannerList = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/banner/clientBannerList',
		method: 'get',
		data
	})
}
// 收藏
const likeCollection = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/news/thumbup',
		method: 'post',
		data
	})
}
//获得收藏列表
const getCollection = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/news/collection',
		method: 'get',
		data
	})
}
//获得推荐列表
const getChangeBatch = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/news/changeBatch',
		method: 'get',
		data
	})
}

// 获取签到记录
const getSignInfo = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/sign/info',
		method: 'get',
		data
	})
}
//获得消息列表
const queryClientMessage = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/message/queryClientMessage',
		method: 'get',
		data
	})
}
// 查询活动列表(后台管理界面使用)
const getActivityList = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/activity/list',
		method: 'get',
		data
	})
}
// 根据Id获取轮播图数据
const bannerById = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/banner/bannerById',
		method: 'get',
		data
	})
}
// 查询用户资源详情
const details = (data) => {
	return http.request({
		baseUrl: engine,
		url: '/v1resource/user_resource/details',
		method: 'get',
		data
	})
}
// 根据Id获得消息详情
const queryPublicMessageById = (data) => {
	return http.request({
		baseUrl: csops,
		url: '/csops/message/queryPublicMessageById',
		method: 'get',
		data
	})
}
// 查询用户积分
const credits = (data) => {
	return http.request({
		baseUrl: engine,
		url: '/v1bonus/users/credits',
		method: 'get',
		data
	})
}
// app版本更新
const appUpdate = (data) => {
	return http.request({
		baseUrl:csops,
		url: '/software/app/lastinfo',
		method: 'get',
		data
	})
}
//创建显隐控制
const liveShowCtrl = (data,os) => {
	return http.request({
		baseUrl:csops,
		url: `/csops/liveShowCtrl/query/${os}`,
		method: 'get',
		data
	})
}

export default {
	liveShowCtrl,
	queryDetailsById,
	getIndexInfo,
	appUpdate,
	userLogin,
	getCodeByTel,
	checkTelWithCode,
	regist,
	checkExists,
	loginByTel,
	updatePwdByTel,
	queryUserByToken,
	sign,
	checkSign,
	logout,
	updateUser,
	clientBannerList,
	likeCollection,
	getCollection,
	getChangeBatch,
	getSignInfo,
	getActivityList,
	queryClientMessage,
	bannerById,
	details,
	credits,
	queryPublicMessageById
}
