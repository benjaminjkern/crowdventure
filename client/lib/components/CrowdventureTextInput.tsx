import React, {
    type CSSProperties,
    type DetailedHTMLProps,
    type InputHTMLAttributes,
    type TextareaHTMLAttributes,
    type ChangeEvent,
    type KeyboardEvent,
    useRef,
} from "react";
import { createUseStyles } from "react-jss";
import { type PaletteType } from "../colorPalette";
import { type FormElement } from "../hooks";
import CloseButton from "./CloseButton";

const useStyles = createUseStyles<
    "textInputStyle",
    { disabled: boolean },
    PaletteType
>(({ lightBackgroundColor, backgroundColor, textColor }: PaletteType) => ({
    textInputStyle: {
        backgroundColor: backgroundColor[2],
        color: ({ disabled }) => (disabled ? "gray" : textColor),
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
}));

const CrowdventureTextInput = ({
    formElement,
    onChangeText = () => {},
    style = {},
    rows = 1,
    onPressEnter = () => {},
    includeClearButton = false,
    ...props
}: {
    readonly formElement?: FormElement;
    readonly onChangeText?: (s: string) => void;
    readonly style?: CSSProperties;
    readonly rows?: number;
    readonly onPressEnter?: () => void;
    readonly includeClearButton?: boolean;
} & (
    | DetailedHTMLProps<
          TextareaHTMLAttributes<HTMLTextAreaElement>,
          HTMLTextAreaElement
      >
    | DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
)) => {
    const { textInputStyle } = useStyles({ disabled: props.disabled ?? false });
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
    const ref = useRef<HTMLInputElement>();

    if (rows > 1) {
        if (includeClearButton)
            console.error(
                "Clear button isn't available for multiline text inputs!"
            );
        // @ts-ignore
        return <textarea {...appliedProps} />;
    }
    return (
        <div style={{ position: "relative" }}>
            {/* @ts-ignore */}
            <input {...appliedProps} ref={ref} />
            {ref.current?.value && includeClearButton ? (
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        paddingRight: 7,
                        pointerEvents: "none",
                    }}
                >
                    <CloseButton
                        onClick={() => {
                            if (ref.current) {
                                ref.current.value = "";
                                ref.current.focus();
                            }
                            onChangeText("");
                            if (formElement) formElement.setValue("");
                        }}
                        style={{ pointerEvents: "auto" }}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default CrowdventureTextInput;
