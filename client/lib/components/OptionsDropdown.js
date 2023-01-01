import React from "react";

const OptionsDropdown = ({ dropdownOptions }) => {
    return (
        <div
            // variant={
            //     loggedInAs && loggedInAs.unsafeMode ? "secondary" : "light"
            // }
            style={{
                position: "absolute",
                top: 0,
                right: 0,
            }}
            // size="sm"
            // drop="right"
            // title={<span className="fa">&#xf013;</span>}
        >
            {dropdownOptions.map(({ active, disabled, onClick, text }, i) => (
                <div key={i}>{text}</div>
            ))}
        </div>
    );
};
export default OptionsDropdown;
