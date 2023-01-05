import React, { useState, useEffect, createRef } from "react";
import ActionCard from "./ActionCard";

// import EditChoiceModal from "../Modals/EditChoiceModal";

const ChoiceColumns = ({ choices }) => {
    if (choices.length === 0) return <></>;

    return (
        <div>
            {choices.map((choice, idx) => {
                return <ActionCard choice={choice} key={idx} />;
            })}
        </div>
    );
};

export default ChoiceColumns;
