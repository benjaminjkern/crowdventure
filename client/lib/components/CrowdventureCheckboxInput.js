import React from "react";

const CrowdventureCheckboxInput = ({ label, onChange, ...props }) => {
    return (
        <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {label}
            <input
                type="checkbox"
                onChange={(e) => {
                    onChange(e.target.checked);
                }}
                {...props}
            />
        </div>
    );
};

export default CrowdventureCheckboxInput;
