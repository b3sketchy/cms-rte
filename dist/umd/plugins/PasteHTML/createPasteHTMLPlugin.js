(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@udecode/plate-common"), require("./utils/sanitizeHTML"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@udecode/plate-common",
        "./utils/sanitizeHTML"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createPasteHTMLPlugin = {}, global.plateCommon, global.sanitizeHTML);
})(this, function(exports, _platecommon, _sanitizeHTML) {
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
        createPasteHTMLPlugin: function() {
            return createPasteHTMLPlugin;
        },
        ensureXSlateFragment: function() {
            return ensureXSlateFragment;
        },
        getSlateFragmentAttribute: function() {
            return getSlateFragmentAttribute;
        }
    });
    /**
 * Get x-slate-fragment attribute from data-slate-fragment
 */ const catchSlateFragment = /data-slate-fragment="(.+?)"/m;
    const getSlateFragmentAttribute = (dataTransfer)=>{
        const htmlData = dataTransfer.getData('text/html');
        const [, fragment] = htmlData.match(catchSlateFragment) || [];
        return fragment;
    };
    const ensureXSlateFragment = (dataTransfer)=>{
        if (!dataTransfer.getData('application/x-slate-fragment')) {
            const fragment = getSlateFragmentAttribute(dataTransfer);
            if (fragment) {
                const clipboardData = new DataTransfer();
                dataTransfer.types.forEach((type)=>{
                    clipboardData.setData(type, dataTransfer.getData(type));
                });
                clipboardData.setData('application/x-slate-fragment', fragment);
                return clipboardData;
            }
        }
        return dataTransfer;
    };
    const createPasteHTMLPlugin = ()=>({
            key: 'PasteHTMLPlugin',
            withOverrides: (editor)=>{
                const { insertData } = editor;
                editor.insertData = (data)=>insertData(ensureXSlateFragment(data));
                return editor;
            },
            inject: {
                pluginsByKey: {
                    [_platecommon.KEY_DESERIALIZE_HTML]: {
                        editor: {
                            insertData: {
                                format: 'text/html',
                                // Perform custom content transformation *before* pasting
                                transformData: _sanitizeHTML.sanitizeHTML
                            }
                        }
                    }
                }
            }
        });
});
