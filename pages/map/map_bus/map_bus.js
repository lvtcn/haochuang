//高德地图ApiMap
const amap = require('../../../static/amapwx/amap-wx.js');
const key = '6fcbaa75caeaa99437c05007bf4867ed';

Page({
  data: {
    transits: [],
  },
  onLoad: function(option) {
    var that = this;
    var myAmapFun = new amap.AMapWX({key: key});
    myAmapFun.getTransitRoute({
      origin: option.origin,
      destination: option.destination,
      city: '北京',
      success: function(data){
        if(data && data.transits){
          var transits = data.transits;
          for(var i = 0; i < transits.length; i++){
            var segments = transits[i].segments;
            transits[i].transport = [];
            for(var j = 0; j < segments.length; j++){
              if(segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name){
                var name = segments[j].bus.buslines[0].name
                if(j!==0){
                  name = '--' + name;
                }
                transits[i].transport.push(name);
              }
            }
          }
        }
        that.setData({
          transits: transits
        });
          
      },
      fail: function(info){

      }
    })
  },
})