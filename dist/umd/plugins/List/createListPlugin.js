(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-list"), require("../../helpers/transformers"), require("./components/List"), require("./components/ListItem"), require("./onKeyDownList"), require("./utils"), require("./withList"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-list",
        "../../helpers/transformers",
        "./components/List",
        "./components/ListItem",
        "./onKeyDownList",
        "./utils",
        "./withList"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createListPlugin = {}, global.richTextTypes, global.plateList, global.transformers, global.list, global.listItem, global.onKeyDownList, global.utils, global.withList);
})(this, function(exports, _richtexttypes, _platelist, _transformers, _List, _ListItem, _onKeyDownList, _utils, _withList) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createListPlugin", {
        enumerable: true,
        get: function() {
            return createListPlugin;
        }
    });
    const createListPlugin = ()=>(0, _platelist.createListPlugin)({
            normalizer: [
                {
                    match: {
                        type: [
                            _richtexttypes.BLOCKS.UL_LIST,
                            _richtexttypes.BLOCKS.OL_LIST
                        ]
                    },
                    validChildren: [
                        _richtexttypes.BLOCKS.LIST_ITEM
                    ],
                    transform: (0, _transformers.transformWrapIn)(_richtexttypes.BLOCKS.LIST_ITEM)
                }
            ],
            overrideByKey: {
                [_platelist.ELEMENT_UL]: {
                    type: _richtexttypes.BLOCKS.UL_LIST,
                    component: _List.ListUL,
                    handlers: {
                        onKeyDown: _onKeyDownList.onKeyDownList
                    },
                    // The withList is added on ELEMENT_UL plugin in upstream code
                    // so we need to override it here
                    withOverrides: _withList.withList
                },
                [_platelist.ELEMENT_OL]: {
                    type: _richtexttypes.BLOCKS.OL_LIST,
                    component: _List.ListOL,
                    handlers: {
                        onKeyDown: _onKeyDownList.onKeyDownList
                    }
                },
                // ELEMENT_LIC is a child of li, Slate does ul > li > lic + ul
                [_platelist.ELEMENT_LIC]: {
                    type: _richtexttypes.BLOCKS.PARAGRAPH
                },
                [_platelist.ELEMENT_LI]: {
                    type: _richtexttypes.BLOCKS.LIST_ITEM,
                    component: _ListItem.ListItem,
                    // @ts-expect-error
                    normalizer: [
                        {
                            validNode: _utils.hasListAsDirectParent,
                            transform: _utils.normalizeOrphanedListItem
                        },
                        {
                            validNode: _utils.isNonEmptyListItem,
                            transform: _utils.insertParagraphAsChild
                        },
                        {
                            validChildren: _richtexttypes.LIST_ITEM_BLOCKS,
                            transform: _transformers.transformParagraphs
                        },
                        {
                            validNode: _utils.firstNodeIsNotList,
                            transform: _utils.replaceNodeWithListItems
                        }
                    ]
                }
            }
        });
});
