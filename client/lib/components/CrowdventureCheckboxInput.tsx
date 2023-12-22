import React from "react";

const CrowdventureCheckboxInput = ({
    label,
    onChange = () => {},
    checked = false,
    ...props
}: {
    readonly label: string;
    readonly onChange?: (b: boolean) => void;
    readonly checked: boolean;
}) => {
    // TODO: Make this work with the nicer form element I made
    const appliedProps = { checked };
    return (
        <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {label}
            <input
                onChange={(e) => {
                    onChange(e.target.checked);
                }}
                type="checkbox"
                {...appliedProps}
                {...props}
            />
        </div>
    );
};

export default CrowdventureCheckboxInput;
