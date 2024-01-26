import React, { ReactNode } from "react";

const Spinner = ({ children }: { children?: ReactNode }) => {
    return (
        <div
            style={{
                border: "2px groove rgb(158, 232, 255)",

                display: "table-cell",
                borderRadius: 999,
                animation: "spin 20s linear infinite",
            }}
        >
            {children}
        </div>
    );
};

const LoadingBox = () => {
    return (
        <div
            style={{
                flex: 1,
                minHeight: "100vh",
                minWidth: "100vw",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Spinner>
                <Spinner>
                    <Spinner>
                        <Spinner>
                            <Spinner>
                                <Spinner>
                                    <Spinner>
                                        <Spinner>
                                            <Spinner>
                                                <Spinner>
                                                    <Spinner>
                                                        <Spinner>
                                                            <Spinner>
                                                                <Spinner>
                                                                    <Spinner>
                                                                        <Spinner>
                                                                            <Spinner>
                                                                                <Spinner>
                                                                                    <Spinner>
                                                                                        <Spinner>
                                                                                            <Spinner>
                                                                                                <Spinner>
                                                                                                    <Spinner>
                                                                                                        <Spinner>
                                                                                                            <Spinner>
                                                                                                                <Spinner>
                                                                                                                    <Spinner>
                                                                                                                        <Spinner />
                                                                                                                    </Spinner>
                                                                                                                </Spinner>
                                                                                                            </Spinner>
                                                                                                        </Spinner>
                                                                                                    </Spinner>
                                                                                                </Spinner>
                                                                                            </Spinner>
                                                                                        </Spinner>
                                                                                    </Spinner>
                                                                                </Spinner>
                                                                            </Spinner>
                                                                        </Spinner>
                                                                    </Spinner>
                                                                </Spinner>
                                                            </Spinner>
                                                        </Spinner>
                                                    </Spinner>
                                                </Spinner>
                                            </Spinner>
                                        </Spinner>
                                    </Spinner>
                                </Spinner>
                            </Spinner>
                        </Spinner>
                    </Spinner>
                </Spinner>
            </Spinner>
            <span style={{ marginTop: 10 }}>Loading...</span>
        </div>
    );
};
export default LoadingBox;
