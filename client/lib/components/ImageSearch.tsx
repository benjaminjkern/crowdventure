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
    { unsafe: boolean },
    PaletteType
>(({ lightBackgroundColor }: PaletteType) => ({
    imageClass: ({ unsafe }) => ({
        padding: 10,
        position: "relative",
        flex: 1,
        height: "100%",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: lightBackgroundColor,
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
    readonly image: BingImage;
    readonly onClick: (m: MouseEvent) => unknown;
}) => {
    const { imageClass } = useStyles({ unsafe: !image.isFamilyFriendly });
    return (
        <div className={imageClass} onClick={onClick}>
            {!image.isFamilyFriendly && (
                <TooltipWrapper
                    tooltip={
                        <span>
                            This picture will automatically flag this page as
                            hidden!
                        </span>
                    }
                >
                    <FontAwesomeIcon
                        color="red"
                        icon={faWarning}
                        style={{
                            position: "absolute",
                            top: 5,
                            left: 5,
                            zIndex: 1,
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

    const [query, setQuery] = useState("");

    const PAGESIZE = 20;
    const MAXROWLENGTH = 2;

    // TODO: Add this stuff for filtering out accidental bad images
    // const checkImage = async (image: BingImage) => {
    //     if (!image.isFamilyFriendly && !unsafeMode) return false;
    //     return await new Promise((resolve) => {
    //         const img = new Image();
    //         img.onload = () => {
    //             resolve(image);
    //         };
    //         img.onerror = () => {
    //             // console.warn(image);
    //             resolve(false);
    //         };
    //         img.src = image.contentUrl;
    //     });
    // };

    // const filterImages = async (images) => {
    //     const validImages = (
    //         await Promise.all(images.map((image) => checkImage(image)))
    //     ).filter((image) => image);

    //     return { filteredImages: validImages };
    // };

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
            .then((response) => {
                setImages(response.data.value);
            })
            .catch(console.error);
    });

    const rows = splitIntoRows(images, MAXROWLENGTH);

    return (
        <SearchDropdown
            onChangeText={(newQuery) => {
                // if (newQuery.length === 0) return selectNode(null);
                setQuery(newQuery);
                // setFetching(true);
                // searchNodes(newQuery);

                if (newQuery.length > 0) fetchImages(newQuery);
            }}
            placeholder="Search for an image..."
            query={query}
        >
            {rows.map((row, r) => (
                <div
                    key={r}
                    style={{
                        height: 150,
                        width: "100%",
                        flexDirection: "row",
                    }}
                >
                    {row.map((image, i) => (
                        <ImageResult
                            image={image}
                            key={i}
                            onClick={() => {
                                onSelectImage(
                                    image.contentUrl,
                                    image.isFamilyFriendly
                                );
                            }}
                        />
                    ))}
                </div>
            ))}
        </SearchDropdown>
    );
};

export default ImageSearch;
