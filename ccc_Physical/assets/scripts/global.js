
//var spikedTime = [];
winsize = {};
module.exports = {
    debugDisplay: false,
    countTime: 0,//游戏运行时间
    intspikedTime: function(){
        this.spikedTime = [
            {time:5,point:{x:winsize.width,y:winsize.height*0.3},direction:"right"},
            {time:20,point:{x:winsize.width,y:winsize.height*0.5},direction:"right"},
            {time:45,point:{x:winsize.width,y:winsize.height*0.7},direction:"right"},
            {time:65,point:{x:winsize.width*0.8,y:winsize.height},direction:"top"},
            {time:85,point:{x:winsize.width*0.6,y:winsize.height},direction:"top"},
            {time:105,point:{x:winsize.width*0.4,y:winsize.height},direction:"top"},
            {time:125,point:{x:winsize.width*0.2,y:winsize.height},direction:"top"},
            {time:145,point:{x:winsize.width*0,y:winsize.height*0.7},direction:"left"},
            {time:165,point:{x:winsize.width*0,y:winsize.height*0.5},direction:"left"},
            {time:185,point:{x:winsize.width*0,y:winsize.height*0.3},direction:"left"},
            {time:205,point:{x:winsize.width*0.2,y:winsize.height*0},direction:"bottom"},
            {time:225,point:{x:winsize.width*0.4,y:winsize.height*0},direction:"bottom"},
            {time:245,point:{x:winsize.width*0.6,y:winsize.height*0},direction:"bottom"},
            {time:265,point:{x:winsize.width*0.8,y:winsize.height*0},direction:"bottom"}
        ]
    }
};
