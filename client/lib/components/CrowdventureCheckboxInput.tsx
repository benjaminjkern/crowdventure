import React, {
    type CSSProperties,
    useContext,
    useEffect,
    useState,
} from "react";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { type FormElement } from "../hooks";
import { PaletteContext, type PaletteType } from "../colorPalette";
import { nonSelectableTextStyle } from "../styles";

const useStyles = createUseStyles<
    "checkbox",
    { checked: boolean },
    PaletteType
>(({ backgroundColor, rootColor }: PaletteType) => ({
    checkbox: ({ checked }) => ({
        flexDirection: "row",
        justifyContent: "space-between",
        ...nonSelectableTextStyle,
        "& div": {
            backgroundColor: checked ? rootColor[1] : backgroundColor[0],
        },
        "&:hover div": {
            backgroundColor: checked ? rootColor[2] : backgroundColor[2],
        },

        "&:active div": {
            backgroundColor: rootColor[0],
        },
    }),
}));

const CrowdventureCheckboxInput = ({
    formElement,
    label,
    onCheck = () => {},
    checked: initChecked,
    style,
}: {
    readonly formElement?: FormElement;
    readonly label: string;
    readonly onCheck?: (b: boolean) => unknown;
    readonly checked?: boolean;
    readonly style?: CSSProperties;
}) => {
    const [checked, setChecked] = useState(
        initChecked || ((formElement?.defaultValue ?? false) as boolean)
    );
    const { checkbox } = useStyles({ checked });

    useEffect(() => {
        if (initChecked !== undefined) setChecked(initChecked);
    }, [initChecked]);
    return (
        <div
            className={checkbox}
            onClick={() => {
                setChecked(!checked);
                onCheck(!checked);
                formElement?.setValue(!checked);
            }}
            style={style}
        >
            {label}
            <div
                style={{
                    width: 25,
                    height: 25,
                    padding: 5,
                    borderRadius: 5,
                }}
            >
                <FontAwesomeIcon icon={faCheck} />
            </div>
        </div>
    );
};
export default CrowdventureCheckboxInput;
