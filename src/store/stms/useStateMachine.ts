import { StateMachineInterface } from 'redux-sigma';
import { useDispatch } from 'react-redux';
import { useDeepCompareLayoutEffect } from './useDeepCompareLayoutEffect';

export function useStateMachine<SM extends string, C>(
    stm: StateMachineInterface<any, SM, C>,
    context: C
): void {
    const dispatch = useDispatch();

    useDeepCompareLayoutEffect(() => {
        dispatch(stm.start(context));

        return () => {
            dispatch(stm.stop());
        };
    }, [dispatch, stm, context]);
}