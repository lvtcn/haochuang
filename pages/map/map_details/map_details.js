//高德地图ApiMap
const amap = require('../../../static/amapwx/amap-wx.js');
const key = '6fcbaa75caeaa99437c05007bf4867ed';

Page({
    data: {
        steps: {}
    },
    onLoad: function (option) {
        var that = this;
        var status = option.status;
        var myAmapFun = new amap.AMapWX({key: key});
        //getDrivingRoute 驾车
        //getWalkingRoute 步行
        //getRidingRoute 骑行
        console.log(option);
        if(option.status != null){
            var getFunRoute = "getDrivingRoute";

            if(status == "car"){
                getFunRoute = "getDrivingRoute";
            } else  if(status == "walk"){
                getFunRoute = "getWalkingRoute";
            } else  if(status == "ride"){
                getFunRoute = "getRidingRoute";
            }
            myAmapFun[getFunRoute]({
                origin: option.origin,
                destination: option.destination,
                success: function (data) {
                    if (data.paths && data.paths[0] && data.paths[0].steps) {
                        that.setData({
                            steps: data.paths[0].steps
                        });
                    }
                },
                fail: function (info) {

                }
            })
        }
    }
})