import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { palette, mutation_call, escape } from "../index";

const MessageModal = (props) => {
    const { account, close, loggedInAs } = props;
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(true);

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
                <Modal.Title>Send message to {account.screenName}</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body
                    {...(loggedInAs && loggedInAs.unsafeMode
                        ? { style: { backgroundColor: palette[4] } }
                        : {})}
                >
                    <Form.Label>Message:</Form.Label>
                    <Form.Control
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        {...(loggedInAs && loggedInAs.unsafeMode
                            ? {
                                  style: {
                                      backgroundColor: palette[5],
                                      color: "white",
                                  },
                              }
                            : {})}
                    />
                </Modal.Body>
            </Form>
            <Modal.Footer
                {...(loggedInAs && loggedInAs.unsafeMode
                    ? { style: { backgroundColor: palette[5] } }
                    : {})}
            >
                <Button
                    variant="primary"
                    onClick={() => {
                        if (escape(message).length > 0) {
                            mutation_call(
                                "createNotification",
                                {
                                    accountScreenName: account.screenName,
                                    content: `${
                                        loggedInAs.screenName
                                    } sent you a message: '${escape(message)}'`,
                                    link: `/account/${loggedInAs.screenName}`,
                                },
                                { time: 0 },
                                (res) => {
                                    if (!res.err) {
                                        alert("Message sent!");
                                        close();
                                    }
                                }
                            );
                        }
                    }}
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
                    Send!
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MessageModal;
