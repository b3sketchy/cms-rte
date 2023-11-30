import * as React from 'react';
import { Menu, Button } from '@contentful/f36-components';
import { ChevronDownIcon } from '@contentful/f36-icons';
import tokens from '@contentful/f36-tokens';
import { BLOCKS } from '@contentful/rich-text-types';
import { css, cx } from 'emotion';
import { useContentfulEditor } from '../../../ContentfulEditorProvider';
import { getElementFromCurrentSelection, focus, isBlockSelected, toggleElement } from '../../../helpers/editor';
import { isNodeTypeEnabled } from '../../../helpers/validations';
import { useSdkContext } from '../../../SdkProvider';
const styles = {
    dropdown: {
        root: css`
      font-weight: ${tokens.fontWeightDemiBold};
    `,
        [BLOCKS.PARAGRAPH]: css`
      font-size: ${tokens.fontSizeL};
    `,
        [BLOCKS.HEADING_1]: css`
      font-size: 1.625rem;
    `,
        [BLOCKS.HEADING_2]: css`
      font-size: 1.4375rem;
    `,
        [BLOCKS.HEADING_3]: css`
      font-size: 1.25rem;
    `,
        [BLOCKS.HEADING_4]: css`
      font-size: 1.125rem;
    `,
        [BLOCKS.HEADING_5]: css`
      font-size: 1rem;
    `,
        [BLOCKS.HEADING_6]: css`
      font-size: 0.875rem;
    `
    }
};
const LABELS = {
    [BLOCKS.PARAGRAPH]: 'Normal text',
    [BLOCKS.HEADING_1]: 'Heading 1',
    [BLOCKS.HEADING_2]: 'Heading 2',
    [BLOCKS.HEADING_3]: 'Heading 3',
    [BLOCKS.HEADING_4]: 'Heading 4',
    [BLOCKS.HEADING_5]: 'Heading 5',
    [BLOCKS.HEADING_6]: 'Heading 6'
};
export function ToolbarHeadingButton(props) {
    const sdk = useSdkContext();
    const editor = useContentfulEditor();
    const [isOpen, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(BLOCKS.PARAGRAPH);
    React.useEffect(()=>{
        if (!editor?.selection) return;
        const [element] = getElementFromCurrentSelection(editor);
        const type = element.type;
        setSelected(LABELS[type] ? type : BLOCKS.PARAGRAPH);
    }, [
        editor?.operations,
        editor?.selection
    ]); // eslint-disable-line -- TODO: explain this disable
    const [nodeTypesByEnablement, someHeadingsEnabled] = React.useMemo(()=>{
        const nodeTypesByEnablement = Object.fromEntries(Object.keys(LABELS).map((nodeType)=>[
                nodeType,
                isNodeTypeEnabled(sdk.field, nodeType)
            ]));
        const someHeadingsEnabled = Object.values(nodeTypesByEnablement).filter(Boolean).length > 0;
        return [
            nodeTypesByEnablement,
            someHeadingsEnabled
        ];
    }, [
        sdk.field
    ]);
    function handleOnSelectItem(type) {
        return (event)=>{
            event.preventDefault();
            if (!editor?.selection) return;
            setSelected(type);
            setOpen(false);
            const prevOnChange = editor.onChange;
            /*
       The focus might happen at point in time when
       `toggleElement` (helper for toggleNodeType) changes aren't rendered yet, causing the browser
       to place the cursor at the start of the text.
       We wait for the change event before focusing
       the editor again. This ensures the cursor is back at the previous
       position.*/ editor.onChange = (...args)=>{
                focus(editor);
                editor.onChange = prevOnChange;
                prevOnChange(...args);
            };
            const isActive = isBlockSelected(editor, type);
            editor.tracking.onToolbarAction(isActive ? 'remove' : 'insert', {
                nodeType: type
            });
            toggleElement(editor, {
                activeType: type,
                inactiveType: type
            });
        };
    }
    if (!editor) return null;
    return /*#__PURE__*/ React.createElement(Menu, {
        isOpen: isOpen,
        onClose: ()=>setOpen(false)
    }, /*#__PURE__*/ React.createElement(Menu.Trigger, null, /*#__PURE__*/ React.createElement(Button, {
        size: "small",
        testId: "toolbar-heading-toggle",
        variant: "transparent",
        endIcon: /*#__PURE__*/ React.createElement(ChevronDownIcon, null),
        isDisabled: props.isDisabled,
        onClick: ()=>someHeadingsEnabled && setOpen(!isOpen)
    }, LABELS[selected])), /*#__PURE__*/ React.createElement(Menu.List, {
        testId: "dropdown-heading-list"
    }, ' ', Object.keys(LABELS).map((nodeType)=>nodeTypesByEnablement[nodeType] && /*#__PURE__*/ React.createElement(Menu.Item, {
            key: nodeType,
            isInitiallyFocused: selected === nodeType,
            onClick: handleOnSelectItem(nodeType),
            testId: `dropdown-option-${nodeType}`,
            disabled: props.isDisabled
        }, /*#__PURE__*/ React.createElement("span", {
            className: cx(styles.dropdown.root, styles.dropdown[nodeType])
        }, LABELS[nodeType]))).filter(Boolean)));
}
