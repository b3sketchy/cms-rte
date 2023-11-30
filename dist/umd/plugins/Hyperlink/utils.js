(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/field-editor-reference"), require("@udecode/plate-common"), require("../../internal/queries"), require("../../plugins/shared/utils"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/field-editor-reference",
        "@udecode/plate-common",
        "../../internal/queries",
        "../../plugins/shared/utils"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.utils = {}, global.fieldEditorReference, global.plateCommon, global.queries, global.utils);
})(this, function(exports, _fieldeditorreference, _platecommon, _queries, _utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _export(target, all) {
        for(var name in all)Object.defineProperty(target, name, {
            enumerable: true,
            get: all[name]
        });
    }
    _export(exports, {
        getEntityInfo: function() {
            return getEntityInfo;
        },
        hasText: function() {
            return hasText;
        }
    });
    const hasText = (editor, entry)=>{
        const [node, path] = entry;
        return !(0, _platecommon.isAncestorEmpty)(editor, node) && (0, _queries.getText)(editor, path).trim() !== '';
    };
    function getEntityInfo(data) {
        if (!data) {
            return '';
        }
        const { entityTitle, contentTypeName, entityStatus, jobs } = data;
        const title = (0, _utils.truncateTitle)(entityTitle, 60) || 'Untitled';
        const scheduledActions = jobs.length > 0 ? (0, _fieldeditorreference.getScheduleTooltipContent)({
            job: jobs[0],
            jobsCount: jobs.length
        }) : '';
        return `${contentTypeName || 'Asset'} "${title}", ${entityStatus} ${scheduledActions}`;
    }
});
