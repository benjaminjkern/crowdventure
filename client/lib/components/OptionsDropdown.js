import React from "react";

const OptionsDropdown = ({ dropdownOptions }) => (
    <div
        // variant={
        //     loggedInAs && loggedInAs.unsafeMode ? "secondary" : "light"
        // }
        style={{
            position: "absolute",
            top: 0,
            right: 0,
        }}
    >
        {dropdownOptions.map(
            ({ active = true, disabled = false, onClick, text }, i) => (
                <div key={i}>{text}</div>
            )
        )}
    </div>
);
export default OptionsDropdown;
