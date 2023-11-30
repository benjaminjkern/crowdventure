import React from "react";

// All this really does is provide a nicer onChangeText feature. There might be more later.

const CrowdventureTextInput = ({ onChangeText, ...props }) => (
    <input onChange={(e) => onChangeText(e.target.value)} {...props} />
);

export default CrowdventureTextInput;
