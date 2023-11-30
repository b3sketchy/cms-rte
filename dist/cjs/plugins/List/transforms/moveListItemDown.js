/**
 * Credit: Modified version of Plate's list plugin
 * See: https://github.com/udecode/plate/blob/main/packages/nodes/list
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "moveListItemDown", {
    enumerable: true,
    get: function() {
        return moveListItemDown;
    }
});
const _platelist = require("@udecode/plate-list");
const _internal = require("../../../internal");
const _queries = require("../../../internal/queries");
const _transforms = require("../../../internal/transforms");
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
