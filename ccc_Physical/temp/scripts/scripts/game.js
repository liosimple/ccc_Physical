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