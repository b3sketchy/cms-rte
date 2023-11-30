/* eslint-disable you-dont-need-lodash-underscore/find */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, /**
 * Given a field object and a rich text node type, return a list of allowed
 * resources associated with the node type, based on that node type's
 * `allowedResources` property.
 *
 * The navigation here is explained by the `nodes` validation having signature:
 * { nodes: { [nodeType]: { allowedResources: AllowedResource[] } } }
 *
 * We defensively navigate through this object because
 * 1) the field may not have a `validations` array,
 * 2) the `validations` array may be empty,
 * 3) the `validations` array may not have a `nodes` validation, and
 * 4) the `nodes` validation may not validate the `nodeType`.
 *
 * @param {object} field
 * @param {string} nodeType
 * @returns {AllowedResource[]}
 */ "default", {
    enumerable: true,
    get: function() {
        return getAllowedResourcesForNodeType;
    }
});
const _find = /*#__PURE__*/ _interop_require_default(require("lodash/find"));
const _flow = /*#__PURE__*/ _interop_require_default(require("lodash/flow"));
const _get = /*#__PURE__*/ _interop_require_default(require("lodash/get"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getAllowedResourcesForNodeType(field, nodeType) {
    return (0, _flow.default)((validations)=>(0, _find.default)(validations, 'nodes'), (validations)=>(0, _get.default)(validations, [
            'nodes',
            nodeType,
            'allowedResources'
        ], []))(field.validations);
}
