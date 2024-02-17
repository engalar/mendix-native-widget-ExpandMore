import {
    Easing,
    Value,
    cond,
    debug,
    block,
    startClock,
    stopClock,
    clockRunning,
    spring,
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
        duration: 300,
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

export function runSpring(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(value),
        velocity: new Value(0),
        time: new Value(0)
    };

    const config = {
        damping: 9, // 调整弹簧阻尼，数值越大阻尼越大
        mass: 0.5, // 调整弹簧的质量
        stiffness: 80, // 调整弹簧的刚度
        overshootClamping: false,
        toValue: new Value(dest)
    };

    return block([
        cond(clockRunning(clock), 0, startClock(clock)),
        spring(clock, state, config),
        cond(state.finished, debug("stop clock", stopClock(clock))),
        state.position
    ]);
}
