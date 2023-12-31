import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";
import { splitIntoRows } from "../utils";
import CrowdventureTextInput from "./CrowdventureTextInput";
import TooltipWrapper from "./TooltipWrapper";
import UnsafeImage from "./UnsafeImage";

// Should hide this
const BING_API_KEY = "8300cebe5f0d452a9ccb4bca67af4659";

const ImageSearch = ({ onSelectImage }) => {
    const { user } = useContext(UserContext);
    // const { unsafeMode } = useContext(UnsafeModeContext);
    const unsafeMode = useContext(UnsafeModeContext);

    const [fetching, setFetching] = useState(undefined);
    const [fetchResults, setFetchResults] = useState(undefined);
    const [images, setImages] = useState([]);
    const [atEnd, setAtEnd] = useState(false);

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const PAGESIZE = 20;
    const MAXROWLENGTH = 2;
    const MIN_SEARCH_LENGTH = 2;

    const checkImage = (image) => {
        if (!image.isFamilyFriendly && !unsafeMode) return false;
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve(image);
            };
            img.onerror = () => {
                // console.warn(image);
                resolve(false);
            };
            img.src = image.thumbnailUrl;
        });
    };

    const filterImages = async (images) => {
        const validImages = (
            await Promise.all(images.map((image) => checkImage(image)))
        ).filter((image) => image);

        return { filteredImages: validImages };
    };

    useEffect(() => {
        if (query.length < MIN_SEARCH_LENGTH) {
            setOpen(false);
            setFetching(undefined);
            return;
        }
        setOpen(true);
        setTimeout(() => {
            setFetching(query);
        }, 1000);
    }, [query]);

    useEffect(() => {
        if (!fetching) return;
        if (fetching !== query) return;
        fetchImages(fetching).then((newImages) => {
            setFetchResults({ newImages, fetching });
            setFetching(undefined);
        });
    }, [fetching]);

    useEffect(() => {
        if (!fetchResults) return;
        if (fetchResults.fetching !== query) return;
        setImages(fetchResults.newImages);
        setFetchResults(undefined);
    }, [fetchResults]);

    const fetchImages = (query, amount = PAGESIZE, offset = 0) =>
        fetch(
            `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${encodeURIComponent(
                query
            )}&count=${amount}&safeSearch=${
                unsafeMode ? "Off" : "Strict"
            }&offset=${offset}`,
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": BING_API_KEY,
                },
            }
        )
            .then((data) => data.json())
            .then(({ value, error, ...rest }) => {
                if (error?.code === 429) return { error };
                if (!value) return { error: "Something went wrong!" };
                // return new Promise(resolve => {
                //         setTimeout(() => resolve(fetchImages(query, amount, offset)), 5000);
                //     })
                // console.log(value, rest);
                return filterImages(value);
            })
            .then(async ({ filteredImages, error }) => {
                if (error) return [];
                if (filteredImages.length === amount) return filteredImages;
                return [
                    ...filteredImages,
                    // ...(await fetchImages({
                    //     query,
                    //     amount: amount - filteredImages.length,
                    //     offset: offset + amount}
                    // )),
                ];
            });

    const rows = splitIntoRows(images, MAXROWLENGTH);

    return (
        <>
            <CrowdventureTextInput
                onChangeText={setQuery}
                placeholder="Search for an image..."
                value={query}
            />
            {open ? (
                <div style={{ height: 350, overflow: "scroll" }}>
                    {fetching || fetchResults ? "Loading..." : null}
                    {rows.map((row, r) => (
                        <div
                            key={r}
                            style={{
                                height: 150,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {row.map((image, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: "relative",
                                        width: "50%",
                                        height: "100%",
                                    }}
                                >
                                    <UnsafeImage
                                        onClick={() => {
                                            onSelectImage(
                                                image.contentUrl,
                                                image.isFamilyFriendly
                                            );
                                        }}
                                        src={image.thumbnailUrl}
                                        style={{
                                            marginRight: "10px",
                                            borderRadius: "4px",
                                            width: "100%",
                                            height: "100%",
                                            cursor: "pointer",
                                            objectFit: "contain",
                                        }}
                                        unsafe={!image.isFamilyFriendly}
                                    />
                                    {!image.isFamilyFriendly && (
                                        <TooltipWrapper
                                            tooltip={
                                                <span>
                                                    This picture will
                                                    automatically flag this page
                                                    as hidden!
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
                                                }}
                                            />
                                        </TooltipWrapper>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

export default ImageSearch;
