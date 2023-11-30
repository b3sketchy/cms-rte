import React, { ReactNode } from 'react';
type StickyToolbarProps = {
    isDisabled?: boolean;
    children: ReactNode;
};
declare const StickyToolbarWrapper: ({ isDisabled, children }: StickyToolbarProps) => React.JSX.Element;
export default StickyToolbarWrapper;
