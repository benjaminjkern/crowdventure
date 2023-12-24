import React, { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import { type FormElement } from "../hooks";

const CrowdventureCheckboxInput = ({
    formElement,
    label,
    onChange = () => {},
    ...props
}: {
    readonly formElement?: FormElement;
    readonly label: string;
    readonly onChange?: (b: boolean) => void;
} & DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>) => (
    <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {label}
        <input
            defaultChecked={formElement?.defaultValue as boolean}
            onChange={(e) => {
                onChange(e.target.checked);
                formElement?.setValue(e.target.checked);
            }}
            type="checkbox"
            {...props}
        />
    </div>
);
export default CrowdventureCheckboxInput;
