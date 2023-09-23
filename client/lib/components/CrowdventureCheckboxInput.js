import React from "react";

const CrowdventureCheckboxInput = ({ label, onChange, ...props }) => (
    <div style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {label}
        <input
            onChange={(e) => {
                onChange(e.target.checked);
            }}
            type="checkbox"
            {...props}
        />
    </div>
);

export default CrowdventureCheckboxInput;
