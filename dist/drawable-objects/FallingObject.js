System.register(["../index", "./ObjectOnScreen", "./Paddle"], function (exports_1, context_1) {
    "use strict";
    var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };
    var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _FallingObject_x, _FallingObject_y, _FallingObject_img, _FallingObject_velocity, _ExtraLife_lifeBonus, index_1, ObjectOnScreen_1, Paddle_1, FallingObject, ExtraLife;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (ObjectOnScreen_1_1) {
                ObjectOnScreen_1 = ObjectOnScreen_1_1;
            },
            function (Paddle_1_1) {
                Paddle_1 = Paddle_1_1;
            }
        ],
        execute: function () {
            FallingObject = class FallingObject extends ObjectOnScreen_1.default {
                constructor(x, y, velocity, imageName) {
                    super();
                    _FallingObject_x.set(this, void 0);
                    _FallingObject_y.set(this, void 0);
                    _FallingObject_img.set(this, void 0);
                    this.hasCollided = false;
                    this.isOnScreen = true;
                    _FallingObject_velocity.set(this, void 0);
                    __classPrivateFieldSet(this, _FallingObject_x, x, "f");
                    __classPrivateFieldSet(this, _FallingObject_y, y, "f");
                    __classPrivateFieldSet(this, _FallingObject_velocity, velocity, "f");
                    __classPrivateFieldSet(this, _FallingObject_img, document.createElement('img'), "f");
                    __classPrivateFieldGet(this, _FallingObject_img, "f").src = `images/${imageName}`;
                }
                get x() {
                    return __classPrivateFieldGet(this, _FallingObject_x, "f");
                }
                get y() {
                    return __classPrivateFieldGet(this, _FallingObject_y, "f");
                }
                draw(ctx) {
                    ctx.drawImage(__classPrivateFieldGet(this, _FallingObject_img, "f"), __classPrivateFieldGet(this, _FallingObject_x, "f"), __classPrivateFieldGet(this, _FallingObject_y, "f"));
                }
                move() {
                    __classPrivateFieldSet(this, _FallingObject_y, __classPrivateFieldGet(this, _FallingObject_y, "f") + __classPrivateFieldGet(this, _FallingObject_velocity, "f"), "f");
                }
                updateOnscreenState() {
                    if (__classPrivateFieldGet(this, _FallingObject_y, "f") > index_1.default.HEIGHT) {
                        this.isOnScreen = false;
                    }
                }
                updateCollisionState(startX) {
                    this.hasCollided =
                        __classPrivateFieldGet(this, _FallingObject_x, "f") + __classPrivateFieldGet(this, _FallingObject_img, "f").width > startX &&
                            __classPrivateFieldGet(this, _FallingObject_x, "f") < startX + Paddle_1.default.WIDTH &&
                            __classPrivateFieldGet(this, _FallingObject_y, "f") + __classPrivateFieldGet(this, _FallingObject_img, "f").height > index_1.default.HEIGHT - Paddle_1.default.HEIGHT &&
                            __classPrivateFieldGet(this, _FallingObject_y, "f") < index_1.default.HEIGHT;
                    this.isOnScreen = !this.hasCollided;
                }
                update(startX, updatePlayerStats) {
                    this.move();
                    this.updateCollisionState(startX);
                    this.updateOnscreenState();
                    if (this.hasCollided) {
                        this.collisionEffect(updatePlayerStats);
                    }
                }
            };
            exports_1("default", FallingObject);
            _FallingObject_x = new WeakMap(), _FallingObject_y = new WeakMap(), _FallingObject_img = new WeakMap(), _FallingObject_velocity = new WeakMap();
            FallingObject.onScreen = [];
            ExtraLife = class ExtraLife extends FallingObject {
                constructor(x, y, velocity, imageName) {
                    super(x, y, velocity, imageName);
                    _ExtraLife_lifeBonus.set(this, 1);
                }
                collisionEffect(updatePlayerStats) {
                    updatePlayerStats('lives', __classPrivateFieldGet(this, _ExtraLife_lifeBonus, "f"));
                }
            };
            exports_1("ExtraLife", ExtraLife);
            _ExtraLife_lifeBonus = new WeakMap();
        }
    };
});
