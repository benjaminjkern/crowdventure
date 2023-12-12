import React, { useContext } from "react";
import { PaletteContext } from "../colorPalette";
import EventListener from "./EventListener";

const CrowdventureTextInput = ({
    formElement,
    onChangeText = () => {},
    style = {},
    rows = 1,
    ...props
}) => {
    const { backgroundColor, lightBackgroundColor, textColor } =
        useContext(PaletteContext);

    return (
        <EventListener event="focus">
            {([focus, listener]) => {
                const appliedProps = {
                    onChange: (e) => {
                        onChangeText(e.target.value);
                        if (formElement) formElement.setValue(e.target.value);
                    },
                    style: {
                        backgroundColor: focus
                            ? lightBackgroundColor
                            : backgroundColor[2],
                        color: textColor,
                        border: `1px solid ${lightBackgroundColor}`,
                        padding: 5,
                        borderRadius: 5,
                        width: "100%",
                        resize: "vertical",
                        outline: focus ? "none" : null,
                        ...style,
                    },
                    defaultValue: formElement?.defaultValue,
                    rows,
                    ...listener,
                    ...props,
                };
                if (rows > 1) return <textarea {...appliedProps} />;
                return <input {...appliedProps} />;
            }}
        </EventListener>
    );
};

export default CrowdventureTextInput;
