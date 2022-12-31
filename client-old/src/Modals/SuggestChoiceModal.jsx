import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import SearchPage from "../Node/SearchPage";

import CreateNodeModal from "./CreateNodeModal";

import { mutation_call, escape, palette } from "../index";

const SuggestChoiceModal = (props) => {
    const { loggedInAs, fromNode, close } = props;

    const [show, setShow] = useState(true);
    const [info, setInfo] = useState("");

    const [toPage, setToPage] = useState("");
    const [suggestAction, setSuggestAction] = useState("");
    const [showingModal, showModal] = useState("");

    const createNewAction = (toID) => {
        if (!toID) {
            showModal(
                <CreateNodeModal
                    loggedInAs={loggedInAs}
                    picture={fromNode.pictureURL}
                    pictureUnsafe={fromNode.pictureUnsafe}
                    callback={(node) => createNewAction(node.ID)}
                    close={() => showModal(undefined)}
                />
            );
        } else {
            const escaped = escape(suggestAction);
            mutation_call(
                "suggestChoice",
                {
                    accountScreenName: loggedInAs.screenName,
                    fromID: fromNode.ID,
                    action: escaped,
                    toID,
                },
                { ID: 0 },
                () => {
                    window.location.reload(false);
                }
            );
        }
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                setShow(false);
                close();
            }}
        >
            <Modal.Header
                {...(loggedInAs && loggedInAs.unsafeMode
                    ? { style: { backgroundColor: palette[5] } }
                    : {})}
                closeButton
            >
                <Modal.Title>Suggesting New Choice</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body
                    {...(loggedInAs && loggedInAs.unsafeMode
                        ? { style: { backgroundColor: palette[4] } }
                        : {})}
                >
                    <Form.Label>Action:</Form.Label>
                    <Form.Control
                        {...(loggedInAs && loggedInAs.unsafeMode
                            ? {
                                  style: {
                                      backgroundColor: palette[5],
                                      color: "white",
                                  },
                              }
                            : {})}
                        value={suggestAction}
                        onChange={(e) => setSuggestAction(e.target.value)}
                    />
                    <Form.Label>Go to Page:</Form.Label>
                    <SearchPage
                        callback={(nodeID) => setToPage(nodeID)}
                        toID={toPage}
                    />
                    {info ? info : ""}
                </Modal.Body>
                <Modal.Footer
                    {...(loggedInAs && loggedInAs.unsafeMode
                        ? { style: { backgroundColor: palette[5] } }
                        : {})}
                >
                    <Button
                        onClick={() =>
                            suggestAction
                                ? createNewAction(toPage)
                                : setInfo(
                                      <span style={{ color: "red" }}>
                                          Action cannot be empty!
                                      </span>
                                  )
                        }
                        style={{
                            border: `1px solid ${palette[2]}`,
                            backgroundColor: palette[0],
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = palette[2])
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = palette[0])
                        }
                    >
                        Submit New Choice
                    </Button>
                </Modal.Footer>
            </Form>
            {showingModal || ""}
        </Modal>
    );
};

export default SuggestChoiceModal;
