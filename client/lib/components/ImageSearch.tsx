import React, { useContext, useState, type MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { createUseStyles } from "react-jss";
import { UnsafeModeContext } from "../unsafeMode";
import { splitIntoRows } from "../utils";
import { useDebounce } from "../hooks";
import { type PaletteType } from "../colorPalette";
import { blurImageStyle } from "../styles";
import TooltipWrapper from "./TooltipWrapper";
import SearchDropdown from "./SearchDropdown";

const useStyles = createUseStyles<
    "imageClass",
    { unsafe: boolean; exists: boolean },
    PaletteType
>(({ lightBackgroundColor }: PaletteType) => ({
    imageClass: ({ unsafe, exists }) => ({
        padding: 10,
        position: "relative",
        flex: 1,
        height: "100%",
        cursor: exists ? "pointer" : undefined,
        "&:hover": {
            backgroundColor: exists ? lightBackgroundColor : undefined,
        },
        borderRadius: 5,
        "& img": {
            ...blurImageStyle(unsafe, 10),
            transition: "-webkit-filter 0.5s, filter 0.5s",
        },
        "&:hover img": {
            ...blurImageStyle(unsafe, 0),
        },
    }),
}));

type BingImage = {
    contentUrl: string;
    thumbnailUrl: string;
    isFamilyFriendly: boolean;
};

const BING_API_KEY = process.env.BING_API_KEY;

const ImageResult = ({
    image,
    onClick,
}: {
    readonly image: BingImage | null;
    readonly onClick: (m: MouseEvent) => unknown;
}) => {
    const { imageClass } = useStyles({
        unsafe: !image?.isFamilyFriendly,
        exists: Boolean(image),
    });
    return (
        <div className={imageClass} onClick={onClick}>
            {image ? (
                <>
                    {!image.isFamilyFriendly && (
                        <TooltipWrapper
                            tooltip={
                                <span>
                                    This picture will automatically flag this
                                    page as hidden!
                                </span>
                            }
                            tooltipStyle={{ top: 0 }}
                        >
                            <FontAwesomeIcon
                                color="red"
                                icon={faWarning}
                                style={{
                                    position: "absolute",
                                    top: 5,
                                    left: 5,
                                    zIndex: 1,
                                    width: 20,
                                }}
                            />
                        </TooltipWrapper>
                    )}
                    <img
                        src={image.thumbnailUrl}
                        style={{
                            marginRight: 10,
                            borderRadius: 4,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </>
            ) : null}
        </div>
    );
};

const ImageSearch = ({
    onSelectImage,
}: {
    readonly onSelectImage: (url: string, familyFriendly: boolean) => unknown;
}) => {
    const { unsafeMode } = useContext(UnsafeModeContext);

    const [images, setImages] = useState<BingImage[]>([]);
    const [fetching, setFetching] = useState(false);
    const [query, setQuery] = useState("");

    const PAGESIZE = 20;
    const MAXROWLENGTH = 2;

    const checkImage = async (image: BingImage): Promise<BingImage | null> => {
        if (!image.isFamilyFriendly && !unsafeMode) return null;
        return await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve(image);
            };
            img.onerror = () => {
                resolve(null);
            };
            img.src = image.contentUrl;
        });
    };

    const fetchImages = useDebounce((newQuery) => {
        axios
            .get<{
                value: BingImage[];
            }>(`https://api.bing.microsoft.com/v7.0/images/search`, {
                params: {
                    q: newQuery,
                    safeSearch: unsafeMode ? "Off" : "Strict",
                    count: PAGESIZE,
                },
                headers: {
                    "Ocp-Apim-Subscription-Key": BING_API_KEY,
                },
            })
            .then(async (response) => {
                setImages(
                    (
                        await Promise.all(response.data.value.map(checkImage))
                    ).filter((image) => image) as BingImage[]
                );
                setFetching(false);
            })
            .catch(console.error);
    });

    const rows = splitIntoRows(images, MAXROWLENGTH);

    return (
        <SearchDropdown
            height={500}
            onChangeText={(newQuery) => {
                // if (newQuery.length === 0) return selectNode(null);
                setQuery(newQuery);

                if (newQuery.length === 0) return;
                setFetching(true);
                fetchImages(newQuery);
            }}
            placeholder="Search for an image..."
            query={query}
        >
            {rows.length ? (
                rows.map((row, r) => (
                    <div
                        key={r}
                        style={{
                            height: 150,
                            width: "100%",
                            flexDirection: "row",
                        }}
                    >
                        {(row.length === 2
                            ? row
                            : ([row[0], null] as (BingImage | null)[])
                        ).map((image, i) => (
                            <ImageResult
                                image={image}
                                key={i}
                                onClick={() => {
                                    if (!image) return;
                                    onSelectImage(
                                        image.contentUrl,
                                        image.isFamilyFriendly
                                    );
                                }}
                            />
                        ))}
                    </div>
                ))
            ) : fetching ? (
                <>Loading...</>
            ) : (
                <>No results!</>
            )}
        </SearchDropdown>
    );
};

export default ImageSearch;
