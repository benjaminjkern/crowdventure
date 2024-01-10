import React, {
    type CSSProperties,
    type DetailedHTMLProps,
    type InputHTMLAttributes,
    type TextareaHTMLAttributes,
    type ChangeEvent,
    type KeyboardEvent,
} from "react";
import { createUseStyles } from "react-jss";
import { type PaletteType } from "../colorPalette";
import { type FormElement } from "../hooks";

const useStyles = createUseStyles(
    ({ lightBackgroundColor, backgroundColor, textColor }: PaletteType) => ({
        textInputStyle: {
            backgroundColor: backgroundColor[2],
            color: textColor,
            border: `1px solid ${lightBackgroundColor}`,
            padding: 5,
            borderRadius: 5,
            width: "100%",
            resize: "vertical",
            "&:focus": {
                outline: "none",
                backgroundColor: lightBackgroundColor,
            },
        },
    })
);

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
    const { textInputStyle } = useStyles();
    const appliedProps = {
        onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            onChangeText(e.target.value);
            if (formElement) formElement.setValue(e.target.value);
        },
        onKeyDown: (
            e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            if (e.key === "Enter") onPressEnter();
        },
        style,
        defaultValue: formElement?.defaultValue,
        rows,
        className: textInputStyle,
        ...props,
    };

    // @ts-ignore
    if (rows > 1) return <textarea {...appliedProps} />;
    // @ts-ignore
    return <input {...appliedProps} />;
};

export default CrowdventureTextInput;
