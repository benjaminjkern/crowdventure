import React, {
    type CSSProperties,
    useContext,
    type DetailedHTMLProps,
    type InputHTMLAttributes,
    type TextareaHTMLAttributes,
    type ChangeEvent,
    type MouseEventHandler,
} from "react";
import { PaletteContext } from "../colorPalette";
import EventListener, { type EventListenerPair } from "./EventListener";
import { type FormElement } from "../hooks";

const CrowdventureTextInput = ({
    formElement,
    onChangeText = () => {},
    style = {},
    rows = 1,
    ...props
}: {
    formElement?: FormElement;
    onChangeText?: (e: string) => void;
    style?: CSSProperties;
    rows?: number;
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
