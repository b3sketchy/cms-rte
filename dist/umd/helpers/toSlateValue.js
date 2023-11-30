(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/contentful-slatejs-adapter"), require("@contentful/rich-text-types"), require("../constants/Schema"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/contentful-slatejs-adapter",
        "@contentful/rich-text-types",
        "../constants/Schema"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.toSlateValue = {}, global.contentfulSlatejsAdapter, global.richTextTypes, global.schema);
})(this, function(exports, _contentfulslatejsadapter, _richtexttypes, _Schema) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "toSlateValue", {
        enumerable: true,
        get: function() {
            return toSlateValue;
        }
    });
    _Schema = /*#__PURE__*/ _interop_require_default(_Schema);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const isTextElement = (node)=>'text' in node;
    /**
 * Ensures all nodes have a child leaf text element. This should be handled by
 * Slate but its behavior has proven to be buggy and unpredictable.
 */ function sanitizeIncomingSlateDoc(nodes = []) {
        return nodes.map((node)=>{
            if (isTextElement(node)) {
                return node;
            }
            if (node.children?.length === 0) {
                return {
                    ...node,
                    children: [
                        {
                            text: '',
                            data: {}
                        }
                    ]
                };
            }
            return {
                ...node,
                children: sanitizeIncomingSlateDoc(node?.children)
            };
        });
    }
    const toSlateValue = (doc)=>{
        /**
   * For legacy reasons, a document may not have any content at all
   * e.g:
   *
   * {nodeType: document, data: {}, content: []}
   *
   * Rendering such document will break the Slate editor
   */ const hasContent = (doc)=>{
            return (doc?.content || []).length > 0;
        };
        const slateDoc = (0, _contentfulslatejsadapter.toSlatejsDocument)({
            document: doc && hasContent(doc) ? doc : _richtexttypes.EMPTY_DOCUMENT,
            // TODO: get rid of schema, https://github.com/contentful/field-editors/pull/1065#discussion_r826723248
            schema: _Schema.default
        });
        return sanitizeIncomingSlateDoc(slateDoc);
    };
});
