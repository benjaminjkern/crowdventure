import React from "react";

const CrowdventureCheckboxInput = ({
    label,
    onChange = () => {},
    checked = false,
    ...props
}) => {
    const appliedProps = {};

    if (checked.type === "statelessValue") {
        appliedProps.value = checked.initialValue;
        appliedProps.ref = checked.ref;
        checked.getValue = () => checked.ref.current.checked;
    }
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
