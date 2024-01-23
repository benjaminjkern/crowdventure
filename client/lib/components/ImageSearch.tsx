import React, {
    type CSSProperties,
    useContext,
    useEffect,
    useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { UnsafeModeContext } from "../unsafeMode";
import { UserContext } from "../user";
import { splitIntoRows } from "../utils";
import { useDebounce } from "../hooks";
import CrowdventureTextInput from "./CrowdventureTextInput";
import TooltipWrapper from "./TooltipWrapper";
import UnsafeImage from "./UnsafeImage";

type BingImage = {
    contentUrl: string;
    thumbnailUrl: string;
    isFamilyFriendly: boolean;
};

// Should hide this
const BING_API_KEY = process.env.BING_API_KEY;

const ImageSearch = ({
    onSelectImage,
    style,
}: {
    readonly onSelectImage: (url: string, familyFriendly: boolean) => unknown;
    readonly style: CSSProperties;
}) => {
    const { user } = useContext(UserContext);
    // const { unsafeMode } = useContext(UnsafeModeContext);
    const unsafeMode = useContext(UnsafeModeContext);

    const [images, setImages] = useState<BingImage[]>([]);

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

    // useEffect(() => {
    //     if (query.length < MIN_SEARCH_LENGTH) {
    //         setOpen(false);
    //         setFetching(undefined);
    //         return;
    //     }
    //     setOpen(true);
    //     setTimeout(() => {
    //         setFetching(query);
    //     }, 1000);
    // }, [query]);

    // useEffect(() => {
    //     if (!fetching) return;
    //     if (fetching !== query) return;
    //     fetchImages(fetching).then((newImages) => {
    //         setFetchResults({ newImages, fetching });
    //         setFetching(undefined);
    //     });
    // }, [fetching]);

    // useEffect(() => {
    //     if (!fetchResults) return;
    //     if (fetchResults.fetching !== query) return;
    //     setImages(fetchResults.newImages);
    //     setFetchResults(undefined);
    // }, [fetchResults]);

    const fetchImages = useDebounce((newQuery) => {
        axios
            .get<{
                value: BingImage[];
            }>(`https://api.bing.microsoft.com/v7.0/images/search`, {
                params: {
                    q: newQuery,
                    safeSearch: unsafeMode ? "Off" : "Strict",
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
    console.log(rows);

    return (
        <>
            <CrowdventureTextInput
                onChangeText={(newQuery) => {
                    // if (newQuery.length === 0) return selectNode(null);
                    setOpen(true);
                    // setQuery(newQuery);
                    // setFetching(true);
                    // searchNodes(newQuery);

                    fetchImages(newQuery);
                }}
                placeholder="Search for an image..."
                style={style}
            />
            {open ? (
                <div style={{ height: 350, overflow: "scroll" }}>
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
                                            marginRight: 10,
                                            borderRadius: 4,
                                            width: "100%",
                                            height: "100%",
                                            cursor: "pointer",
                                            objectFit: "contain",
                                        }}
                                        // unsafe={!image.isFamilyFriendly}
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
