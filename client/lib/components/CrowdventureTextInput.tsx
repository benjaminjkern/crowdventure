import React, {
    type CSSProperties,
    useContext,
    type DetailedHTMLProps,
    type InputHTMLAttributes,
    type TextareaHTMLAttributes,
    type ChangeEvent,
    type KeyboardEvent,
} from "react";
import { PaletteContext } from "../colorPalette";
import { type FormElement } from "../hooks";
import EventListener, { type EventListenerPair } from "./EventListener";

const CrowdventureTextInput = ({
    formElement,
    onChangeText = () => {},
    style = {},
    rows = 1,
    onPressEnter = () => {},
    ...props
}: {
    readonly formElement?: FormElement;
    readonly onChangeText?: (s: string) => void;
    readonly style?: CSSProperties;
    readonly rows?: number;
    readonly onPressEnter?: () => void;
} & (
    | DetailedHTMLProps<
          TextareaHTMLAttributes<HTMLTextAreaElement>,
          HTMLTextAreaElement
      >
    | DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
)) => {
    const { backgroundColor, lightBackgroundColor, textColor } =
        useContext(PaletteContext);

    return (
        <EventListener event="focus">
            {([focus, listener]: EventListenerPair) => {
                const appliedProps = {
                    onChange: (
                        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                    ) => {
                        onChangeText(e.target.value);
                        if (formElement) formElement.setValue(e.target.value);
                    },
                    onKeyDown: (
                        e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                        if (e.key === "Enter") onPressEnter();
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
                        outline: focus ? "none" : undefined,
                        ...style,
                    },
                    defaultValue: formElement?.defaultValue,
                    rows,
                    ...listener,
                    ...props,
                };
                // @ts-ignore
                if (rows > 1) return <textarea {...appliedProps} />;
                // @ts-ignore
                return <input {...appliedProps} />;
            }}
        </EventListener>
    );
};

export default CrowdventureTextInput;
