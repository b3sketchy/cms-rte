import * as React from 'react';
import { Text } from '@contentful/f36-components';
import { useContentfulEditor } from '../../../ContentfulEditorProvider';
import { findNodePath, isChildPath } from '../../../internal/queries';
import { useSdkContext } from '../../../SdkProvider';
import { useLinkTracking } from '../../links-tracking';
import { useEntityInfo } from '../useEntityInfo';
import { handleEditLink, handleRemoveLink } from './linkHandlers';
import { LinkPopover } from './LinkPopover';
import { styles } from './styles';
export function EntityHyperlink(props) {
    const editor = useContentfulEditor();
    const sdk = useSdkContext();
    const focus = editor.selection?.focus;
    const { target } = props.element.data;
    const { onEntityFetchComplete } = useLinkTracking();
    const pathToElement = findNodePath(editor, props.element);
    const isLinkFocused = pathToElement && focus && isChildPath(focus.path, pathToElement);
    const tooltipContent = useEntityInfo({
        target,
        sdk,
        onEntityFetchComplete
    });
    if (!target) {
        return null;
    }
    const popoverText = /*#__PURE__*/ React.createElement(Text, {
        fontColor: "blue600",
        fontWeight: "fontWeightMedium",
        className: styles.openLink
    }, tooltipContent);
    return /*#__PURE__*/ React.createElement(LinkPopover, {
        isLinkFocused: isLinkFocused,
        handleEditLink: ()=>handleEditLink(editor, sdk, pathToElement),
        handleRemoveLink: ()=>handleRemoveLink(editor),
        popoverText: popoverText
    }, /*#__PURE__*/ React.createElement(Text, {
        testId: "cf-ui-text-link",
        fontColor: "blue600",
        fontWeight: "fontWeightMedium",
        className: styles.hyperlink,
        "data-link-type": target.sys.linkType,
        "data-link-id": target.sys.id
    }, props.children));
}
