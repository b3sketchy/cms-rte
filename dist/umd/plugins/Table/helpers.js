(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-table"), require("../../helpers/editor"), require("../../internal"), require("../../internal/queries"), require("../../internal/transforms"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-table",
        "../../helpers/editor",
        "../../internal",
        "../../internal/queries",
        "../../internal/transforms"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.helpers = {}, global.richTextTypes, global.plateTable, global.editor, global.internal, global.queries, global.transforms);
})(this, function(exports, _richtexttypes, _platetable, _editor, _internal, _queries, _transforms) {
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
        createEmptyTableCells: function() {
            return createEmptyTableCells;
        },
        getNoOfMissingTableCellsInRow: function() {
            return getNoOfMissingTableCellsInRow;
        },
        insertTableAndFocusFirstCell: function() {
            return insertTableAndFocusFirstCell;
        },
        isNotEmpty: function() {
            return isNotEmpty;
        },
        isTable: function() {
            return isTable;
        },
        isTableActive: function() {
            return isTableActive;
        },
        isTableHeaderEnabled: function() {
            return isTableHeaderEnabled;
        },
        replaceEmptyParagraphWithTable: function() {
            return replaceEmptyParagraphWithTable;
        }
    });
    function insertTableAndFocusFirstCell(editor) {
        const table = {
            type: _richtexttypes.BLOCKS.TABLE,
            data: {},
            children: [
                (0, _platetable.getEmptyRowNode)(editor, {
                    colCount: 2,
                    header: true
                }),
                (0, _platetable.getEmptyRowNode)(editor, {
                    colCount: 2
                })
            ]
        };
        (0, _transforms.insertNodes)(editor, table);
        if (editor.selection) {
            const tableEntry = (0, _queries.getBlockAbove)(editor, {
                match: {
                    type: _richtexttypes.BLOCKS.TABLE
                }
            });
            if (!tableEntry) return;
            (0, _internal.selectEditor)(editor, {
                at: (0, _queries.getStartPoint)(editor, tableEntry[1])
            });
        }
        replaceEmptyParagraphWithTable(editor);
    }
    function isTableActive(editor) {
        const tableElements = [
            _platetable.ELEMENT_TABLE,
            _platetable.ELEMENT_TH,
            _platetable.ELEMENT_TR,
            _platetable.ELEMENT_TD
        ];
        return tableElements.some((el)=>(0, _editor.isBlockSelected)(editor, el));
    }
    function isTableHeaderEnabled(editor) {
        const tableItem = (0, _queries.getAboveNode)(editor, {
            match: {
                type: _richtexttypes.BLOCKS.TABLE
            }
        });
        if (!tableItem) {
            return false;
        }
        const firstRow = (0, _queries.getChildren)(tableItem)[0];
        if (!firstRow) {
            return false;
        }
        return (0, _queries.getChildren)(firstRow).every(([node])=>{
            return node.type === _richtexttypes.BLOCKS.TABLE_HEADER_CELL;
        });
    }
    function replaceEmptyParagraphWithTable(editor) {
        const tablePath = (0, _editor.getAncestorPathFromSelection)(editor);
        if (!tablePath || (0, _queries.isFirstChildPath)(tablePath)) return;
        const previousPath = (0, _queries.getPreviousPath)(tablePath);
        if (!previousPath) return;
        const [nodes] = (0, _queries.getNodeEntries)(editor, {
            at: previousPath,
            match: (node)=>node.type === _richtexttypes.BLOCKS.PARAGRAPH
        });
        if (!nodes) return;
        const [previousNode] = nodes;
        const isPreviousNodeTextEmpty = (0, _queries.isAncestorEmpty)(editor, previousNode);
        if (isPreviousNodeTextEmpty) {
            // Switch table with previous empty paragraph
            (0, _transforms.moveNodes)(editor, {
                at: tablePath,
                to: previousPath
            });
            // Remove previous paragraph that now is under the table
            (0, _transforms.removeNodes)(editor, {
                at: tablePath
            });
        }
    }
    const getNoOfMissingTableCellsInRow = (editor, rowEntry)=>{
        const [, rowPath] = rowEntry;
        const parent = (0, _queries.getParentNode)(editor, rowPath);
        // This is ensured by normalization. The error is here just in case
        if (!parent) {
            throw new Error('table rows must be wrapped in a table node');
        }
        // The longest table row determines its width
        const tableWidth = Math.max(...(0, _queries.getChildren)(parent).map((entry)=>(0, _queries.getChildren)(entry).length));
        const rowWidth = (0, _queries.getChildren)(rowEntry).length;
        return tableWidth - rowWidth;
    };
    const createEmptyTableCells = (count)=>{
        const emptyTableCell = {
            type: _richtexttypes.BLOCKS.TABLE_CELL,
            data: {},
            children: [
                {
                    type: _richtexttypes.BLOCKS.PARAGRAPH,
                    data: {},
                    children: [
                        {
                            text: ''
                        }
                    ]
                }
            ]
        };
        return new Array(count).fill(emptyTableCell);
    };
    const isNotEmpty = (_, entry)=>{
        return (0, _queries.getChildren)(entry).length !== 0;
    };
    const isTable = (node)=>{
        return (0, _queries.isElement)(node) && node.type === _richtexttypes.BLOCKS.TABLE;
    };
});
