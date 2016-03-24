require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"PhysicTable":[function(require,module,exports){
cc._RFpush(module, 'b10e6Wa/cZANY72Wlf9O0Uz', 'PhysicTable');
// scripts/PhysicTable.js

'use strict';

var Physics = require('./physics');
var Globlas = require('./global');
cc.Class({
    'extends': cc.Component,

    properties: {
        canvas: {
            'default': null,
            type: cc.Node
        },
        space: {
            'default': null,
            visible: false
        },
        debugNode: {
            'default': null,
            visible: false
        },
        leftWall: {
            'default': null,
            visible: false
        },
        rightWall: {
            'default': null,
            visible: false
        },
        topWall: {
            'default': null,
            visible: false
        },
        bottomWall: {
            'default': null,
            visible: false
        }
    },

    createPhysicsWorld: function createPhysicsWorld() {
        Physics.init(cc.director.getRunningScene());
        this.space = Physics.world;
        // Gravity
        this.space.gravity = cp.v(0, 0);
        //this.space.sleepTimeThreshold = 3.5;
        var WallW = 2;
        var WallElasticity = 2;
        var WallFriction = 0;

        var w = this.canvas.width,
            h = this.canvas.height;
        this.leftWall = new Physics.StaticObject(0, 0, WallW, h, null);
        this.leftWall.shape.setCollisionType(3);

        this.topWall = new Physics.StaticObject(0, h - WallW, w, WallW, null);
        this.topWall.shape.setCollisionType(3);

        this.rightWall = new Physics.StaticObject(w - WallW, 0, WallW, h, null);
        this.rightWall.shape.setCollisionType(3);

        this.bottomWall = new Physics.StaticObject(0, 0, w, WallW, null);
        this.bottomWall.shape.setCollisionType(3);

        this.leftWall.setElasticity(WallElasticity);
        this.leftWall.setFriction(WallFriction);
        this.topWall.setElasticity(WallElasticity);
        this.topWall.setFriction(WallFriction);
        this.rightWall.setElasticity(WallElasticity);
        this.rightWall.setFriction(WallFriction);
        this.bottomWall.setElasticity(WallElasticity);
        this.bottomWall.setFriction(WallFriction);

        this.space.addCollisionHandler(2, 3, this.collisionBegin.bind(this), function () {}, function () {}, function () {});
        this.space.addCollisionHandler(2, 2, this.collisionBegin.bind(this), function () {}, function () {}, function () {});
    },
    collisionBegin: function collisionBegin(arbiter, space) {
        return false;
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.createPhysicsWorld();
        if (Globlas.debugDisplay) {
            this.setupDebugNode();
        }
        var ws = cc.director.getWinSize();
        winsize = ws;
        Globlas.intspikedTime();
    },

    setupDebugNode: function setupDebugNode() {
        this.debugNode = cc.PhysicsDebugNode.create(this.space);
        this.debugNode.visible = true;

        var parent = this.node;
        this.debugNode.setPosition(-parent.width / 2, -parent.height / 2);
        parent._sgNode.addChild(this.debugNode, 100);
    },

    // called every frame
    update: function update(dt) {
        Physics.update(dt);
        Globlas.countTime += dt;
    }
});

cc._RFpop();
},{"./global":"global","./physics":"physics"}],"game":[function(require,module,exports){
cc._RFpush(module, '9d9d8NxAnBH0rtp/EzizDw2', 'game');
// scripts/game.js

"use strict";

var global = require("global");
cc.Class({
    "extends": cc.Component,

    properties: {
        paopao: {
            "default": null,
            type: cc.Node
        },
        assetMng: {
            "default": null,
            type: cc.Node
        },
        audioMng: {
            "default": null,
            type: cc.Node
        },
        spiked: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {}
});

cc._RFpop();
},{"global":"global"}],"global":[function(require,module,exports){
cc._RFpush(module, '9ec1dTmA5lOaLPfJf57rJNu', 'global');
// scripts/global.js


//var spikedTime = [];
"use strict";

winsize = {};
module.exports = {
    debugDisplay: false,
    countTime: 0, //游戏运行时间
    intspikedTime: function intspikedTime() {
        this.spikedTime = [{ time: 5, point: { x: winsize.width, y: winsize.height * 0.3 }, direction: "right" }, { time: 20, point: { x: winsize.width, y: winsize.height * 0.5 }, direction: "right" }, { time: 45, point: { x: winsize.width, y: winsize.height * 0.7 }, direction: "right" }, { time: 65, point: { x: winsize.width * 0.8, y: winsize.height }, direction: "top" }, { time: 85, point: { x: winsize.width * 0.6, y: winsize.height }, direction: "top" }, { time: 105, point: { x: winsize.width * 0.4, y: winsize.height }, direction: "top" }, { time: 125, point: { x: winsize.width * 0.2, y: winsize.height }, direction: "top" }, { time: 145, point: { x: winsize.width * 0, y: winsize.height * 0.7 }, direction: "left" }, { time: 165, point: { x: winsize.width * 0, y: winsize.height * 0.5 }, direction: "left" }, { time: 185, point: { x: winsize.width * 0, y: winsize.height * 0.3 }, direction: "left" }, { time: 205, point: { x: winsize.width * 0.2, y: winsize.height * 0 }, direction: "bottom" }, { time: 225, point: { x: winsize.width * 0.4, y: winsize.height * 0 }, direction: "bottom" }, { time: 245, point: { x: winsize.width * 0.6, y: winsize.height * 0 }, direction: "bottom" }, { time: 265, point: { x: winsize.width * 0.8, y: winsize.height * 0 }, direction: "bottom" }];
    }
};

cc._RFpop();
},{}],"paopao":[function(require,module,exports){
cc._RFpush(module, '7f6c1X7Y1FBv49OoW3Q8NlV', 'paopao');
// scripts/paopao.js

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

cc._RFpop();
},{"./physics":"physics"}],"physics":[function(require,module,exports){
cc._RFpush(module, 'c4f16dXO/FAz5SpS6rIVWrn', 'physics');
// scripts/physics.js

"use strict";

var CPSTEP = 1 / 60;
var Physics = {
    world: null,
    scene: null,
    inited: null,
    handlers: [],
    shapes: [],
    bodies: [],

    calculVector: function calculVector(a) {
        /*var s = a.a, d = a.b;
         var cs = cc.p((s.bb_b+s.bb_t)/2, (s.bb_l+s.bb_r)/2);
         var cd = cc.p((d.bb_b+d.bb_t)/2, (d.bb_l+d.bb_r)/2);
         */
        var n = a.getNormal(0);
        var v = cc.p(n.x, -n.y);
        return v;
    },
    calculAngle: function calculAngle(a) {
        return cc.pToAngle(this.calculVector(a));
    },

    init: function init(scene) {
        this.scene = scene;
        if (this.inited) return;

        this.world = null;
        this.world = new cp.Space();
        //space.iterations = 60;
        //space.sleepTimeThreshold = 0.5;
        // space.damping = 1;
        // Gravity:
        //this.world.gravity = cp.v(0,-1200);//重力
        //  space.collisionSlop = 0.5;
        var emptyFunction = function emptyFunction() {
            return true;
        };
        this.inited = true;
    },
    update: function update(dt) {
        if (this.inited) this.world.step(dt);
    },
    addCollisionHandler: function addCollisionHandler(a, b, begin, preSolve, postSolve, separate) {
        if (this.inited) {
            this.world.addCollisionHandler(a, b, begin, preSolve, postSolve, separate);
            this.handlers.push([a, b]);
        }
    },
    registerShape: function registerShape(shape) {
        Physics.shapes.push(shape);
    },
    registerBody: function registerBody(body) {
        Physics.bodies.push(body);
    },

    _realClear: function _realClear() {
        if (this.inited) {
            var space = this.world,
                handler,
                shape,
                body;
            // Remove handlers
            for (var i = this.handlers.length - 1; i >= 0; --i) {
                handler = this.handlers[i];
                space.removeCollisionHandler(handler[0], handler[1]);
            }
            this.handlers = [];

            // Remove shapes
            for (var i = this.shapes.length - 1; i >= 0; --i) {
                shape = this.shapes[i];
                if (!space.containsShape(shape)) continue;
                if (shape.body.isStatic()) space.removeStaticShape(shape);else space.removeShape(shape);
            }
            this.shapes = [];

            // Remove bodies
            for (var i = this.bodies.length - 1; i >= 0; --i) {
                body = this.bodies[i];
                if (!space.containsBody(body)) continue;
                space.removeBody(body);
            }
            this.bodies = [];
        }
    },
    clear: function clear() {
        var space = this.world;
        if (space) {
            space.eachShape(this.registerShape);
            space.eachBody(this.registerBody);
            if (space.isLocked()) space.addPostStepCallback(this._realClear.bind(this));else this._realClear();
        }
    },

    StaticObject: null,
    StaticPolyObject: null,
    StaticSensor: null,
    DynamicSensor: null,
    PhysicsObject: null,
    CircleObject: null
};
Physics.StaticObject = cc._Class.extend({
    view: null,
    shape: null,

    ctor: function ctor(x, y, width, height, view) {
        var box = {};
        box.l = x;
        box.r = x + width;
        box.t = y + height;
        box.b = y;
        this.shape = new cp.BoxShape2(Physics.world.staticBody, box);
        Physics.world.addShape(this.shape);
        this.shape.obj = this;
        this.view = view;
    },

    setFriction: function setFriction(u) {
        this.shape.setFriction(u);
    },

    setElasticity: function setElasticity(e) {
        this.shape.setElasticity(e);
    },

    removeSelf: function removeSelf() {
        Physics.world.removeStaticShape(this.shape);
    }
});
Physics.StaticPolyObject = cc._Class.extend({
    view: null,
    shape: null,
    ctor: function ctor(view, verts, offset) {
        this.shape = new cp.PolyShape(Physics.world.staticBody, verts, offset || cp.v(0, 0));
        Physics.world.addShape(this.shape);
        this.shape.obj = this;
        this.view = view;
    },

    setFriction: function setFriction(u) {
        this.shape.setFriction(u);
    },

    setElasticity: function setElasticity(e) {
        this.shape.setElasticity(e);
    },

    removeSelf: function removeSelf() {
        Physics.world.removeStaticShape(this.shape);
    }
});

Physics.StaticSensor = cc._Class.extend({
    view: null,
    shape: null,

    ctor: function ctor(x, y, width, height, view) {
        this.shape = new cp.SegmentShape(Physics.world.staticBody, cp.v(x, y + height), cp.v(x + width, y + height), 5);
        this.shape.setSensor(true);
        Physics.world.addShape(this.shape);
        this.shape.obj = this;
        this.view = view;
    },

    removeSelf: function removeSelf() {
        Physics.world.removeStaticShape(this.shape);
    }
});
Physics.DynamicSensor = cc._Class.extend({
    body: null,
    shape: null,
    view: null,

    ctor: function ctor(x, y, width, height, view) {
        this.body = new cp.Body(1, cp.momentForBox(1, width, height));
        this.body.setPos(cp.v(x, y));
        this.shape = new cp.BoxShape(this.body, width, height);
        this.shape.setSensor(true);
        Physics.world.addShape(this.shape);
        this.shape.obj = this;
        this.view = view;
    },

    removeSelf: function removeSelf() {
        Physics.world.removeShape(this.shape);
        Physics.world.removeBody(this.body);
    }
});
Physics.PhysicsObject = cc._Class.extend({
    body: null,
    shape: null,
    type: null,
    view: null,

    ctor: function ctor(weight, size, maxSpeed, view, pos, shapeType) {

        this.body = new cp.Body(weight, cp.momentForBox(weight, size.width, size.height));
        this.body.data = view;
        this.shape = new cp.BoxShape(this.body, size.width, size.height);
        this.shape.setCollisionType(shapeType);
        Physics.world.addShape(this.shape);
        Physics.world.addBody(this.body);
        this.setMaxSpeed(maxSpeed);
        this.setView(view);
        if (pos) {
            this.setPosition(pos);
        }
        this.shape.obj = this;
    },
    setPosition: function setPosition(pos) {
        this.body.setPos(pos);
    },
    //move towards a direction
    move: function move(direction, force) {
        var v = cc.p(force, 0);
        var impulse = cc.pRotateByAngle(v, cc.p(0, 0), cc.degreesToRadians(direction));
        this.body.applyImpulse(impulse, cp.v(0, 0));
    },
    //move towards a point, regardless of where i am
    targetMove: function targetMove(point, force) {
        var v = cc.p(force, 0);
        var angle = cc.pToAngle(cc.pSub(point, this.body.p));
        var impulse = cc.pRotateByAngle(v, cc.p(0, 0), angle);
        this.body.applyImpulse(impulse, cp.v(0, 0));
    },
    setMaxSpeed: function setMaxSpeed(maxSpeed) {
        this.body.v_limit = maxSpeed;
    },
    getPosition: function getPosition() {
        return this.body.p;
    },
    //so shape can find its parent object
    setView: function setView(v) {
        this.view = v;
    },

    setFriction: function setFriction(u) {
        this.shape.setFriction(u);
    },

    setElasticity: function setElasticity(e) {
        this.shape.setElasticity(e);
    },

    removeSelf: function removeSelf() {
        Physics.world.removeShape(this.shape);
        Physics.world.removeBody(this.body);
    }
});

Physics.CircleObject = cc._Class.extend({
    body: null,
    shape: null,
    type: null,
    view: null,
    ctor: function ctor(weight, r, maxSpeed, view, pos, shapeType) {

        this.body = new cp.Body(weight, cp.momentForCircle(weight, 0, r, cp.v(0, 0)));
        this.body.data = view;
        this.shape = new cp.CircleShape(this.body, r, cp.v(0, 0));
        this.shape.setCollisionType(shapeType);
        Physics.world.addShape(this.shape);
        Physics.world.addBody(this.body);
        this.setMaxSpeed(maxSpeed);
        this.setView(view);
        if (pos) {
            this.setPosition(pos);
        }
        this.shape.obj = this;
    },
    setPosition: function setPosition(pos) {
        this.body.setPos(pos);
    },
    setMaxSpeed: function setMaxSpeed(maxSpeed) {
        this.body.v_limit = maxSpeed;
    },
    getPosition: function getPosition() {
        return this.body.p;
    },
    //so shape can find its parent object
    setView: function setView(v) {
        this.view = v;
    },

    setFriction: function setFriction(u) {
        this.shape.setFriction(u);
    },

    setElasticity: function setElasticity(e) {
        this.shape.setElasticity(e);
    },

    removeSelf: function removeSelf() {
        Physics.world.removeShape(this.shape);
        Physics.world.removeBody(this.body);
    }
});

module.exports = Physics;

cc._RFpop();
},{}],"spiked":[function(require,module,exports){
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
},{"./physics":"physics","global":"global"}]},{},["paopao","spiked","game","global","PhysicTable","physics"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2NyaXB0cy9QaHlzaWNUYWJsZS5qcyIsInNjcmlwdHMvZ2FtZS5qcyIsInNjcmlwdHMvZ2xvYmFsLmpzIiwic2NyaXB0cy9wYW9wYW8uanMiLCJzY3JpcHRzL3BoeXNpY3MuanMiLCJzY3JpcHRzL3NwaWtlZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNjLl9SRnB1c2gobW9kdWxlLCAnYjEwZTZXYS9jWkFOWTcyV2xmOU8wVXonLCAnUGh5c2ljVGFibGUnKTtcbi8vIHNjcmlwdHMvUGh5c2ljVGFibGUuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUGh5c2ljcyA9IHJlcXVpcmUoJy4vcGh5c2ljcycpO1xudmFyIEdsb2JsYXMgPSByZXF1aXJlKCcuL2dsb2JhbCcpO1xuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBjYW52YXM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgc3BhY2U6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIGRlYnVnTm9kZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgbGVmdFdhbGw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHJpZ2h0V2FsbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgdG9wV2FsbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tV2FsbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVQaHlzaWNzV29ybGQ6IGZ1bmN0aW9uIGNyZWF0ZVBoeXNpY3NXb3JsZCgpIHtcbiAgICAgICAgUGh5c2ljcy5pbml0KGNjLmRpcmVjdG9yLmdldFJ1bm5pbmdTY2VuZSgpKTtcbiAgICAgICAgdGhpcy5zcGFjZSA9IFBoeXNpY3Mud29ybGQ7XG4gICAgICAgIC8vIEdyYXZpdHlcbiAgICAgICAgdGhpcy5zcGFjZS5ncmF2aXR5ID0gY3AudigwLCAwKTtcbiAgICAgICAgLy90aGlzLnNwYWNlLnNsZWVwVGltZVRocmVzaG9sZCA9IDMuNTtcbiAgICAgICAgdmFyIFdhbGxXID0gMjtcbiAgICAgICAgdmFyIFdhbGxFbGFzdGljaXR5ID0gMjtcbiAgICAgICAgdmFyIFdhbGxGcmljdGlvbiA9IDA7XG5cbiAgICAgICAgdmFyIHcgPSB0aGlzLmNhbnZhcy53aWR0aCxcbiAgICAgICAgICAgIGggPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMubGVmdFdhbGwgPSBuZXcgUGh5c2ljcy5TdGF0aWNPYmplY3QoMCwgMCwgV2FsbFcsIGgsIG51bGwpO1xuICAgICAgICB0aGlzLmxlZnRXYWxsLnNoYXBlLnNldENvbGxpc2lvblR5cGUoMyk7XG5cbiAgICAgICAgdGhpcy50b3BXYWxsID0gbmV3IFBoeXNpY3MuU3RhdGljT2JqZWN0KDAsIGggLSBXYWxsVywgdywgV2FsbFcsIG51bGwpO1xuICAgICAgICB0aGlzLnRvcFdhbGwuc2hhcGUuc2V0Q29sbGlzaW9uVHlwZSgzKTtcblxuICAgICAgICB0aGlzLnJpZ2h0V2FsbCA9IG5ldyBQaHlzaWNzLlN0YXRpY09iamVjdCh3IC0gV2FsbFcsIDAsIFdhbGxXLCBoLCBudWxsKTtcbiAgICAgICAgdGhpcy5yaWdodFdhbGwuc2hhcGUuc2V0Q29sbGlzaW9uVHlwZSgzKTtcblxuICAgICAgICB0aGlzLmJvdHRvbVdhbGwgPSBuZXcgUGh5c2ljcy5TdGF0aWNPYmplY3QoMCwgMCwgdywgV2FsbFcsIG51bGwpO1xuICAgICAgICB0aGlzLmJvdHRvbVdhbGwuc2hhcGUuc2V0Q29sbGlzaW9uVHlwZSgzKTtcblxuICAgICAgICB0aGlzLmxlZnRXYWxsLnNldEVsYXN0aWNpdHkoV2FsbEVsYXN0aWNpdHkpO1xuICAgICAgICB0aGlzLmxlZnRXYWxsLnNldEZyaWN0aW9uKFdhbGxGcmljdGlvbik7XG4gICAgICAgIHRoaXMudG9wV2FsbC5zZXRFbGFzdGljaXR5KFdhbGxFbGFzdGljaXR5KTtcbiAgICAgICAgdGhpcy50b3BXYWxsLnNldEZyaWN0aW9uKFdhbGxGcmljdGlvbik7XG4gICAgICAgIHRoaXMucmlnaHRXYWxsLnNldEVsYXN0aWNpdHkoV2FsbEVsYXN0aWNpdHkpO1xuICAgICAgICB0aGlzLnJpZ2h0V2FsbC5zZXRGcmljdGlvbihXYWxsRnJpY3Rpb24pO1xuICAgICAgICB0aGlzLmJvdHRvbVdhbGwuc2V0RWxhc3RpY2l0eShXYWxsRWxhc3RpY2l0eSk7XG4gICAgICAgIHRoaXMuYm90dG9tV2FsbC5zZXRGcmljdGlvbihXYWxsRnJpY3Rpb24pO1xuXG4gICAgICAgIHRoaXMuc3BhY2UuYWRkQ29sbGlzaW9uSGFuZGxlcigyLCAzLCB0aGlzLmNvbGxpc2lvbkJlZ2luLmJpbmQodGhpcyksIGZ1bmN0aW9uICgpIHt9LCBmdW5jdGlvbiAoKSB7fSwgZnVuY3Rpb24gKCkge30pO1xuICAgICAgICB0aGlzLnNwYWNlLmFkZENvbGxpc2lvbkhhbmRsZXIoMiwgMiwgdGhpcy5jb2xsaXNpb25CZWdpbi5iaW5kKHRoaXMpLCBmdW5jdGlvbiAoKSB7fSwgZnVuY3Rpb24gKCkge30sIGZ1bmN0aW9uICgpIHt9KTtcbiAgICB9LFxuICAgIGNvbGxpc2lvbkJlZ2luOiBmdW5jdGlvbiBjb2xsaXNpb25CZWdpbihhcmJpdGVyLCBzcGFjZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVBoeXNpY3NXb3JsZCgpO1xuICAgICAgICBpZiAoR2xvYmxhcy5kZWJ1Z0Rpc3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBEZWJ1Z05vZGUoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd3MgPSBjYy5kaXJlY3Rvci5nZXRXaW5TaXplKCk7XG4gICAgICAgIHdpbnNpemUgPSB3cztcbiAgICAgICAgR2xvYmxhcy5pbnRzcGlrZWRUaW1lKCk7XG4gICAgfSxcblxuICAgIHNldHVwRGVidWdOb2RlOiBmdW5jdGlvbiBzZXR1cERlYnVnTm9kZSgpIHtcbiAgICAgICAgdGhpcy5kZWJ1Z05vZGUgPSBjYy5QaHlzaWNzRGVidWdOb2RlLmNyZWF0ZSh0aGlzLnNwYWNlKTtcbiAgICAgICAgdGhpcy5kZWJ1Z05vZGUudmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5kZWJ1Z05vZGUuc2V0UG9zaXRpb24oLXBhcmVudC53aWR0aCAvIDIsIC1wYXJlbnQuaGVpZ2h0IC8gMik7XG4gICAgICAgIHBhcmVudC5fc2dOb2RlLmFkZENoaWxkKHRoaXMuZGVidWdOb2RlLCAxMDApO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICBQaHlzaWNzLnVwZGF0ZShkdCk7XG4gICAgICAgIEdsb2JsYXMuY291bnRUaW1lICs9IGR0O1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzlkOWQ4TnhBbkJIMHJ0cC9Feml6RHcyJywgJ2dhbWUnKTtcbi8vIHNjcmlwdHMvZ2FtZS5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGdsb2JhbCA9IHJlcXVpcmUoXCJnbG9iYWxcIik7XG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcGFvcGFvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYXNzZXRNbmc6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBhdWRpb01uZzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIHNwaWtlZDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHt9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICc5ZWMxZFRtQTVsT2FMUGZKZjU3ckpOdScsICdnbG9iYWwnKTtcbi8vIHNjcmlwdHMvZ2xvYmFsLmpzXG5cblxuLy92YXIgc3Bpa2VkVGltZSA9IFtdO1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbndpbnNpemUgPSB7fTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlYnVnRGlzcGxheTogZmFsc2UsXG4gICAgY291bnRUaW1lOiAwLCAvL+a4uOaIj+i/kOihjOaXtumXtFxuICAgIGludHNwaWtlZFRpbWU6IGZ1bmN0aW9uIGludHNwaWtlZFRpbWUoKSB7XG4gICAgICAgIHRoaXMuc3Bpa2VkVGltZSA9IFt7IHRpbWU6IDUsIHBvaW50OiB7IHg6IHdpbnNpemUud2lkdGgsIHk6IHdpbnNpemUuaGVpZ2h0ICogMC4zIH0sIGRpcmVjdGlvbjogXCJyaWdodFwiIH0sIHsgdGltZTogMjAsIHBvaW50OiB7IHg6IHdpbnNpemUud2lkdGgsIHk6IHdpbnNpemUuaGVpZ2h0ICogMC41IH0sIGRpcmVjdGlvbjogXCJyaWdodFwiIH0sIHsgdGltZTogNDUsIHBvaW50OiB7IHg6IHdpbnNpemUud2lkdGgsIHk6IHdpbnNpemUuaGVpZ2h0ICogMC43IH0sIGRpcmVjdGlvbjogXCJyaWdodFwiIH0sIHsgdGltZTogNjUsIHBvaW50OiB7IHg6IHdpbnNpemUud2lkdGggKiAwLjgsIHk6IHdpbnNpemUuaGVpZ2h0IH0sIGRpcmVjdGlvbjogXCJ0b3BcIiB9LCB7IHRpbWU6IDg1LCBwb2ludDogeyB4OiB3aW5zaXplLndpZHRoICogMC42LCB5OiB3aW5zaXplLmhlaWdodCB9LCBkaXJlY3Rpb246IFwidG9wXCIgfSwgeyB0aW1lOiAxMDUsIHBvaW50OiB7IHg6IHdpbnNpemUud2lkdGggKiAwLjQsIHk6IHdpbnNpemUuaGVpZ2h0IH0sIGRpcmVjdGlvbjogXCJ0b3BcIiB9LCB7IHRpbWU6IDEyNSwgcG9pbnQ6IHsgeDogd2luc2l6ZS53aWR0aCAqIDAuMiwgeTogd2luc2l6ZS5oZWlnaHQgfSwgZGlyZWN0aW9uOiBcInRvcFwiIH0sIHsgdGltZTogMTQ1LCBwb2ludDogeyB4OiB3aW5zaXplLndpZHRoICogMCwgeTogd2luc2l6ZS5oZWlnaHQgKiAwLjcgfSwgZGlyZWN0aW9uOiBcImxlZnRcIiB9LCB7IHRpbWU6IDE2NSwgcG9pbnQ6IHsgeDogd2luc2l6ZS53aWR0aCAqIDAsIHk6IHdpbnNpemUuaGVpZ2h0ICogMC41IH0sIGRpcmVjdGlvbjogXCJsZWZ0XCIgfSwgeyB0aW1lOiAxODUsIHBvaW50OiB7IHg6IHdpbnNpemUud2lkdGggKiAwLCB5OiB3aW5zaXplLmhlaWdodCAqIDAuMyB9LCBkaXJlY3Rpb246IFwibGVmdFwiIH0sIHsgdGltZTogMjA1LCBwb2ludDogeyB4OiB3aW5zaXplLndpZHRoICogMC4yLCB5OiB3aW5zaXplLmhlaWdodCAqIDAgfSwgZGlyZWN0aW9uOiBcImJvdHRvbVwiIH0sIHsgdGltZTogMjI1LCBwb2ludDogeyB4OiB3aW5zaXplLndpZHRoICogMC40LCB5OiB3aW5zaXplLmhlaWdodCAqIDAgfSwgZGlyZWN0aW9uOiBcImJvdHRvbVwiIH0sIHsgdGltZTogMjQ1LCBwb2ludDogeyB4OiB3aW5zaXplLndpZHRoICogMC42LCB5OiB3aW5zaXplLmhlaWdodCAqIDAgfSwgZGlyZWN0aW9uOiBcImJvdHRvbVwiIH0sIHsgdGltZTogMjY1LCBwb2ludDogeyB4OiB3aW5zaXplLndpZHRoICogMC44LCB5OiB3aW5zaXplLmhlaWdodCAqIDAgfSwgZGlyZWN0aW9uOiBcImJvdHRvbVwiIH1dO1xuICAgIH1cbn07XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnN2Y2YzFYN1kxRkJ2NDlPb1czUThObFYnLCAncGFvcGFvJyk7XG4vLyBzY3JpcHRzL3Bhb3Bhby5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQaHlzaWNzID0gcmVxdWlyZSgnLi9waHlzaWNzJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BhY2U6IG51bGwsXG4gICAgICAgIHBhb3Bhbzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV1cbiAgICAgICAgfSxcbiAgICAgICAgcG9uaXRfbGVmdDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuVmVjMlxuICAgICAgICB9LFxuICAgICAgICBwb2ludF9yaWdodDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuVmVjMlxuICAgICAgICB9LFxuICAgICAgICBwYXJ0aWNsZVByZUZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIHdlaWdodDogMCwgLy/otKjph49cbiAgICAgICAgcjogMCwgLy/lnIbljYrlvoRcbiAgICAgICAgbWF4U3BlZWQ6IDAsIC8v6YCf5bqmXG4gICAgICAgIGZyaWN0aW9uOiAwLCAvL+aRqeaTpuWKm1xuICAgICAgICBlbGFzdGljaXR5OiAwLCAvL+WPjeW8ueWKm1xuICAgICAgICBwYW9wYW9BcnI6IFtdLCAvL+azoeazoeaVsOe7hFxuICAgICAgICBwYW9wYW9pZDogMFxuICAgIH0sXG4gICAgQWRkUGFvcGFvOiBmdW5jdGlvbiBBZGRQYW9wYW8oKSB7XG4gICAgICAgIC8vY2MubG9nKFwiYWRkIHBhb3BhbyBiZWdpbiAlZCwlZCwlZFwiLHRoaXMud2VpZ2h0LCB0aGlzLnIsIHRoaXMubWF4U3BlZWQpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzaXplID0gY2Mud2luU2l6ZTtcbiAgICAgICAgdmFyIG9yaWdpbiA9IGNwLnYoY2MucmFuZG9tMFRvMSgpICogKHNpemUud2lkdGggKiAwLjkpICsgc2l6ZS53aWR0aCAqIDAuMSwgY2MucmFuZG9tMFRvMSgpICogKHNpemUuaGVpZ2h0ICogMC45KSArIHNpemUuaGVpZ2h0ICogMC4xKTtcbiAgICAgICAgdmFyIHNwcml0ZSA9IG5ldyBjYy5Ob2RlKCkuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMucGFvcGFvWzBdO1xuICAgICAgICBzcHJpdGUubm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIHNwcml0ZS5ub2RlLnNldFBvc2l0aW9uKG9yaWdpbik7XG4gICAgICAgIHNwcml0ZS5ub2RlLm5hbWUgPSAnXycgKyB0aGlzLnBhb3Bhb2lkO1xuICAgICAgICB2YXIgcGh5T2JqID0gbmV3IFBoeXNpY3MuQ2lyY2xlT2JqZWN0KHRoaXMud2VpZ2h0LCB0aGlzLnIsIHRoaXMubWF4U3BlZWQsIHNwcml0ZSwgb3JpZ2luLCAxKTtcblxuICAgICAgICBwaHlPYmouc2V0RnJpY3Rpb24odGhpcy5mcmljdGlvbik7XG4gICAgICAgIHBoeU9iai5zZXRFbGFzdGljaXR5KHRoaXMuZWxhc3RpY2l0eSk7XG4gICAgICAgIHBoeU9iai5ib2R5LmFwcGx5SW1wdWxzZShjcC52KGNjLnJhbmRvbTBUbzEoKSAqIDQwMCAtIDIwMCwgY2MucmFuZG9tMFRvMSgpICogNDAwIC0gMjQwKSwgY3AudigwLCAwKSk7XG4gICAgICAgIHNwcml0ZS5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBwID0gc2VsZi5wYW9wYW9BcnJbc3ByaXRlLm5vZGUubmFtZV07XG4gICAgICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgICAgIHAuZGVzdHJveSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBhb3Bhb0FycltzcHJpdGUubm9kZS5uYW1lXSA9IHsgZGVzdHJveTogZmFsc2UsIHNwOiBzcHJpdGUsIHBoeTogcGh5T2JqIH07XG4gICAgICAgIHRoaXMucGFvcGFvaWQrKztcbiAgICB9LFxuICAgIGFkZENvbGxpc2lvbkhhbmRsZXI6IGZ1bmN0aW9uIGFkZENvbGxpc2lvbkhhbmRsZXIoKSB7XG4gICAgICAgIHZhciBzcGFjZSA9IFBoeXNpY3Mud29ybGQ7XG4gICAgICAgIC8vIDEgJiAyIOajgOa1i3NwaWtlZOWSjHBhb3Bhb+eisOaSnlxuICAgICAgICBzcGFjZS5hZGRDb2xsaXNpb25IYW5kbGVyKDEsIDIsIHRoaXMuY29sbGlzaW9uQmVnaW4uYmluZCh0aGlzKSwgZnVuY3Rpb24gKCkge30sIGZ1bmN0aW9uICgpIHt9LCBmdW5jdGlvbiAoKSB7fSk7XG4gICAgfSxcbiAgICBjb2xsaXNpb25CZWdpbjogZnVuY3Rpb24gY29sbGlzaW9uQmVnaW4oYXJiaXRlciwgc3BhY2UpIHtcbiAgICAgICAgdmFyIHNoYXBlcyA9IGFyYml0ZXIuZ2V0U2hhcGVzKCk7XG4gICAgICAgIHZhciBzaGFwZUEgPSBzaGFwZXNbMF07XG4gICAgICAgIHZhciBzaGFwZUIgPSBzaGFwZXNbMV07XG4gICAgICAgIGlmIChzaGFwZUEuY29sbGlzaW9uX3R5cGUgPT0gMSkge1xuICAgICAgICAgICAgdmFyIGJvZHlBID0gc2hhcGVBLmdldEJvZHkoKTtcbiAgICAgICAgICAgIHZhciBuYW1lID0gYm9keUEuZGF0YS5ub2RlLm5hbWU7XG4gICAgICAgICAgICB2YXIgcCA9IHRoaXMucGFvcGFvQXJyW25hbWVdO1xuICAgICAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgICAgICBwLmRlc3Ryb3kgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzaGFwZUIuY29sbGlzaW9uX3R5cGUgPT0gMSkge1xuICAgICAgICAgICAgdmFyIGJvZHlCID0gc2hhcGVCLmdldEJvZHkoKTtcbiAgICAgICAgICAgIHZhciBuYW1lID0gYm9keUIuZGF0YS5ub2RlLm5hbWU7XG4gICAgICAgICAgICB2YXIgcCA9IHRoaXMucGFvcGFvQXJyW25hbWVdO1xuICAgICAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgICAgICBwLmRlc3Ryb3kgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvL3RoaXMuQWRkUGFvcGFvKCk7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMuYWRkQ29sbGlzaW9uSGFuZGxlcigpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMudGltZSArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMudGltZSA+IDEuNSkge1xuICAgICAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMuQWRkUGFvcGFvKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMucGFvcGFvQXJyKSB7XG4gICAgICAgICAgICB2YXIgcCA9IHRoaXMucGFvcGFvQXJyW2tleV07XG4gICAgICAgICAgICBpZiAocC5kZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQocC5zcC5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydGlja2VwYW9wYW8gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBhcnRpY2xlUHJlRmFiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHBhcnRpY2tlcGFvcGFvKTtcbiAgICAgICAgICAgICAgICAgICAgcGFydGlja2VwYW9wYW8uc2V0UG9zaXRpb24ocC5zcC5ub2RlLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IHBhcnRpY2tlcGFvcGFvLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDIpLCBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoYWN0aW9uLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRlc3Ryb3kgcGFydGlja2VwYW9wYW9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNrZXBhb3Bhby5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpKSk7XG4gICAgICAgICAgICAgICAgICAgIHAuc3Aubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHAucGh5LnJlbW92ZVNlbGYoKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5wYW9wYW9BcnJba2V5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy92YXIgcCA9IHRoaXMucGFvcGFvQXJyW2ldLnBoeS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIHAuc3Aubm9kZS5zZXRQb3NpdGlvbihwLnBoeS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2M0ZjE2ZFhPL0ZBejVTcFM2cklWV3JuJywgJ3BoeXNpY3MnKTtcbi8vIHNjcmlwdHMvcGh5c2ljcy5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIENQU1RFUCA9IDEgLyA2MDtcbnZhciBQaHlzaWNzID0ge1xuICAgIHdvcmxkOiBudWxsLFxuICAgIHNjZW5lOiBudWxsLFxuICAgIGluaXRlZDogbnVsbCxcbiAgICBoYW5kbGVyczogW10sXG4gICAgc2hhcGVzOiBbXSxcbiAgICBib2RpZXM6IFtdLFxuXG4gICAgY2FsY3VsVmVjdG9yOiBmdW5jdGlvbiBjYWxjdWxWZWN0b3IoYSkge1xuICAgICAgICAvKnZhciBzID0gYS5hLCBkID0gYS5iO1xuICAgICAgICAgdmFyIGNzID0gY2MucCgocy5iYl9iK3MuYmJfdCkvMiwgKHMuYmJfbCtzLmJiX3IpLzIpO1xuICAgICAgICAgdmFyIGNkID0gY2MucCgoZC5iYl9iK2QuYmJfdCkvMiwgKGQuYmJfbCtkLmJiX3IpLzIpO1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG4gPSBhLmdldE5vcm1hbCgwKTtcbiAgICAgICAgdmFyIHYgPSBjYy5wKG4ueCwgLW4ueSk7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH0sXG4gICAgY2FsY3VsQW5nbGU6IGZ1bmN0aW9uIGNhbGN1bEFuZ2xlKGEpIHtcbiAgICAgICAgcmV0dXJuIGNjLnBUb0FuZ2xlKHRoaXMuY2FsY3VsVmVjdG9yKGEpKTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChzY2VuZSkge1xuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgICAgIGlmICh0aGlzLmluaXRlZCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMud29ybGQgPSBudWxsO1xuICAgICAgICB0aGlzLndvcmxkID0gbmV3IGNwLlNwYWNlKCk7XG4gICAgICAgIC8vc3BhY2UuaXRlcmF0aW9ucyA9IDYwO1xuICAgICAgICAvL3NwYWNlLnNsZWVwVGltZVRocmVzaG9sZCA9IDAuNTtcbiAgICAgICAgLy8gc3BhY2UuZGFtcGluZyA9IDE7XG4gICAgICAgIC8vIEdyYXZpdHk6XG4gICAgICAgIC8vdGhpcy53b3JsZC5ncmF2aXR5ID0gY3AudigwLC0xMjAwKTsvL+mHjeWKm1xuICAgICAgICAvLyAgc3BhY2UuY29sbGlzaW9uU2xvcCA9IDAuNTtcbiAgICAgICAgdmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRlZCkgdGhpcy53b3JsZC5zdGVwKGR0KTtcbiAgICB9LFxuICAgIGFkZENvbGxpc2lvbkhhbmRsZXI6IGZ1bmN0aW9uIGFkZENvbGxpc2lvbkhhbmRsZXIoYSwgYiwgYmVnaW4sIHByZVNvbHZlLCBwb3N0U29sdmUsIHNlcGFyYXRlKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRlZCkge1xuICAgICAgICAgICAgdGhpcy53b3JsZC5hZGRDb2xsaXNpb25IYW5kbGVyKGEsIGIsIGJlZ2luLCBwcmVTb2x2ZSwgcG9zdFNvbHZlLCBzZXBhcmF0ZSk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzLnB1c2goW2EsIGJdKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVnaXN0ZXJTaGFwZTogZnVuY3Rpb24gcmVnaXN0ZXJTaGFwZShzaGFwZSkge1xuICAgICAgICBQaHlzaWNzLnNoYXBlcy5wdXNoKHNoYXBlKTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyQm9keTogZnVuY3Rpb24gcmVnaXN0ZXJCb2R5KGJvZHkpIHtcbiAgICAgICAgUGh5c2ljcy5ib2RpZXMucHVzaChib2R5KTtcbiAgICB9LFxuXG4gICAgX3JlYWxDbGVhcjogZnVuY3Rpb24gX3JlYWxDbGVhcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGVkKSB7XG4gICAgICAgICAgICB2YXIgc3BhY2UgPSB0aGlzLndvcmxkLFxuICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgc2hhcGUsXG4gICAgICAgICAgICAgICAgYm9keTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBoYW5kbGVyc1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyID0gdGhpcy5oYW5kbGVyc1tpXTtcbiAgICAgICAgICAgICAgICBzcGFjZS5yZW1vdmVDb2xsaXNpb25IYW5kbGVyKGhhbmRsZXJbMF0sIGhhbmRsZXJbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuXG4gICAgICAgICAgICAvLyBSZW1vdmUgc2hhcGVzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5zaGFwZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBzaGFwZSA9IHRoaXMuc2hhcGVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghc3BhY2UuY29udGFpbnNTaGFwZShzaGFwZSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChzaGFwZS5ib2R5LmlzU3RhdGljKCkpIHNwYWNlLnJlbW92ZVN0YXRpY1NoYXBlKHNoYXBlKTtlbHNlIHNwYWNlLnJlbW92ZVNoYXBlKHNoYXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2hhcGVzID0gW107XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSBib2RpZXNcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmJvZGllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSB0aGlzLmJvZGllc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIXNwYWNlLmNvbnRhaW5zQm9keShib2R5KSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgc3BhY2UucmVtb3ZlQm9keShib2R5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYm9kaWVzID0gW107XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgdmFyIHNwYWNlID0gdGhpcy53b3JsZDtcbiAgICAgICAgaWYgKHNwYWNlKSB7XG4gICAgICAgICAgICBzcGFjZS5lYWNoU2hhcGUodGhpcy5yZWdpc3RlclNoYXBlKTtcbiAgICAgICAgICAgIHNwYWNlLmVhY2hCb2R5KHRoaXMucmVnaXN0ZXJCb2R5KTtcbiAgICAgICAgICAgIGlmIChzcGFjZS5pc0xvY2tlZCgpKSBzcGFjZS5hZGRQb3N0U3RlcENhbGxiYWNrKHRoaXMuX3JlYWxDbGVhci5iaW5kKHRoaXMpKTtlbHNlIHRoaXMuX3JlYWxDbGVhcigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFN0YXRpY09iamVjdDogbnVsbCxcbiAgICBTdGF0aWNQb2x5T2JqZWN0OiBudWxsLFxuICAgIFN0YXRpY1NlbnNvcjogbnVsbCxcbiAgICBEeW5hbWljU2Vuc29yOiBudWxsLFxuICAgIFBoeXNpY3NPYmplY3Q6IG51bGwsXG4gICAgQ2lyY2xlT2JqZWN0OiBudWxsXG59O1xuUGh5c2ljcy5TdGF0aWNPYmplY3QgPSBjYy5fQ2xhc3MuZXh0ZW5kKHtcbiAgICB2aWV3OiBudWxsLFxuICAgIHNoYXBlOiBudWxsLFxuXG4gICAgY3RvcjogZnVuY3Rpb24gY3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0LCB2aWV3KSB7XG4gICAgICAgIHZhciBib3ggPSB7fTtcbiAgICAgICAgYm94LmwgPSB4O1xuICAgICAgICBib3guciA9IHggKyB3aWR0aDtcbiAgICAgICAgYm94LnQgPSB5ICsgaGVpZ2h0O1xuICAgICAgICBib3guYiA9IHk7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBuZXcgY3AuQm94U2hhcGUyKFBoeXNpY3Mud29ybGQuc3RhdGljQm9keSwgYm94KTtcbiAgICAgICAgUGh5c2ljcy53b3JsZC5hZGRTaGFwZSh0aGlzLnNoYXBlKTtcbiAgICAgICAgdGhpcy5zaGFwZS5vYmogPSB0aGlzO1xuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIH0sXG5cbiAgICBzZXRGcmljdGlvbjogZnVuY3Rpb24gc2V0RnJpY3Rpb24odSkge1xuICAgICAgICB0aGlzLnNoYXBlLnNldEZyaWN0aW9uKHUpO1xuICAgIH0sXG5cbiAgICBzZXRFbGFzdGljaXR5OiBmdW5jdGlvbiBzZXRFbGFzdGljaXR5KGUpIHtcbiAgICAgICAgdGhpcy5zaGFwZS5zZXRFbGFzdGljaXR5KGUpO1xuICAgIH0sXG5cbiAgICByZW1vdmVTZWxmOiBmdW5jdGlvbiByZW1vdmVTZWxmKCkge1xuICAgICAgICBQaHlzaWNzLndvcmxkLnJlbW92ZVN0YXRpY1NoYXBlKHRoaXMuc2hhcGUpO1xuICAgIH1cbn0pO1xuUGh5c2ljcy5TdGF0aWNQb2x5T2JqZWN0ID0gY2MuX0NsYXNzLmV4dGVuZCh7XG4gICAgdmlldzogbnVsbCxcbiAgICBzaGFwZTogbnVsbCxcbiAgICBjdG9yOiBmdW5jdGlvbiBjdG9yKHZpZXcsIHZlcnRzLCBvZmZzZXQpIHtcbiAgICAgICAgdGhpcy5zaGFwZSA9IG5ldyBjcC5Qb2x5U2hhcGUoUGh5c2ljcy53b3JsZC5zdGF0aWNCb2R5LCB2ZXJ0cywgb2Zmc2V0IHx8IGNwLnYoMCwgMCkpO1xuICAgICAgICBQaHlzaWNzLndvcmxkLmFkZFNoYXBlKHRoaXMuc2hhcGUpO1xuICAgICAgICB0aGlzLnNoYXBlLm9iaiA9IHRoaXM7XG4gICAgICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgfSxcblxuICAgIHNldEZyaWN0aW9uOiBmdW5jdGlvbiBzZXRGcmljdGlvbih1KSB7XG4gICAgICAgIHRoaXMuc2hhcGUuc2V0RnJpY3Rpb24odSk7XG4gICAgfSxcblxuICAgIHNldEVsYXN0aWNpdHk6IGZ1bmN0aW9uIHNldEVsYXN0aWNpdHkoZSkge1xuICAgICAgICB0aGlzLnNoYXBlLnNldEVsYXN0aWNpdHkoZSk7XG4gICAgfSxcblxuICAgIHJlbW92ZVNlbGY6IGZ1bmN0aW9uIHJlbW92ZVNlbGYoKSB7XG4gICAgICAgIFBoeXNpY3Mud29ybGQucmVtb3ZlU3RhdGljU2hhcGUodGhpcy5zaGFwZSk7XG4gICAgfVxufSk7XG5cblBoeXNpY3MuU3RhdGljU2Vuc29yID0gY2MuX0NsYXNzLmV4dGVuZCh7XG4gICAgdmlldzogbnVsbCxcbiAgICBzaGFwZTogbnVsbCxcblxuICAgIGN0b3I6IGZ1bmN0aW9uIGN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCwgdmlldykge1xuICAgICAgICB0aGlzLnNoYXBlID0gbmV3IGNwLlNlZ21lbnRTaGFwZShQaHlzaWNzLndvcmxkLnN0YXRpY0JvZHksIGNwLnYoeCwgeSArIGhlaWdodCksIGNwLnYoeCArIHdpZHRoLCB5ICsgaGVpZ2h0KSwgNSk7XG4gICAgICAgIHRoaXMuc2hhcGUuc2V0U2Vuc29yKHRydWUpO1xuICAgICAgICBQaHlzaWNzLndvcmxkLmFkZFNoYXBlKHRoaXMuc2hhcGUpO1xuICAgICAgICB0aGlzLnNoYXBlLm9iaiA9IHRoaXM7XG4gICAgICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgfSxcblxuICAgIHJlbW92ZVNlbGY6IGZ1bmN0aW9uIHJlbW92ZVNlbGYoKSB7XG4gICAgICAgIFBoeXNpY3Mud29ybGQucmVtb3ZlU3RhdGljU2hhcGUodGhpcy5zaGFwZSk7XG4gICAgfVxufSk7XG5QaHlzaWNzLkR5bmFtaWNTZW5zb3IgPSBjYy5fQ2xhc3MuZXh0ZW5kKHtcbiAgICBib2R5OiBudWxsLFxuICAgIHNoYXBlOiBudWxsLFxuICAgIHZpZXc6IG51bGwsXG5cbiAgICBjdG9yOiBmdW5jdGlvbiBjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQsIHZpZXcpIHtcbiAgICAgICAgdGhpcy5ib2R5ID0gbmV3IGNwLkJvZHkoMSwgY3AubW9tZW50Rm9yQm94KDEsIHdpZHRoLCBoZWlnaHQpKTtcbiAgICAgICAgdGhpcy5ib2R5LnNldFBvcyhjcC52KHgsIHkpKTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IG5ldyBjcC5Cb3hTaGFwZSh0aGlzLmJvZHksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLnNoYXBlLnNldFNlbnNvcih0cnVlKTtcbiAgICAgICAgUGh5c2ljcy53b3JsZC5hZGRTaGFwZSh0aGlzLnNoYXBlKTtcbiAgICAgICAgdGhpcy5zaGFwZS5vYmogPSB0aGlzO1xuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIH0sXG5cbiAgICByZW1vdmVTZWxmOiBmdW5jdGlvbiByZW1vdmVTZWxmKCkge1xuICAgICAgICBQaHlzaWNzLndvcmxkLnJlbW92ZVNoYXBlKHRoaXMuc2hhcGUpO1xuICAgICAgICBQaHlzaWNzLndvcmxkLnJlbW92ZUJvZHkodGhpcy5ib2R5KTtcbiAgICB9XG59KTtcblBoeXNpY3MuUGh5c2ljc09iamVjdCA9IGNjLl9DbGFzcy5leHRlbmQoe1xuICAgIGJvZHk6IG51bGwsXG4gICAgc2hhcGU6IG51bGwsXG4gICAgdHlwZTogbnVsbCxcbiAgICB2aWV3OiBudWxsLFxuXG4gICAgY3RvcjogZnVuY3Rpb24gY3Rvcih3ZWlnaHQsIHNpemUsIG1heFNwZWVkLCB2aWV3LCBwb3MsIHNoYXBlVHlwZSkge1xuXG4gICAgICAgIHRoaXMuYm9keSA9IG5ldyBjcC5Cb2R5KHdlaWdodCwgY3AubW9tZW50Rm9yQm94KHdlaWdodCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpKTtcbiAgICAgICAgdGhpcy5ib2R5LmRhdGEgPSB2aWV3O1xuICAgICAgICB0aGlzLnNoYXBlID0gbmV3IGNwLkJveFNoYXBlKHRoaXMuYm9keSwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgICB0aGlzLnNoYXBlLnNldENvbGxpc2lvblR5cGUoc2hhcGVUeXBlKTtcbiAgICAgICAgUGh5c2ljcy53b3JsZC5hZGRTaGFwZSh0aGlzLnNoYXBlKTtcbiAgICAgICAgUGh5c2ljcy53b3JsZC5hZGRCb2R5KHRoaXMuYm9keSk7XG4gICAgICAgIHRoaXMuc2V0TWF4U3BlZWQobWF4U3BlZWQpO1xuICAgICAgICB0aGlzLnNldFZpZXcodmlldyk7XG4gICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXBlLm9iaiA9IHRoaXM7XG4gICAgfSxcbiAgICBzZXRQb3NpdGlvbjogZnVuY3Rpb24gc2V0UG9zaXRpb24ocG9zKSB7XG4gICAgICAgIHRoaXMuYm9keS5zZXRQb3MocG9zKTtcbiAgICB9LFxuICAgIC8vbW92ZSB0b3dhcmRzIGEgZGlyZWN0aW9uXG4gICAgbW92ZTogZnVuY3Rpb24gbW92ZShkaXJlY3Rpb24sIGZvcmNlKSB7XG4gICAgICAgIHZhciB2ID0gY2MucChmb3JjZSwgMCk7XG4gICAgICAgIHZhciBpbXB1bHNlID0gY2MucFJvdGF0ZUJ5QW5nbGUodiwgY2MucCgwLCAwKSwgY2MuZGVncmVlc1RvUmFkaWFucyhkaXJlY3Rpb24pKTtcbiAgICAgICAgdGhpcy5ib2R5LmFwcGx5SW1wdWxzZShpbXB1bHNlLCBjcC52KDAsIDApKTtcbiAgICB9LFxuICAgIC8vbW92ZSB0b3dhcmRzIGEgcG9pbnQsIHJlZ2FyZGxlc3Mgb2Ygd2hlcmUgaSBhbVxuICAgIHRhcmdldE1vdmU6IGZ1bmN0aW9uIHRhcmdldE1vdmUocG9pbnQsIGZvcmNlKSB7XG4gICAgICAgIHZhciB2ID0gY2MucChmb3JjZSwgMCk7XG4gICAgICAgIHZhciBhbmdsZSA9IGNjLnBUb0FuZ2xlKGNjLnBTdWIocG9pbnQsIHRoaXMuYm9keS5wKSk7XG4gICAgICAgIHZhciBpbXB1bHNlID0gY2MucFJvdGF0ZUJ5QW5nbGUodiwgY2MucCgwLCAwKSwgYW5nbGUpO1xuICAgICAgICB0aGlzLmJvZHkuYXBwbHlJbXB1bHNlKGltcHVsc2UsIGNwLnYoMCwgMCkpO1xuICAgIH0sXG4gICAgc2V0TWF4U3BlZWQ6IGZ1bmN0aW9uIHNldE1heFNwZWVkKG1heFNwZWVkKSB7XG4gICAgICAgIHRoaXMuYm9keS52X2xpbWl0ID0gbWF4U3BlZWQ7XG4gICAgfSxcbiAgICBnZXRQb3NpdGlvbjogZnVuY3Rpb24gZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvZHkucDtcbiAgICB9LFxuICAgIC8vc28gc2hhcGUgY2FuIGZpbmQgaXRzIHBhcmVudCBvYmplY3RcbiAgICBzZXRWaWV3OiBmdW5jdGlvbiBzZXRWaWV3KHYpIHtcbiAgICAgICAgdGhpcy52aWV3ID0gdjtcbiAgICB9LFxuXG4gICAgc2V0RnJpY3Rpb246IGZ1bmN0aW9uIHNldEZyaWN0aW9uKHUpIHtcbiAgICAgICAgdGhpcy5zaGFwZS5zZXRGcmljdGlvbih1KTtcbiAgICB9LFxuXG4gICAgc2V0RWxhc3RpY2l0eTogZnVuY3Rpb24gc2V0RWxhc3RpY2l0eShlKSB7XG4gICAgICAgIHRoaXMuc2hhcGUuc2V0RWxhc3RpY2l0eShlKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlU2VsZjogZnVuY3Rpb24gcmVtb3ZlU2VsZigpIHtcbiAgICAgICAgUGh5c2ljcy53b3JsZC5yZW1vdmVTaGFwZSh0aGlzLnNoYXBlKTtcbiAgICAgICAgUGh5c2ljcy53b3JsZC5yZW1vdmVCb2R5KHRoaXMuYm9keSk7XG4gICAgfVxufSk7XG5cblBoeXNpY3MuQ2lyY2xlT2JqZWN0ID0gY2MuX0NsYXNzLmV4dGVuZCh7XG4gICAgYm9keTogbnVsbCxcbiAgICBzaGFwZTogbnVsbCxcbiAgICB0eXBlOiBudWxsLFxuICAgIHZpZXc6IG51bGwsXG4gICAgY3RvcjogZnVuY3Rpb24gY3Rvcih3ZWlnaHQsIHIsIG1heFNwZWVkLCB2aWV3LCBwb3MsIHNoYXBlVHlwZSkge1xuXG4gICAgICAgIHRoaXMuYm9keSA9IG5ldyBjcC5Cb2R5KHdlaWdodCwgY3AubW9tZW50Rm9yQ2lyY2xlKHdlaWdodCwgMCwgciwgY3AudigwLCAwKSkpO1xuICAgICAgICB0aGlzLmJvZHkuZGF0YSA9IHZpZXc7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBuZXcgY3AuQ2lyY2xlU2hhcGUodGhpcy5ib2R5LCByLCBjcC52KDAsIDApKTtcbiAgICAgICAgdGhpcy5zaGFwZS5zZXRDb2xsaXNpb25UeXBlKHNoYXBlVHlwZSk7XG4gICAgICAgIFBoeXNpY3Mud29ybGQuYWRkU2hhcGUodGhpcy5zaGFwZSk7XG4gICAgICAgIFBoeXNpY3Mud29ybGQuYWRkQm9keSh0aGlzLmJvZHkpO1xuICAgICAgICB0aGlzLnNldE1heFNwZWVkKG1heFNwZWVkKTtcbiAgICAgICAgdGhpcy5zZXRWaWV3KHZpZXcpO1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaGFwZS5vYmogPSB0aGlzO1xuICAgIH0sXG4gICAgc2V0UG9zaXRpb246IGZ1bmN0aW9uIHNldFBvc2l0aW9uKHBvcykge1xuICAgICAgICB0aGlzLmJvZHkuc2V0UG9zKHBvcyk7XG4gICAgfSxcbiAgICBzZXRNYXhTcGVlZDogZnVuY3Rpb24gc2V0TWF4U3BlZWQobWF4U3BlZWQpIHtcbiAgICAgICAgdGhpcy5ib2R5LnZfbGltaXQgPSBtYXhTcGVlZDtcbiAgICB9LFxuICAgIGdldFBvc2l0aW9uOiBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9keS5wO1xuICAgIH0sXG4gICAgLy9zbyBzaGFwZSBjYW4gZmluZCBpdHMgcGFyZW50IG9iamVjdFxuICAgIHNldFZpZXc6IGZ1bmN0aW9uIHNldFZpZXcodikge1xuICAgICAgICB0aGlzLnZpZXcgPSB2O1xuICAgIH0sXG5cbiAgICBzZXRGcmljdGlvbjogZnVuY3Rpb24gc2V0RnJpY3Rpb24odSkge1xuICAgICAgICB0aGlzLnNoYXBlLnNldEZyaWN0aW9uKHUpO1xuICAgIH0sXG5cbiAgICBzZXRFbGFzdGljaXR5OiBmdW5jdGlvbiBzZXRFbGFzdGljaXR5KGUpIHtcbiAgICAgICAgdGhpcy5zaGFwZS5zZXRFbGFzdGljaXR5KGUpO1xuICAgIH0sXG5cbiAgICByZW1vdmVTZWxmOiBmdW5jdGlvbiByZW1vdmVTZWxmKCkge1xuICAgICAgICBQaHlzaWNzLndvcmxkLnJlbW92ZVNoYXBlKHRoaXMuc2hhcGUpO1xuICAgICAgICBQaHlzaWNzLndvcmxkLnJlbW92ZUJvZHkodGhpcy5ib2R5KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzkyNzVhNzl1WHBPb3JPb0x2VWw4cElhJywgJ3NwaWtlZCcpO1xuLy8gc2NyaXB0cy9zcGlrZWQuanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQaHlzaWNzID0gcmVxdWlyZShcIi4vcGh5c2ljc1wiKTtcbnZhciBHbG9iYWxzID0gcmVxdWlyZShcImdsb2JhbFwiKTtcbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzcGxpa2VkOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3M6IDAsIC8vIOi0qOmHj1xuICAgICAgICBtYXhTcGVlZDogMFxuICAgIH0sXG4gICAgYWRkc3Bpa2VkOiBmdW5jdGlvbiBhZGRzcGlrZWQoaW5mbykge1xuXG4gICAgICAgIHZhciBvcmlnaW4gPSBjcC52KGluZm8ucG9pbnQueCwgaW5mby5wb2ludC55KTtcbiAgICAgICAgdmFyIHNwbGlrZWQgPSBuZXcgY2MuTm9kZSgpLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBzcGxpa2VkLnNwcml0ZUZyYW1lID0gdGhpcy5zcGxpa2VkO1xuICAgICAgICBzcGxpa2VkLm5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICBzcGxpa2VkLm5vZGUuc2NhbGVYID0gMC40O1xuICAgICAgICBzcGxpa2VkLm5vZGUuc2NhbGVZID0gMC4zO1xuICAgICAgICBzcGxpa2VkLm5vZGUuc2V0UG9zaXRpb24ob3JpZ2luKTtcbiAgICAgICAgaWYgKGluZm8uZGlyZWN0aW9uID09ICdyaWdodCcpIHt9IGVsc2UgaWYgKGluZm8uZGlyZWN0aW9uID09ICd0b3AnKSB7XG4gICAgICAgICAgICBzcGxpa2VkLm5vZGUuc2V0Um90YXRpb24oLTkwKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmZvLmRpcmVjdGlvbiA9PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIHNwbGlrZWQubm9kZS5zZXRSb3RhdGlvbigxODApO1xuICAgICAgICB9IGVsc2UgaWYgKGluZm8uZGlyZWN0aW9uID09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBzcGxpa2VkLm5vZGUuc2V0Um90YXRpb24oOTApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBiYm94ID0gc3BsaWtlZC5ub2RlLmdldEJvdW5kaW5nQm94KCk7XG4gICAgICAgIHZhciBwaHlPYmogPSBuZXcgUGh5c2ljcy5QaHlzaWNzT2JqZWN0KHRoaXMubWVzcywgeyB3aWR0aDogYmJveC53aWR0aCwgaGVpZ2h0OiBiYm94LmhlaWdodCB9LCB0aGlzLm1heFNwZWVkLCBzcGxpa2VkLCBvcmlnaW4sIDIpO1xuICAgICAgICBwaHlPYmouc2V0RnJpY3Rpb24odGhpcy5mcmljdGlvbik7XG4gICAgICAgIHBoeU9iai5zZXRFbGFzdGljaXR5KHRoaXMuZWxhc3RpY2l0eSk7XG4gICAgICAgIC8vcGh5T2JqLmJvZHkuYXBwbHlJbXB1bHNlKGNwLnYoMjAwLDIwMCksIGNwLnYoMCwwKSk7XG4gICAgfSxcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdmFyIHN0ID0gR2xvYmFscy5zcGlrZWRUaW1lO1xuICAgICAgICBpZiAoc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHN0WzBdLnRpbWUgPCBHbG9iYWxzLmNvdW50VGltZSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3RbMF0pO1xuICAgICAgICAgICAgICAgIHZhciBpbmZvID0gc3Quc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZHNwaWtlZChpbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiXX0=
