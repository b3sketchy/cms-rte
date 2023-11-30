import * as React from 'react';
import constate from 'constate';
function useSdk({ sdk }) {
    const sdkMemo = React.useMemo(()=>sdk, []); // eslint-disable-line -- TODO: explain this disable
    return sdkMemo;
}
export const [SdkProvider, useSdkContext] = constate(useSdk);
