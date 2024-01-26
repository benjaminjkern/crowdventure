import React, { type ReactNode, useContext, useState } from "react";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { PaletteContext } from "../colorPalette";
import { useBlur } from "../hooks";

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

    const ref = useBlur<HTMLDivElement>(() => setOpen(false));

    return (
        <div ref={ref} style={{ position: "relative", zIndex: 1 }}>
            <CrowdventureTextInput
                includeClearButton
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
                        top: 2, // Put this at two because for some reason on mobile it was showing 2 pixels above where it should have been
                        alignItems: "center",
                        padding: 5,
                        paddingTop: 36.5,
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
