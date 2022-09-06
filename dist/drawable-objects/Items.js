System.register(["./FallingObject"], function (exports_1, context_1) {
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
    var _Recyclable_name, _Recyclable_description, _Recyclable_points, _NonRecyclable_name, _NonRecyclable_description, _NonRecyclable_lifePenalty, FallingObject_1, Recyclable, NonRecyclable, recyclableObjects, nonRecyclableObjects;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (FallingObject_1_1) {
                FallingObject_1 = FallingObject_1_1;
            }
        ],
        execute: function () {
            Recyclable = class Recyclable extends FallingObject_1.default {
                constructor(x, y, velocity, imageName, itemName, description, points) {
                    super(x, y, velocity, imageName);
                    _Recyclable_name.set(this, void 0);
                    _Recyclable_description.set(this, void 0);
                    _Recyclable_points.set(this, void 0);
                    __classPrivateFieldSet(this, _Recyclable_name, itemName, "f");
                    __classPrivateFieldSet(this, _Recyclable_description, description, "f");
                    __classPrivateFieldSet(this, _Recyclable_points, points, "f");
                }
                collisionEffect(updatePlayerStats) {
                    updatePlayerStats('points', __classPrivateFieldGet(this, _Recyclable_points, "f"));
                }
            };
            exports_1("Recyclable", Recyclable);
            _Recyclable_name = new WeakMap(), _Recyclable_description = new WeakMap(), _Recyclable_points = new WeakMap();
            NonRecyclable = class NonRecyclable extends FallingObject_1.default {
                constructor(x, y, velocity, imageName, itemName, description, lifePenalty) {
                    super(x, y, velocity, imageName);
                    _NonRecyclable_name.set(this, void 0);
                    _NonRecyclable_description.set(this, void 0);
                    _NonRecyclable_lifePenalty.set(this, void 0);
                    __classPrivateFieldSet(this, _NonRecyclable_name, itemName, "f");
                    __classPrivateFieldSet(this, _NonRecyclable_description, description, "f");
                    __classPrivateFieldSet(this, _NonRecyclable_lifePenalty, lifePenalty, "f");
                }
                collisionEffect(updatePlayerStats) {
                    updatePlayerStats('lives', __classPrivateFieldGet(this, _NonRecyclable_lifePenalty, "f"));
                }
            };
            exports_1("NonRecyclable", NonRecyclable);
            _NonRecyclable_name = new WeakMap(), _NonRecyclable_description = new WeakMap(), _NonRecyclable_lifePenalty = new WeakMap();
            exports_1("recyclableObjects", recyclableObjects = {
                recyclable001: {
                    itemName: 'glass bottle',
                    imageName: 'glassBottle.png',
                    description: 'Clean glass bottles can be recycled.',
                    points: 1,
                    velocity: 2,
                },
            });
            exports_1("nonRecyclableObjects", nonRecyclableObjects = {
                nonrecyclable001: {
                    itemName: 'crisps bag',
                    imageName: 'crispsBag.png',
                    description: 'Clean glass bottles can be recycled.',
                    lifePenalty: -1,
                    velocity: 1,
                },
            });
        }
    };
});
