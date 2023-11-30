(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("lodash/noop"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "lodash/noop"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.sdkNavigatorSlideIn = {}, global.noop);
})(this, function(exports, _noop) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "watchCurrentSlide", {
        enumerable: true,
        get: function() {
            return watchCurrentSlide;
        }
    });
    _noop = /*#__PURE__*/ _interop_require_default(_noop);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function watchCurrentSlide(navigator) {
        const onActiveCallbacks = new Set();
        let wasSlideClosed = false;
        let initialSlideLevel;
        let lastSlideLevel;
        const status = ()=>({
                wasClosed: wasSlideClosed,
                isActive: !wasSlideClosed && lastSlideLevel === initialSlideLevel
            });
        const off = navigator.onSlideInNavigation(({ oldSlideLevel, newSlideLevel })=>{
            if (initialSlideLevel === undefined) {
                initialSlideLevel = oldSlideLevel;
            }
            lastSlideLevel = newSlideLevel;
            if (newSlideLevel < initialSlideLevel) {
                wasSlideClosed = true;
                off(); // No more point in watching, slide got closed.
                onActiveCallbacks.clear();
            }
            if (status().isActive && newSlideLevel !== oldSlideLevel) {
                onActiveCallbacks.forEach((cb)=>cb());
            }
        });
        /**
   * Call to unsubscribe from navigator events when the watcher is no longer
   * needed.
   */ function unwatch() {
            off();
            onActiveCallbacks.clear();
        }
        /**
   * Fires immediately when the slide is currently active, or at the point when
   * it becomes active again, if there are slides on top that get closed. Does not
   * fire when the observed slide gets closed, and then re-opened through browser
   * back, as this technically opens a new slide and editor instance.
   */ function onActive(cb) {
            if (wasSlideClosed) return _noop.default; // Can't re-activate already closed slide.
            if (status().isActive) {
                cb();
            }
            onActiveCallbacks.add(cb);
            return ()=>onActiveCallbacks.delete(cb);
        }
        return {
            status,
            onActive,
            unwatch
        };
    }
});
