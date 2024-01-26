import React, { type ReactNode, useContext, useState } from "react";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { PaletteContext } from "../colorPalette";

const SearchDropdown = ({
    children,
    query,
    onChangeText,
    placeholder,
    height = 300,
}: {
    readonly children: ReactNode;
    readonly query: string;
    readonly onChangeText: (s: string) => unknown;
    readonly placeholder?: string;
    readonly height?: number;
}) => {
    const [open, setOpen] = useState(false);
    const { backgroundColor } = useContext(PaletteContext);

    return (
        <div style={{ position: "relative", zIndex: 1 }}>
            <CrowdventureTextInput
                includeClearButton
                onBlur={() => setTimeout(() => setOpen(false), 100)} // Delay this so it can register a click
                onChangeText={(newQuery) => {
                    if (newQuery.length === 0) {
                        setOpen(false);
                        onChangeText("");
                        return;
                    }
                    setOpen(true);
                    onChangeText(newQuery);
                }}
                onFocus={() => {
                    if (query.length > 0) setOpen(true);
                }}
                placeholder={placeholder}
                value={query}
            />
            {open ? (
                <div
                    style={{
                        maxHeight: height,
                        overflowY: "scroll",
                        overflowX: "hidden",
                        position: "absolute",
                        alignItems: "center",
                        padding: 5,
                        paddingTop: 33,
                        width: "100%",
                        zIndex: -1,
                        borderRadius: 10,
                        backgroundColor: backgroundColor[0],
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    {children}
                </div>
            ) : null}
        </div>
    );
};

export default SearchDropdown;
