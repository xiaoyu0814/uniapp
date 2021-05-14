/*
 * @Author: hecheng
 * @Date: 2019-10-10 13:25:27
 * @Last Modified by: hecheng
 * @Last Modified time: 2019-10-11 12:08:13
 */

/**
 *
 *
 * @class mapEditor
 */
class mapEditor {
	constructor(map, dtName, layerId = 'route') {
		this.map = map
		this.drawId = ''
		this.action = ''
		this.dtName = dtName
		this.layerId = layerId
		this.changId = ''
		this.addEvent = null
		let _this = this
		this.Draw = new MapboxDraw({
			displayControlsDefault: false
		})
		map.addControl(this.Draw)
		map.on('draw.update', function(params) {
			let data = {
				datasetId: _this.getDataId(),
				projectCode: 3857,
				updateCondition: {
					_id: _this.changId
				},
				updateSetValue: { geometry: params.features[0].geometry }
			}
			_this.ajaxRequest('http://piecloud.piesat.cn/api/v1/mongo/feature/update', data, 'post').then((res) => {
				_this.map.getSource(_this.layerId).refresh()
			})
		})
		this.map.on('click', function(e) {
			if (_this.action != 'simple_select') return
			let { lng, lat } = e.lngLat
			let data = {
				lon: lng,
				lat,
				projectionCode: 3857,
				type: _this.getDataId(),
				output: 'geojson'
			}
			_this
				.ajaxRequest('http://piecloud.piesat.cn/geographic_search/v1/geocode/point/query_intersects', data, 'get')
				.then((res) => {
					console.log(res)
					_this.addFeature(res)
					console.log(_this.Draw.getSelectedIds())
					if (res.features.filter((item) => _this.Draw.getSelectedIds().indexOf(item.id) > -1).length > 0)
						return
					_this.Draw.changeMode(_this.action)
				})
		})
	}
	getDataId() {
		let name = this.dtName
		return name
	}
	drawCreateAjax(e) {
		let data = this.Draw.getAll()
		data.datasetId = this.drawId
		data.projectCode = 3857
		let _this = this
		this.ajaxRequest('http://piecloud.piesat.cn/api/v1/mongo/feature/add', data, 'post').then((res) => {
			_this.Draw.changeMode(_this.action)
			_this.Draw.delete(data.features[0].id)
			_this.map.getSource(_this.layerId).refresh()
		})
	}
	setAction(drawmode) {
		if (!drawmode || drawmode == this.action) return
		this.action = drawmode
		this.Draw.deleteAll()
		this.Draw.changeMode(this.action)
		this.drawCreate()
	}
	drawCreate() {
		let _this = this
		if (this.addEvent) return
		this.map.on('draw.create', function(params) {
			_this.drawId = _this.getDataId()
			_this.drawCreateAjax()
			_this.addEvent = true
		})
	}

	addFeature(feature) {
		this.Draw.add(feature)
		if (feature.features.length > 0) {
			this.changId = feature.features[0].id
		}
	}

	ajaxRequest(url, data = {}, action) {
		return new Promise(function(resolve) {
			let xhr = new XMLHttpRequest()
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						var res = xhr.response
						let data = JSON.parse(res).data
						resolve(data)
					}
				}
			}

			let parms = ''
			if (action == 'get') {
				let dataKey = Object.keys(data)
				dataKey.map((v) => {
					parms += `${v}=${data[v]}&`
				})
				url += '?' + parms.substring(0, parms.length - 1)
			}
			parms = action == 'post' ? JSON.stringify(data) : ''
			xhr.open(action, url, true)
			xhr.setRequestHeader('content-type', 'application/json')
			xhr.send(parms)
		})
	}

	getSelectedIds() {
		return this.Draw.getSelectedIds()
	}

	getSelected() {
		return this.Draw.getSelected()
	}

	refresh() {
		return this.map.getSource(this.layerId).refresh()
	}

	delete(featureIds) {
		console.log(featureIds)
		return this.Draw.delete(featureIds)
	}

	getSelectedPoints() {
		return this.Draw.getSelectedPoints()
	}

	getMode() {
		return this.Draw.getMode()
	}

	trash() {
		return this.Draw.trash()
	}

	deleteAll() {
		return this.Draw.deleteAll()
	}
}
