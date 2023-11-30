/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@udecode/plate-list"), require("../../../internal"), require("../../../internal/queries"), require("../../../internal/transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@udecode/plate-list",
        "../../../internal",
        "../../../internal/queries",
        "../../../internal/transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.moveListItemDown = {}, global.plateList, global.internal, global.queries, global.transforms);
})(this, function(exports, _platelist, _internal, _queries, _transforms) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "moveListItemDown", {
        enumerable: true,
        get: function() {
            return moveListItemDown;
        }
    });
    const moveListItemDown = (editor, { list, listItem })=>{
        const [listNode] = list;
        const [, listItemPath] = listItem;
        let previousListItemPath;
        try {
            previousListItemPath = (0, _queries.getPreviousPath)(listItemPath);
        } catch (e) {
            return;
        }
        // Previous sibling is the new parent
        const previousSiblingItem = (0, _queries.getNodeEntry)(editor, previousListItemPath);
        if (previousSiblingItem) {
            const [, previousPath] = previousSiblingItem;
            const subList = Array.from((0, _queries.getNodeChildren)(editor, previousPath)).find(([n, path])=>(0, _queries.match)(n, path, {
                    type: (0, _platelist.getListTypes)(editor)
                }));
            const newPath = (0, _queries.getNextPath)((0, _queries.getLastChildPath)(subList ?? previousSiblingItem));
            (0, _internal.withoutNormalizing)(editor, ()=>{
                if (!subList) {
                    // Create new sub-list
                    (0, _transforms.wrapNodes)(editor, {
                        type: listNode.type,
                        children: [],
                        data: {}
                    }, {
                        at: listItemPath
                    });
                }
                // Move the current item to the sub-list
                (0, _transforms.moveNodes)(editor, {
                    at: listItemPath,
                    to: newPath
                });
            });
        }
    };
});
