import React, { useState } from "react";

const ImageSearch = ({ onSelectImage }) => {
    let targets = {};
    let queries = {};

    let displayed = 0;
    let lastQuery;
    let tempRows = [];

    const [isLoading, setIsLoading] = useState(false);
    const [rows, setRows] = useState([]);

    const BLURAMOUNT = 10;
    const PAGESIZE = 20;
    const MAXROWLENGTH = 2;

    const checkImage = (path) =>
        new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve(true);
            };
            img.onerror = () => {
                resolve(false);
            };
            img.src = path;
        });

    const handleSearch = (
        query,
        amount = PAGESIZE,
        offset = query !== lastQuery ? 0 : displayed
    ) => {
        setIsLoading(true);
        if (query !== lastQuery) {
            Object.keys(queries).forEach(
                (key) => (queries[key].cancelled = true)
            );
            tempRows = [];
            setRows([]);
            displayed = 0;
            offset = 0;
            lastQuery = query;
        }
        queries[query] = { query }; // the query attribute is pointless but whatever

        fetch(
            "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" +
                encodeURIComponent(query) +
                `&count=${amount}&safeSearch=${
                    loggedInAs && loggedInAs.unsafeMode ? "Off" : "Strict"
                }&offset=` +
                offset,
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": BING_API_KEY,
                },
            }
        )
            .then((data) => data.json())
            .then(async (data) => {
                const fullpage = data.value.length === amount;

                let filteredOptions = data.value.filter(
                    (hit) =>
                        hit.isFamilyFriendly ||
                        (loggedInAs && loggedInAs.unsafeMode)
                );

                if (queries[query].cancelled) {
                    delete queries[query];
                    return;
                }

                const imagesExist = await Promise.all(
                    data.value.map((hit) => checkImage(hit.contentUrl))
                );

                filteredOptions = filteredOptions.filter(
                    (_, i) => imagesExist[i]
                );

                const newRows = tempRows.filter((row) => row.id !== "buffer");

                for (const hit of filteredOptions) {
                    if (
                        newRows.length === 0 ||
                        newRows[newRows.length - 1].images.length ===
                            MAXROWLENGTH
                    ) {
                        newRows.push({
                            id: "(Image Selected)",
                            images: [hit],
                        });
                    } else {
                        newRows[newRows.length - 1].images.push(hit);
                    }
                    displayed++;
                }

                if (queries[query].cancelled) {
                    delete queries[query];
                    return;
                }

                if (fullpage) {
                    if (filteredOptions.length < amount) {
                        tempRows = newRows;
                        handleSearch(query, amount - filteredOptions.length);
                        return;
                    } else {
                        newRows.push({ id: "buffer", images: [] });
                    }
                }
                tempRows = newRows;
                setRows(newRows);

                delete queries[query];

                setIsLoading(false);
            })
            .catch(() => {});
    };

    const startunblur = (component, id) => {
        Object.keys(targets).forEach((key) => {
            if (key !== id + "") {
                startreblur(key);
            }
        });
        targets[id] = {
            component,
            currentblur: BLURAMOUNT,
            unblurring: true,
        };
        unblur(id);
    };
    const unblur = (id) => {
        if (!targets[id]) return;
        targets[id].currentblur -= 0.1;
        if (targets[id].currentblur >= 0 && targets[id].unblurring) {
            targets[id].component.style["-webkit-filter"] =
                "blur(" + targets[id].currentblur + "px)";
            targets[id].component.style.filter =
                "blur(" + targets[id].currentblur + "px)";
            setTimeout(() => unblur(id), 1);
        } else {
            targets[id].unblurring = false;
        }
    };

    const startreblur = (id) => {
        if (!targets[id]) return;
        targets[id].unblurring = false;
        reblur(id);
    };

    const reblur = (id) => {
        if (!targets[id]) return;
        targets[id].currentblur += 0.1;
        if (targets[id].currentblur <= BLURAMOUNT && !targets[id].unblurring) {
            targets[id].component.style["-webkit-filter"] =
                "blur(" + targets[id].currentblur + "px)";
            targets[id].component.style.filter =
                "blur(" + targets[id].currentblur + "px)";
            setTimeout(() => reblur(id), 1);
        } else {
            delete targets[id];
        }
    };

    return (
        <AsyncTypeahead
            isLoading={isLoading}
            minLength={2}
            onSearch={handleSearch}
            maxResults={10}
            onPaginate={() => handleSearch(lastQuery)}
            useCache={false}
            options={rows}
            placeholder="Search for an image..."
            renderMenuItemChildren={(row, _, index) => (
                <div className="row align-items-center">
                    {row.images.map((image, i) => (
                        <div key={i} className="col">
                            <img
                                onClick={() =>
                                    callback(
                                        image.contentUrl,
                                        image.isFamilyFriendly
                                    )
                                }
                                src={image.thumbnailUrl}
                                style={{
                                    marginRight: "10px",
                                    borderRadius: "4px",
                                    width: "100%",
                                    ...(image.isFamilyFriendly
                                        ? {}
                                        : {
                                              "-webkit-filter":
                                                  "blur(" + BLURAMOUNT + "px)",
                                              filter:
                                                  "blur(" + BLURAMOUNT + "px)",
                                          }),
                                }}
                                onMouseEnter={(e) => {
                                    if (!image.isFamilyFriendly)
                                        startunblur(e.target, 2 * index + i);
                                }}
                                onMouseLeave={() => {
                                    if (!image.isFamilyFriendly)
                                        startreblur(2 * index + i);
                                }}
                            />
                            {image.isFamilyFriendly ? (
                                ""
                            ) : (
                                <OverlayTrigger
                                    overlay={
                                        <Tooltip>
                                            This picture will automatically flag
                                            this page as hidden!
                                        </Tooltip>
                                    }
                                >
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
                                </OverlayTrigger>
                            )}
                        </div>
                    ))}
                </div>
            )}
        />
    );
};

export default ImageSearch;
