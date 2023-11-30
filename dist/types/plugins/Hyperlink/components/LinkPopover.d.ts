import * as React from 'react';
type LinkPopoverProps = {
    isLinkFocused: boolean | undefined;
    popoverText: React.ReactNode;
    handleEditLink: () => void;
    handleRemoveLink: () => void;
    children: React.ReactNode;
    handleCopyLink?: () => void;
};
export declare const LinkPopover: ({ isLinkFocused, popoverText, handleEditLink, handleRemoveLink, children, handleCopyLink, }: LinkPopoverProps) => React.JSX.Element;
export {};
