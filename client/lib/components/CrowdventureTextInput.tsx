import React, {
    type CSSProperties,
    useContext,
    type DetailedHTMLProps,
    type InputHTMLAttributes,
    type TextareaHTMLAttributes,
    type ChangeEvent,
} from "react";
import { PaletteContext } from "../colorPalette";
import { type FormElement } from "../hooks";
import EventListener, { type EventListenerPair } from "./EventListener";

const CrowdventureTextInput = ({
    formElement,
    onChangeText = () => {},
    style = {},
    rows = 1,
    ...props
}: {
    readonly formElement?: FormElement;
    readonly onChangeText?: (e: string) => void;
    readonly style?: CSSProperties;
    readonly rows?: number;
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
