
var CPSTEP = 1/60;
var Physics = {
    world:null,
    scene:null,
    inited: null,
    handlers: [],
    shapes: [],
    bodies: [],

    calculVector: function(a) {
        /*var s = a.a, d = a.b;
         var cs = cc.p((s.bb_b+s.bb_t)/2, (s.bb_l+s.bb_r)/2);
         var cd = cc.p((d.bb_b+d.bb_t)/2, (d.bb_l+d.bb_r)/2);
         */
        var n = a.getNormal(0);
        var v = cc.p(n.x, -n.y);
        return v;
    },
    calculAngle: function(a) {
        return cc.pToAngle( this.calculVector(a) );
    },

    init:function(scene){
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
        var emptyFunction = function() {
            return true;
        };
        this.inited = true;
    },
    update:function(dt){
        if (this.inited)
            this.world.step(dt);
    },
    addCollisionHandler: function(a, b, begin, preSolve, postSolve, separate) {
        if (this.inited) {
            this.world.addCollisionHandler(a, b, begin, preSolve, postSolve, separate);
            this.handlers.push([a, b]);
        }
    },
    registerShape: function(shape) {
        Physics.shapes.push(shape);
    },
    registerBody: function (body){
        Physics.bodies.push(body);
    },

    _realClear: function() {
        if (this.inited) {
            var space = this.world, handler, shape, body;
            // Remove handlers
            for (var i = this.handlers.length-1; i >= 0; --i) {
                handler = this.handlers[i];
                space.removeCollisionHandler(handler[0], handler[1]);
            }
            this.handlers = [];

            // Remove shapes
            for (var i = this.shapes.length-1; i >= 0; --i) {
                shape = this.shapes[i];
                if (!space.containsShape(shape))
                    continue;
                if (shape.body.isStatic())
                    space.removeStaticShape(shape);
                else space.removeShape(shape);
            }
            this.shapes = [];

            // Remove bodies
            for (var i = this.bodies.length-1; i >= 0; --i) {
                body = this.bodies[i];
                if (!space.containsBody(body))
                    continue;
                space.removeBody(body);
            }
            this.bodies = [];
        }
    },
    clear:function() {
        var space = this.world;
        if (space) {
            space.eachShape(this.registerShape);
            space.eachBody(this.registerBody);
            if (space.isLocked())
                space.addPostStepCallback(this._realClear.bind(this));
            else this._realClear();
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

    ctor:function(x, y, width, height, view){
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

    setFriction: function(u) {
        this.shape.setFriction(u);
    },

    setElasticity : function(e) {
        this.shape.setElasticity(e);
    },

    removeSelf: function () {
        Physics.world.removeStaticShape(this.shape);
    }
});
Physics.StaticPolyObject = cc._Class.extend({
    view: null,
    shape: null,
    ctor : function(view, verts, offset) {
        this.shape = new cp.PolyShape(Physics.world.staticBody, verts, offset || cp.v(0, 0));
        Physics.world.addShape(this.shape);
        this.shape.obj = this;
        this.view = view;
    },

    setFriction: function(u) {
        this.shape.setFriction(u);
    },

    setElasticity : function(e) {
        this.shape.setElasticity(e);
    },

    removeSelf: function () {
        Physics.world.removeStaticShape(this.shape);
    }
});

Physics.StaticSensor = cc._Class.extend({
    view: null,
    shape: null,

    ctor:function(x, y, width, height, view){
        this.shape = new cp.SegmentShape(Physics.world.staticBody, cp.v(x, y+height), cp.v(x+width, y+height), 5);
        this.shape.setSensor(true);
        Physics.world.addShape(this.shape);
        this.shape.obj = this;
        this.view = view;
    },

    removeSelf: function () {
        Physics.world.removeStaticShape(this.shape);
    }
});
Physics.DynamicSensor = cc._Class.extend({
    body: null,
    shape: null,
    view: null,

    ctor:function(x, y, width, height, view){
        this.body = new cp.Body(1, cp.momentForBox(1, width, height));
        this.body.setPos(cp.v(x, y));
        this.shape = new cp.BoxShape(this.body, width, height);
        this.shape.setSensor(true);
        Physics.world.addShape(this.shape);
        this.shape.obj = this;
        this.view = view;
    },

    removeSelf: function () {
        Physics.world.removeShape(this.shape);
        Physics.world.removeBody(this.body);
    }
});
Physics.PhysicsObject = cc._Class.extend({
    body:null,
    shape:null,
    type:null,
    view:null,

    ctor:function(weight, size, maxSpeed, view, pos,shapeType){

        this.body = new cp.Body(weight, cp.momentForBox(weight, size.width, size.height));
        this.body.data = view;
        this.shape = new cp.BoxShape(this.body, size.width, size.height);
        this.shape.setCollisionType(shapeType);
        Physics.world.addShape(this.shape);
        Physics.world.addBody(this.body);
        this.setMaxSpeed(maxSpeed);
        this.setView(view);
        if(pos)
        {
            this.setPosition(pos);
        }
        this.shape.obj = this;
    },
    setPosition:function(pos){
        this.body.setPos(pos);
    },
    //move towards a direction
    move:function(direction, force)
    {
        var v = cc.p(force,0);
        var impulse = cc.pRotateByAngle(v, cc.p(0,0), cc.degreesToRadians(direction));
        this.body.applyImpulse(impulse, cp.v(0, 0));
    },
    //move towards a point, regardless of where i am
    targetMove:function(point, force){
        var v = cc.p(force,0);
        var angle = cc.pToAngle(cc.pSub(point, this.body.p));
        var impulse = cc.pRotateByAngle(v, cc.p(0,0), angle);
        this.body.applyImpulse(impulse, cp.v(0,0));
    },
    setMaxSpeed:function(maxSpeed){
        this.body.v_limit = maxSpeed;
    },
    getPosition:function(){
        return this.body.p;
    },
    //so shape can find its parent object
    setView:function(v){
        this.view = v;
    },

    setFriction: function(u) {
        this.shape.setFriction(u);
    },

    setElasticity : function(e) {
        this.shape.setElasticity(e);
    },

    removeSelf: function () {
        Physics.world.removeShape(this.shape);
        Physics.world.removeBody(this.body);
    }
});

Physics.CircleObject = cc._Class.extend({
    body:null,
    shape:null,
    type:null,
    view:null,
    ctor:function(weight, r, maxSpeed, view, pos,shapeType){

        this.body = new cp.Body(weight, cp.momentForCircle(weight, 0, r, cp.v(0, 0)));
        this.body.data = view;
        this.shape = new cp.CircleShape(this.body, r, cp.v(0, 0));
        this.shape.setCollisionType(shapeType);
        Physics.world.addShape(this.shape);
        Physics.world.addBody(this.body);
        this.setMaxSpeed(maxSpeed);
        this.setView(view);
        if(pos)
        {
            this.setPosition(pos);
        }
        this.shape.obj = this;
    },
    setPosition:function(pos){
        this.body.setPos(pos);
    },
    setMaxSpeed:function(maxSpeed){
        this.body.v_limit = maxSpeed;
    },
    getPosition:function(){
        return this.body.p;
    },
    //so shape can find its parent object
    setView:function(v){
        this.view = v;
    },

    setFriction: function(u) {
        this.shape.setFriction(u);
    },

    setElasticity : function(e) {
        this.shape.setElasticity(e);
    },

    removeSelf: function () {
        Physics.world.removeShape(this.shape);
        Physics.world.removeBody(this.body);
    }
});



module.exports = Physics;
