import {
    Easing,
    Value,
    cond,
    debug,
    block,
    startClock,
    stopClock,
    clockRunning,
    timing
} from "react-native-reanimated";

export function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(value),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 800,
        toValue: new Value(dest),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        // cond(and(state.finished, eq(state.position, dest)), [...reset, set(config.toValue, value)]),
        cond(clockRunning(clock), 0, startClock(clock)),
        timing(clock, state, config),
        cond(state.finished, debug("stop clock", stopClock(clock))),
        state.position
    ]);
}
