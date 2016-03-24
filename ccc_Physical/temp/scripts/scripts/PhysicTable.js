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