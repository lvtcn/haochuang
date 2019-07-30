//高德地图ApiMap
const amap = require('../../static/amapwx/amap-wx.js');
const key = '6fcbaa75caeaa99437c05007bf4867ed';

Page({
    data: {
        longitude: '',
        latitude: '',
        isShow: false,
        detailStatus: false,
        status: '',
        markers: [],
        points: [],
        distance: '0',
        cost: '0',
        city: '',
        tips: {},
        polyline: [],
    },

    onLoad(option) {
        var _this = this;
        if(option.keywords != null){
            var keywords = option.keywords;
            this.setData({
                keywords: keywords,
            })
        }
        wx.showLoading({
            title: "加载中...",
            mask: true,
        })
        wx.getLocation({
            success: function (res) {
                if (res && res.longitude) {
                    _this.setData({
                        longitude: res.longitude,
                        latitude: res.latitude,
                        points: [{
                            longitude: res.longitude,
                            latitude: res.latitude
                        }],
                        markers: [{
                            id: 0,
                            longitude: res.longitude,
                            latitude: res.latitude,
                            iconPath: '../../images/map/mapicon_navi_s.png',
                            width: 24,
                            height: 34
                        }]
                    })
                }
                wx.hideLoading();
            }
        })
    },
    bindInput: function (e) {
        var _this = this;
        var keywords = e.detail.value;
        var myAmap = new amap.AMapWX({key: key});
        myAmap.getInputtips({
            keywords: keywords,
            location: '',
            success: function (res) {
                if (res && res.tips && res.tips.length !== 0) {
                    var address = res.tips[0].district;
                    _this.setData({
                        isShow: true,
                        city: address.substring(address.indexOf('省') + 1, address.indexOf('市')),
                        tips: res.tips
                    });
                }
            }
        })
    },
    bindSearch: function (e) {
        var keywords = e.target.dataset.keywords;
        var location = e.target.dataset.location;
        if (location !== "" && location !== undefined) {
            location = location.split(',');
            if (this.data.markers.length > 1 && this.data.points.length > 1) {
                this.data.markers.pop();
                this.data.points.pop();
                this.setData({polyline: []});
            }
            var markers = this.data.markers;
            var points = this.data.points;
            if (markers.length != 0 && points.length != 0) {
                markers.push({
                    id: 0,
                    longitude: location[0],
                    latitude: location[1],
                    iconPath: '../../images/map/mapicon_navi_e.png',
                    width: 24,
                    height: 34
                });
                points.push({
                    longitude: location[0],
                    latitude: location[1]
                })
            }
            this.setData({
                isShow: false,
                markers: markers,
                points: points,
                keywords: keywords,
            })
        }
        this.setData({
            isShow: false,
        })
    },
    goTo(e) {
        if (this.data.points.length < 2) {
            wx.showToast({title: '请选择地址'})
            return;
        }
        var status = e.target.dataset.status;
        var myAmap = new amap.AMapWX({key: key});
        switch (status) {
            case 'car':
                myAmap.getDrivingRoute(this.getDataObj('#86ce91'));
                break;
            case 'walk':
                myAmap.getWalkingRoute(this.getDataObj('#59bf69'));
                break;
            case 'bus':
                myAmap.getTransitRoute(this.getBusData('#65c9d6'));
                break;
            case 'ride':
                myAmap.getRidingRoute(this.getDataObj('#d45d51'));
                break;
            default:
                return;
        }
        this.setData({
            detailStatus: true,
            status: status
        })
    },
    getDataObj(color) {
        var _this = this;
        var color = color || "#0091ff";

        return {
            origin: _this.data.points[0].longitude + ',' + _this.data.points[0].latitude,
            destination: _this.data.points[1].longitude + ',' + _this.data.points[1].latitude,
            success(data) {
                var points = [];
                if (!data.paths || !data.paths[0] || !data.paths[0].steps) {
                    wx.showToast({title: '失败！'});
                    return;
                }
                if (data.paths && data.paths[0] && data.paths[0].steps) {
                    var steps = data.paths[0].steps;
                    for (var i = 0; i < steps.length; i++) {
                        var poLen = steps[i].polyline.split(';');
                        for (var j = 0; j < poLen.length; j++) {
                            points.push({
                                longitude: parseFloat(poLen[j].split(',')[0]),
                                latitude: parseFloat(poLen[j].split(',')[1])
                            })
                        }
                    }
                }
                _this.setData({
                    distance: data.paths[0].distance,
                    cost: parseInt(data.paths[0].duration / 60),
                    polyline: [{
                        points: points,
                        color: color,
                        width: 6
                    }]
                });
            },
            fail(info) {
                wx.showToast({title: '失败！'})
            }
        }
    },
    getBusData(color) {
        var _this = this;
        var color = color || "#86ce91";

        return {
            origin: _this.data.points[0].longitude + ',' + _this.data.points[0].latitude,
            destination: _this.data.points[1].longitude + ',' + _this.data.points[1].latitude,
            city: _this.data.city,
            success(data) {
                var points = [], cost = 0;
                if (data && data.transits) {
                    var transits = data.transits;
                    for (var i = 0; i < transits.length; i++) {
                        cost += parseInt(transits[i].duration);
                        var segments = transits[i].segments;
                        for (var j = 0; j < segments.length; j++) {
                            if (segments[j].bus.buslines[0] && segments[j].bus.buslines[0].polyline) {
                                var steps = segments[j].bus.buslines[0].polyline.split(';');
                                for (var k = 0; k < steps.length; k++) {
                                    var point = steps[k].split(',');
                                    points.push({
                                        longitude: point[0],
                                        latitude: point[1]
                                    })
                                    if (parseInt(point[0] * 100000) === parseInt(_this.data.points[1].longitude * 100000) && parseInt(point[1] * 100000) === parseInt(_this.data.points[1].latitude * 100000)) {
                                        _this.setData({
                                            distance: data.distance,
                                            cost: parseInt(cost / 60),
                                            polyline: [{
                                                points: points,
                                                color: color,
                                                width: 6
                                            }]
                                        });
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            },
            fail(info) {
                wx.showToast({title: '失败！'})
            }
        }
    },

    //详情页
    goDetail: function () {
        var that = this;
        var origin = that.data.points[0].longitude + ',' + that.data.points[0].latitude;
        var destination = that.data.points[1].longitude + ',' + that.data.points[1].latitude;
        if (origin != null && destination != null && that.data.status != "") {
            if(that.data.status == "bus"){
                wx.navigateTo({
                    url: './map_bus/map_bus?origin=' + origin + "&destination=" + destination + "&status=" + that.data.status
                })
            }else{
                wx.navigateTo({
                    url: './map_details/map_details?origin=' + origin + "&destination=" + destination + "&status=" + that.data.status
                })
            }
        }
    }
})