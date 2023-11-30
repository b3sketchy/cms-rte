import React from 'react';
import { css } from 'emotion';
import { IS_CHROME } from '../../helpers/environment';
import { getLinkEntityId } from './utils';
const styles = {
    root: css({
        marginBottom: '1.25rem !important',
        display: 'block'
    }),
    container: css({
        // The next 2 properties ensure Entity card won't be aligned above
        // a list item marker (i.e. bullet)
        display: 'inline-block',
        verticalAlign: 'text-top',
        width: '100%'
    })
};
export function LinkedBlockWrapper({ attributes, card, children, link }) {
    return /*#__PURE__*/ React.createElement("div", {
        ...attributes,
        className: styles.root,
        "data-entity-type": link.sys.linkType,
        "data-entity-id": getLinkEntityId(link),
        // COMPAT: This makes copy & paste work for Firefox
        contentEditable: IS_CHROME ? undefined : false,
        draggable: IS_CHROME ? true : undefined
    }, /*#__PURE__*/ React.createElement("div", {
        // COMPAT: This makes copy & paste work for Chromium/Blink browsers and Safari
        contentEditable: IS_CHROME ? false : undefined,
        draggable: IS_CHROME ? true : undefined,
        className: styles.container
    }, card), children);
}
