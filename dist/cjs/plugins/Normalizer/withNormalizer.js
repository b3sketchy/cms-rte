"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withNormalizer", {
    enumerable: true,
    get: function() {
        return withNormalizer;
    }
});
const _isplainobj = /*#__PURE__*/ _interop_require_default(require("is-plain-obj"));
const _transformers = require("../../helpers/transformers");
const _internal = require("../../internal");
const _queries = require("../../internal/queries");
const _baseRules = require("./baseRules");
const _utils = require("./utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const withNormalizer = (editor)=>{
    const rules = _baseRules.baseRules;
    // Derive normalization rules from other plugin's configurations
    for (const p of editor.plugins){
        const { normalizer: _rules } = p;
        if (!_rules) {
            continue;
        }
        for (const _rule of _rules){
            // Clone to avoid mutation bugs
            const rule = {
                ..._rule
            };
            if (!rule.match && !p.isElement) {
                throw new _utils.NormalizerError('rule.match MUST be defined in a non-element plugin');
            }
            // By default we filter elements with given plugin type
            if (!rule.match) {
                rule.match = {
                    type: (0, _queries.getPluginType)(editor, p.key)
                };
            }
            // Conditional transformation e.g.
            // {
            //   [BLOCKS.EMBEDDED_ASSET]: transformLift,
            //   default?: transformRemove
            // }
            //
            if ((0, _isplainobj.default)(rule.transform)) {
                if ('validNode' in rule) {
                    // I can't think of a use case. Disabled to prevent misuse
                    throw new _utils.NormalizerError('conditional transformations are not supported in validNode rules');
                }
                rule.transform = (0, _utils.createTransformerFromObject)({
                    default: _transformers.transformRemove,
                    ...rule.transform
                });
            }
            // By default all invalid nodes are removed.
            if (!rule.transform) {
                rule.transform = _transformers.transformRemove;
            }
            // Convert Types array syntax to a validator function
            if ('validChildren' in rule && Array.isArray(rule.validChildren)) {
                rule.validChildren = (0, _utils.createValidatorFromTypes)(rule.validChildren);
            }
            rules.push(rule);
        }
    }
    // Wrap transformer in a withoutNormalizing() call to avoid unnecessary
    // normalization cycles.
    const _transform = (tr, entry)=>{
        (0, _internal.withoutNormalizing)(editor, ()=>{
            tr(editor, entry);
        });
    };
    const { normalizeNode } = editor;
    // @ts-expect-error
    editor.normalizeNode = (entry)=>{
        const [node, path] = entry;
        const children = (0, _queries.getChildren)(entry);
        // The order of validNode rules Vs validChildren doesn't matter. Slate
        // will always perform normalization in a depth-first fashion.
        for (const rule of rules){
            if (!(0, _queries.matchNode)(node, path, rule.match)) {
                continue;
            }
            // Normalize node
            if ('validNode' in rule && !rule.validNode(editor, entry)) {
                _transform(rule.transform, entry);
                return;
            }
            // Normalize node.children
            if ('validChildren' in rule) {
                // It can not be an array since we enforced it earlier
                const isValidChild = rule.validChildren;
                const invalidChildEntry = children.find((entry)=>!isValidChild(editor, entry));
                if (invalidChildEntry) {
                    _transform(rule.transform, invalidChildEntry);
                    return;
                }
            }
        }
        return normalizeNode(entry);
    };
    return editor;
};
