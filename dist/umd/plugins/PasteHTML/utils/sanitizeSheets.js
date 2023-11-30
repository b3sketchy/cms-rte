/**
 * Remove empty spreadsheets columns/rows for performance reasons.
 */ (function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.sanitizeSheets = {});
})(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "sanitizeSheets", {
        enumerable: true,
        get: function() {
            return sanitizeSheets;
        }
    });
    const sanitizeSheets = (doc)=>{
        // Ensure we are inside a spreadsheet i.e. not pasting
        // a table from within the editor
        const supported = [
            // Google Sheets
            'google-sheets-html-origin',
            // MS Excel
            'meta[content="Excel.Sheet"]',
            'meta[content*="Microsoft Excel"]'
        ];
        if (!supported.some((selector)=>!!doc.querySelector(selector))) {
            return doc;
        }
        const isEmptyElement = (el)=>{
            return (el.textContent ?? '').trim() === '';
        };
        const tables = Array.from(doc.querySelectorAll('table'));
        for (const table of tables){
            // Remove empty columns first!
            table.querySelectorAll('tr').forEach((row)=>{
                isEmptyElement(row) && row.remove();
            });
            const rows = Array.from(table.querySelectorAll('tr'));
            // CSS :nth-of-type index starts from 1
            let colIndex = 1;
            // eslint-disable-next-line -- TODO: explain this disable
            while(true){
                const cells = rows.map((row)=>row.querySelector(`th:nth-of-type(${colIndex}), td:nth-of-type(${colIndex})`)).filter((cell)=>!!cell);
                // No more columns
                if (cells.length === 0) {
                    break;
                }
                const isEmpty = cells.every((cell)=>isEmptyElement(cell));
                // Don't increment on deletion because columns will be shifted
                // left anyway. Incrementing may result in skipping
                if (!isEmpty) {
                    colIndex += 1;
                    continue;
                }
                cells.forEach((cell)=>cell.remove());
            }
        }
        return doc;
    };
});
