import React from "react";

const ParagraphText = ({ text }) => {
    if (!text) return null;

    return (
        <div style={{ gap: 20 }}>
            {text.split("\n").map((line, i) => (
                <div
                    key={i}
                    style={{
                        // justifyContent: ''
                        textAlign: "justify",
                        textIndent: "5%",
                    }}
                >
                    {line}
                </div>
            ))}
        </div>
    );
};

export default ParagraphText;
