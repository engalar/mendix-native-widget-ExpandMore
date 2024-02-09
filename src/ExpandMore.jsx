import { createElement, useCallback } from "react";

import { Badge } from "./components/Badge";
import App from "./components/app";

export function ExpandMore({ value, style, onClick }) {
    const onClickHandler = useCallback(() => {
        if (onClick && onClick.canExecute && !onClick.isExecuting) {
            onClick.execute();
        }
    }, [onClick]);

    // return <Badge style={style} onClick={onClickHandler} value={value?.displayValue || "Default"} />;
    return <App></App>;
}
