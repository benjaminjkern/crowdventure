import React, { useCallback, useContext, useEffect, useState } from "react";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";
import CrowdventureTextInput from "./CrowdventureTextInput";
import TooltipWrapper from "./TooltipWrapper";

// Should hide this
const BING_API_KEY = "8300cebe5f0d452a9ccb4bca67af4659";

const ImageSearch = ({ onSelectImage }) => {
    const { user } = useContext(UserContext);
    // const { unsafeMode } = useContext(UnsafeModeContext);
    const unsafeMode = true;

    const [fetching, setFetching] = useState(undefined);
    const [fetchResults, setFetchResults] = useState(undefined);
    const [images, setImages] = useState([]);
    const [atEnd, setAtEnd] = useState(false);

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const BLURAMOUNT = 10;
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
            img.onerror = (e) => {
                e.preventDefault();
                resolve(false);
            };
            img.src = image.contentUrl;
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
    }, [fetchResults]);

    const fetchImages = (query, amount = PAGESIZE, offset = 0) => {
        return fetch(
            "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" +
                encodeURIComponent(query) +
                `&count=${amount}&safeSearch=${
                    unsafeMode ? "Off" : "Strict"
                }&offset=` +
                offset,
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
    };

    // const startunblur = (component, id) => {
    //     Object.keys(targets).forEach((key) => {
    //         if (key !== id + "") {
    //             startreblur(key);
    //         }
    //     });
    //     targets[id] = {
    //         component,
    //         currentblur: BLURAMOUNT,
    //         unblurring: true,
    //     };
    //     unblur(id);
    // };

    // const unblur = (id) => {
    //     if (!targets[id]) return;
    //     targets[id].currentblur -= 0.1;
    //     if (targets[id].currentblur >= 0 && targets[id].unblurring) {
    //         targets[id].component.style["-webkit-filter"] =
    //             "blur(" + targets[id].currentblur + "px)";
    //         targets[id].component.style.filter =
    //             "blur(" + targets[id].currentblur + "px)";
    //         setTimeout(() => unblur(id), 1);
    //     } else {
    //         targets[id].unblurring = false;
    //     }
    // };

    // const startreblur = (id) => {
    //     if (!targets[id]) return;
    //     targets[id].unblurring = false;
    //     reblur(id);
    // };

    // const reblur = (id) => {
    //     if (!targets[id]) return;
    //     targets[id].currentblur += 0.1;
    //     if (targets[id].currentblur <= BLURAMOUNT && !targets[id].unblurring) {
    //         targets[id].component.style["-webkit-filter"] =
    //             "blur(" + targets[id].currentblur + "px)";
    //         targets[id].component.style.filter =
    //             "blur(" + targets[id].currentblur + "px)";
    //         setTimeout(() => reblur(id), 1);
    //     } else {
    //         delete targets[id];
    //     }
    // };

    return (
        <>
            <CrowdventureTextInput
                placeholder="Search for an image..."
                value={query}
                onChangeText={setQuery}
            />
            {open && (
                <div style={{ height: 200 }}>
                    {images.map((image, i) => (
                        <div key={i}>
                            <img
                                onClick={() =>
                                    onSelectImage(
                                        image.contentUrl,
                                        image.isFamilyFriendly
                                    )
                                }
                                src={image.thumbnailUrl}
                                style={{
                                    marginRight: "10px",
                                    borderRadius: "4px",
                                    width: "100%",
                                    // ...(image.isFamilyFriendly
                                    //     ? {}
                                    //     : {
                                    //           "-webkit-filter":
                                    //               "blur(" + BLURAMOUNT + "px)",
                                    //           filter:
                                    //               "blur(" + BLURAMOUNT + "px)",
                                    //       }),
                                }}
                                // onMouseEnter={(e) => {
                                //     if (!image.isFamilyFriendly)
                                //         startunblur(e.target, 2 * index + i);
                                // }}
                                // onMouseLeave={() => {
                                //     if (!image.isFamilyFriendly)
                                //         startreblur(2 * index + i);
                                // }}
                            />
                            {!image.isFamilyFriendly && (
                                <TooltipWrapper tooltip="This picture will automatically flag this page as hidden!">
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "5px",
                                            left: "6.5px",
                                            color: "red",
                                            "-webkit-touch-callout": "none",
                                            "-webkit-user-select": "none",
                                            "-khtml-user-select": "none",
                                            "-moz-user-select": "none",
                                            "-ms-user-select": "none",
                                            "user-select": "none",
                                            "text-shadow": "0 0 1px black",
                                        }}
                                        className="fa"
                                    >
                                        &#xf056;
                                    </div>
                                </TooltipWrapper>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
        // <AsyncTypeahead
        //     isLoading={isLoading}
        //     minLength={2}
        //     maxResults={10}
        //     onPaginate={() => handleSearch(lastQuery)}
        //     useCache={false}
        // />
    );
};

export default ImageSearch;
