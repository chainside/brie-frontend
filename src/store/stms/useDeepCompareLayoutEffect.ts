import { useLayoutEffect, useRef } from 'react';
import { dequal } from 'dequal';

type UseLayoutEffectParams = Parameters<typeof useLayoutEffect>;
type LayoutEffectCallback = UseLayoutEffectParams[0];
type DependencyList = UseLayoutEffectParams[1];
type UseLayoutEffectReturn = ReturnType<typeof useLayoutEffect>;

function useDeepCompareMemoize(value: DependencyList) {
    const ref = useRef<DependencyList>();

    const signalRef = useRef<number>(0);

    if (!dequal(value, ref.current)) {
        ref.current = value;
        signalRef.current += 1;
    }

    return [signalRef.current];
}

export function useDeepCompareLayoutEffect(
    callback: LayoutEffectCallback,
    dependencies: DependencyList
): UseLayoutEffectReturn {
    return useLayoutEffect(callback, useDeepCompareMemoize(dependencies));
}