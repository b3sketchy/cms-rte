(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@contentful/rich-text-types"), require("@udecode/plate-table"), require("../../helpers/editor"), require("../../helpers/transformers"), require("../../internal/queries"), require("../../internal/transforms"), require("./components/Cell"), require("./components/HeaderCell"), require("./components/Row"), require("./components/Table"), require("./helpers"), require("./insertTableFragment"), require("./onKeyDownTable"), require("./tableTracking"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@contentful/rich-text-types",
        "@udecode/plate-table",
        "../../helpers/editor",
        "../../helpers/transformers",
        "../../internal/queries",
        "../../internal/transforms",
        "./components/Cell",
        "./components/HeaderCell",
        "./components/Row",
        "./components/Table",
        "./helpers",
        "./insertTableFragment",
        "./onKeyDownTable",
        "./tableTracking"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.createTablePlugin = {}, global.richTextTypes, global.plateTable, global.editor, global.transformers, global.queries, global.transforms, global.cell, global.headerCell, global.row, global.table, global.helpers, global.insertTableFragment, global.onKeyDownTable, global.tableTracking);
})(this, function(exports, _richtexttypes, _platetable, _editor, _transformers, _queries, _transforms, _Cell, _HeaderCell, _Row, _Table, _helpers, _insertTableFragment, _onKeyDownTable, _tableTracking) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createTablePlugin", {
        enumerable: true,
        get: function() {
            return createTablePlugin;
        }
    });
    const createTablePlugin = ()=>(0, _platetable.createTablePlugin)({
            type: _richtexttypes.BLOCKS.TABLE,
            handlers: {
                // @ts-expect-error
                onKeyDown: _onKeyDownTable.onKeyDownTable
            },
            withOverrides: (editor, plugin)=>{
                const { normalizeNode } = editor;
                // injects important fixes from plate's original table plugin
                (0, _platetable.withTable)(editor, plugin);
                // Resets all normalization rules added by @udecode/plate-table as
                // they conflict with our own
                editor.normalizeNode = normalizeNode;
                (0, _tableTracking.addTableTrackingEvents)(editor);
                editor.insertFragment = (0, _insertTableFragment.insertTableFragment)(editor);
                return editor;
            },
            overrideByKey: {
                [_platetable.ELEMENT_TABLE]: {
                    type: _richtexttypes.BLOCKS.TABLE,
                    component: _Table.Table,
                    normalizer: [
                        {
                            validNode: _helpers.isNotEmpty
                        },
                        {
                            // Move to root level unless nested
                            validNode: (editor, [, path])=>{
                                // Nested tables are handled by another normalization
                                // rule in a the table cell level
                                const isNestedTable = !!(0, _queries.getBlockAbove)(editor, {
                                    at: path,
                                    match: {
                                        type: [
                                            _richtexttypes.BLOCKS.TABLE_CELL,
                                            _richtexttypes.BLOCKS.TABLE_HEADER_CELL
                                        ]
                                    }
                                });
                                return (0, _editor.isRootLevel)(path) || isNestedTable;
                            },
                            transform: _transformers.transformLift
                        },
                        {
                            validChildren: _richtexttypes.CONTAINERS[_richtexttypes.BLOCKS.TABLE]
                        }
                    ]
                },
                [_platetable.ELEMENT_TR]: {
                    type: _richtexttypes.BLOCKS.TABLE_ROW,
                    component: _Row.Row,
                    normalizer: [
                        {
                            validChildren: _richtexttypes.CONTAINERS[_richtexttypes.BLOCKS.TABLE_ROW],
                            transform: (0, _transformers.transformWrapIn)(_richtexttypes.BLOCKS.TABLE_CELL)
                        },
                        {
                            // Remove empty rows
                            validNode: _helpers.isNotEmpty
                        },
                        {
                            // Parent must be a table
                            validNode: (editor, [, path])=>{
                                const parent = (0, _queries.getParentNode)(editor, path)?.[0];
                                return parent && parent.type === _richtexttypes.BLOCKS.TABLE;
                            },
                            transform: (0, _transformers.transformWrapIn)(_richtexttypes.BLOCKS.TABLE)
                        },
                        {
                            // ensure consistent number of cells in each row
                            validNode: (editor, entry)=>{
                                return (0, _helpers.getNoOfMissingTableCellsInRow)(editor, entry) === 0;
                            },
                            transform: (editor, entry)=>{
                                const howMany = (0, _helpers.getNoOfMissingTableCellsInRow)(editor, entry);
                                const at = (0, _queries.getNextPath)((0, _queries.getLastChildPath)(entry));
                                (0, _transforms.insertNodes)(editor, (0, _helpers.createEmptyTableCells)(howMany), {
                                    at
                                });
                            }
                        }
                    ]
                },
                [_platetable.ELEMENT_TH]: {
                    type: _richtexttypes.BLOCKS.TABLE_HEADER_CELL,
                    component: _HeaderCell.HeaderCell,
                    normalizer: [
                        {
                            validChildren: _richtexttypes.CONTAINERS[_richtexttypes.BLOCKS.TABLE_HEADER_CELL],
                            transform: (0, _tableTracking.withInvalidCellChildrenTracking)(_transformers.transformParagraphs)
                        }
                    ]
                },
                [_platetable.ELEMENT_TD]: {
                    type: _richtexttypes.BLOCKS.TABLE_CELL,
                    component: _Cell.Cell,
                    normalizer: [
                        {
                            validChildren: _richtexttypes.CONTAINERS[_richtexttypes.BLOCKS.TABLE_CELL],
                            transform: (0, _tableTracking.withInvalidCellChildrenTracking)(_transformers.transformParagraphs)
                        }
                    ]
                }
            }
        });
});
