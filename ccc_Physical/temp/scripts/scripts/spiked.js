cc._RFpush(module, '9275a79uXpOorOoLvUl8pIa', 'spiked');
// scripts/spiked.js

"use strict";

var Physics = require("./physics");
var Globals = require("global");
cc.Class({
    "extends": cc.Component,

    properties: {
        spliked: {
            "default": null,
            type: cc.SpriteFrame
        },
        mess: 0, // 质量
        maxSpeed: 0
    },
    addspiked: function addspiked(info) {

        var origin = cp.v(info.point.x, info.point.y);
        var spliked = new cc.Node().addComponent(cc.Sprite);
        spliked.spriteFrame = this.spliked;
        spliked.node.parent = this.node;
        spliked.node.scaleX = 0.4;
        spliked.node.scaleY = 0.3;
        spliked.node.setPosition(origin);
        if (info.direction == 'right') {} else if (info.direction == 'top') {
            spliked.node.setRotation(-90);
        } else if (info.direction == 'left') {
            spliked.node.setRotation(180);
        } else if (info.direction == 'bottom') {
            spliked.node.setRotation(90);
        }
        var bbox = spliked.node.getBoundingBox();
        var phyObj = new Physics.PhysicsObject(this.mess, { width: bbox.width, height: bbox.height }, this.maxSpeed, spliked, origin, 2);
        phyObj.setFriction(this.friction);
        phyObj.setElasticity(this.elasticity);
        //phyObj.body.applyImpulse(cp.v(200,200), cp.v(0,0));
    },
    // use this for initialization
    onLoad: function onLoad() {},
    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        var st = Globals.spikedTime;
        if (st.length > 0) {
            if (st[0].time < Globals.countTime) {
                //console.log(st[0]);
                var info = st.shift();
                this.addspiked(info);
            }
        }
    }
});

cc._RFpop();