System.register(["./ObjectOnScreen", "../index"], function (exports_1, context_1) {
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
    var _Paddle_x, _Paddle_y, ObjectOnScreen_1, index_1, Paddle;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ObjectOnScreen_1_1) {
                ObjectOnScreen_1 = ObjectOnScreen_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            Paddle = class Paddle extends ObjectOnScreen_1.default {
                constructor() {
                    super();
                    _Paddle_x.set(this, void 0);
                    _Paddle_y.set(this, void 0);
                    __classPrivateFieldSet(this, _Paddle_x, (index_1.default.WIDTH - Paddle.WIDTH) / 2, "f");
                    __classPrivateFieldSet(this, _Paddle_y, index_1.default.HEIGHT - Paddle.HEIGHT, "f");
                }
                get x() {
                    return __classPrivateFieldGet(this, _Paddle_x, "f");
                }
                get y() {
                    return __classPrivateFieldGet(this, _Paddle_y, "f");
                }
                draw(ctx) {
                    ctx.beginPath();
                    ctx.rect(__classPrivateFieldGet(this, _Paddle_x, "f"), __classPrivateFieldGet(this, _Paddle_y, "f"), Paddle.WIDTH, Paddle.HEIGHT);
                    ctx.fillStyle = Paddle.COLOUR;
                    ctx.fill();
                    ctx.closePath();
                }
                move(direction) {
                    if (direction === 'left') {
                        __classPrivateFieldSet(this, _Paddle_x, __classPrivateFieldGet(this, _Paddle_x, "f") - Paddle.SPEED, "f");
                    }
                    else if (direction === 'right') {
                        __classPrivateFieldSet(this, _Paddle_x, __classPrivateFieldGet(this, _Paddle_x, "f") + Paddle.SPEED, "f");
                    }
                }
            };
            exports_1("default", Paddle);
            _Paddle_x = new WeakMap(), _Paddle_y = new WeakMap();
            Paddle.COLOUR = 'blue';
            Paddle.WIDTH = 80;
            Paddle.HEIGHT = 20;
            Paddle.SPEED = 10;
        }
    };
});
