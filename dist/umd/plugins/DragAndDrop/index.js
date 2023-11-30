(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("../../internal/queries"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "../../internal/queries"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.richTextTypes, global.queries);
})(this, function(exports, _richtexttypes, _queries) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createDragAndDropPlugin", {
        enumerable: true,
        get: function() {
            return createDragAndDropPlugin;
        }
    });
    function createDragAndDropPlugin() {
        const DRAGGABLE_TYPES = [
            _richtexttypes.BLOCKS.EMBEDDED_ENTRY,
            _richtexttypes.BLOCKS.EMBEDDED_ASSET,
            _richtexttypes.BLOCKS.EMBEDDED_RESOURCE,
            _richtexttypes.BLOCKS.HR,
            _richtexttypes.INLINES.EMBEDDED_ENTRY,
            _richtexttypes.INLINES.EMBEDDED_RESOURCE
        ];
        /**
   * HTML node names where dropping should be allowed
   * Usually for elements where `Transforms.removeNodes` is needed
   * TODO: looking up for html nodes is not the best solution and it won't scale but it works fine for our current cases/elements
   */ const ON_DROP_ALLOWED_TYPES = {
            TABLE: [
                _richtexttypes.INLINES.EMBEDDED_ENTRY,
                _richtexttypes.INLINES.EMBEDDED_RESOURCE
            ]
        };
        return {
            key: 'DragAndDropPlugin',
            handlers: {
                // If true, the next handlers will be skipped.
                onDrop: (editor)=>(event)=>{
                        const [draggingBlock] = Array.from((0, _queries.getNodeEntries)(editor, {
                            match: (node)=>DRAGGABLE_TYPES.includes(node.type)
                        }));
                        if (!draggingBlock) return false;
                        const [draggingNode] = draggingBlock;
                        if (!event.nativeEvent.target) return false;
                        // TODO: looking up for html nodes is not the best solution and it won't scale, we need to find a way to know the dropping target slate element
                        const dropDisallowed = getParents(event.nativeEvent.target).some((node)=>{
                            return ON_DROP_ALLOWED_TYPES[node.nodeName] ? !ON_DROP_ALLOWED_TYPES[node.nodeName]?.includes(draggingNode.type) : false;
                        });
                        if (!dropDisallowed) {
                            // Move the drop event to a new undo batch mitigating the bug where undo not only moves it back,
                            // but also undoes a previous action: https://github.com/ianstormtaylor/slate/issues/4694
                            editor.history.undos.push([]);
                        }
                        return dropDisallowed;
                    }
            }
        };
    }
    function getParents(el) {
        const parents = [];
        parents.push(el);
        while(el.parentNode){
            parents.unshift(el.parentNode);
            el = el.parentNode;
        }
        return parents;
    }
});
