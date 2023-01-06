import React from "react";

const CrowdventureCheckboxInput = ({ label, onChange, ...props }) => {
    return (
        <>
            <input
                type="checkbox"
                onChange={(e) => {
                    onChange(e.target.checked);
                }}
                {...props}
            />
            {label}
        </>
    );
};

export default CrowdventureCheckboxInput;
