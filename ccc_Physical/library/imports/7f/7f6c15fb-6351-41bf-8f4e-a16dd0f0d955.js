'use strict';

var Physics = require('./physics');

cc.Class({
    'extends': cc.Component,

    properties: {
        space: null,
        paopao: {
            'default': [],
            type: [cc.SpriteFrame]
        },
        ponit_left: {
            'default': null,
            type: cc.Vec2
        },
        point_right: {
            'default': null,
            type: cc.Vec2
        },
        particlePreFab: {
            'default': null,
            type: cc.Prefab
        },
        weight: 0, //质量
        r: 0, //圆半径
        maxSpeed: 0, //速度
        friction: 0, //摩擦力
        elasticity: 0, //反弹力
        paopaoArr: [], //泡泡数组
        paopaoid: 0
    },
    AddPaopao: function AddPaopao() {
        //cc.log("add paopao begin %d,%d,%d",this.weight, this.r, this.maxSpeed);
        var self = this;
        var size = cc.winSize;
        var origin = cp.v(cc.random0To1() * (size.width * 0.9) + size.width * 0.1, cc.random0To1() * (size.height * 0.9) + size.height * 0.1);
        var sprite = new cc.Node().addComponent(cc.Sprite);
        sprite.spriteFrame = this.paopao[0];
        sprite.node.parent = this.node;
        sprite.node.setPosition(origin);
        sprite.node.name = '_' + this.paopaoid;
        var phyObj = new Physics.CircleObject(this.weight, this.r, this.maxSpeed, sprite, origin, 1);

        phyObj.setFriction(this.friction);
        phyObj.setElasticity(this.elasticity);
        phyObj.body.applyImpulse(cp.v(cc.random0To1() * 400 - 200, cc.random0To1() * 400 - 240), cp.v(0, 0));
        sprite.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var p = self.paopaoArr[sprite.node.name];
            if (p) {
                p.destroy = true;
            }
        });
        this.paopaoArr[sprite.node.name] = { destroy: false, sp: sprite, phy: phyObj };
        this.paopaoid++;
    },
    addCollisionHandler: function addCollisionHandler() {
        var space = Physics.world;
        // 1 & 2 检测spiked和paopao碰撞
        space.addCollisionHandler(1, 2, this.collisionBegin.bind(this), function () {}, function () {}, function () {});
    },
    collisionBegin: function collisionBegin(arbiter, space) {
        var shapes = arbiter.getShapes();
        var shapeA = shapes[0];
        var shapeB = shapes[1];
        if (shapeA.collision_type == 1) {
            var bodyA = shapeA.getBody();
            var name = bodyA.data.node.name;
            var p = this.paopaoArr[name];
            if (p) {
                p.destroy = true;
            }
        }
        if (shapeB.collision_type == 1) {
            var bodyB = shapeB.getBody();
            var name = bodyB.data.node.name;
            var p = this.paopaoArr[name];
            if (p) {
                p.destroy = true;
            }
        }
        return false;
    },
    // use this for initialization
    onLoad: function onLoad() {
        //this.AddPaopao();
        this.time = 0;
        this.addCollisionHandler();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.time += dt;
        if (this.time > 1.5) {
            this.time = 0;
            this.AddPaopao();
        }
        for (var key in this.paopaoArr) {
            var p = this.paopaoArr[key];
            if (p.destroy) {
                if (cc.isValid(p.sp.node)) {
                    var partickepaopao = cc.instantiate(this.particlePreFab);
                    this.node.addChild(partickepaopao);
                    partickepaopao.setPosition(p.sp.node.getPosition());
                    var a = partickepaopao.getPosition();
                    this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function (action, data) {
                        // console.log("destroy partickepaopao");
                        partickepaopao.removeFromParent();
                    }, this)));
                    p.sp.node.removeFromParent();
                }
                p.phy.removeSelf();
                delete this.paopaoArr[key];
            } else {
                //var p = this.paopaoArr[i].phy.getPosition();
                p.sp.node.setPosition(p.phy.getPosition());
            }
        }
    }
});