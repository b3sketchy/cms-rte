import * as React from 'react';
import { TextLink } from '@contentful/f36-components';
import { useContentfulEditor } from '../../../ContentfulEditorProvider';
import { findNodePath, isChildPath } from '../../../internal/queries';
import { useSdkContext } from '../../../SdkProvider';
import { handleCopyLink, handleEditLink, handleRemoveLink } from './linkHandlers';
import { LinkPopover } from './LinkPopover';
import { styles } from './styles';
export function UrlHyperlink(props) {
    const editor = useContentfulEditor();
    const sdk = useSdkContext();
    const focus = editor.selection?.focus;
    const uri = props.element.data?.uri;
    const pathToElement = findNodePath(editor, props.element);
    const isLinkFocused = pathToElement && focus && isChildPath(focus.path, pathToElement);
    const popoverText = /*#__PURE__*/ React.createElement(TextLink, {
        className: styles.openLink,
        href: uri,
        rel: "noopener noreferrer",
        target: "_blank"
    }, uri);
    return /*#__PURE__*/ React.createElement(LinkPopover, {
        isLinkFocused: isLinkFocused,
        handleEditLink: ()=>handleEditLink(editor, sdk, pathToElement),
        handleRemoveLink: ()=>handleRemoveLink(editor),
        handleCopyLink: ()=>handleCopyLink(uri),
        popoverText: popoverText
    }, /*#__PURE__*/ React.createElement(TextLink, {
        testId: "cf-ui-text-link",
        href: uri,
        onClick: (e)=>e.preventDefault(),
        className: styles.hyperlink
    }, props.children));
}
