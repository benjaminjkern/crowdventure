import React, { useState, useEffect } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { mutation_call, query_call, escape, palette } from "../index";

import ConfirmModal from "./ConfirmModal";

import Cookies from "universal-cookie";

import { Redirect } from "react-router-dom";

const EditAccountModal = (props) => {
    const {
        screenName,
        bio,
        profilePicture,
        close,
        account,
        setAccount,
        setRedirect,
        loggedInAs,
    } = props;
    const [show, setShow] = useState(true);
    const [info, setInfo] = useState("");

    const [showingModal, showModal] = useState(undefined);

    const [bioField, setBioField] = useState(bio || "");
    const [profilePictureField, setProfilePictureField] = useState(
        profilePicture || ""
    );
    const [nameField, setNameField] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [hidden, setHidden] = useState(account.hidden);
    const [isAdmin, setAdmin] = useState(account.isAdmin);

    const editPage = (checkedIfExists = false) => {
        if (pass1 && pass1 !== pass2) {
            setInfo(<div style={{ color: "red" }}>Passwords must match!</div>);
            return;
        }
        const esBio =
            bioField.length > 0 ? `""${escape(bioField, true)}""` : null;
        const esPicture =
            profilePictureField.length > 0 ? escape(profilePictureField) : null;

        const params = { screenName };
        if (bioField !== bio) params.bio = esBio;
        if (profilePictureField !== profilePicture)
            params.profilePicURL = esPicture;
        if (nameField !== screenName && !nameField.match(/^\s*$/)) {
            if (!checkedIfExists) {
                const esScreenName = escape(nameField);
                query_call(
                    "getAccount",
                    { screenName: esScreenName },
                    { screenName: 0 },
                    (res) => {
                        if (res) {
                            setInfo(
                                <div style={{ color: "red" }}>
                                    That account already exists!
                                </div>
                            );
                        } else {
                            editPage(true);
                        }
                    }
                );
                return;
            } else {
                params.newScreenName = escape(nameField);
            }
        }
        if (pass1) params.newPassword = escape(pass1);
        if (hidden !== undefined) params.hidden = hidden;
        if (isAdmin !== undefined) params.isAdmin = isAdmin;

        mutation_call(
            "editAccount",
            params,
            {
                bio: 0,
                screenName: 0,
                profilePicURL: 0,
                totalNodeViews: 0,
                totalSuggestionScore: 0,
                hidden: 0,
                isAdmin: 0,
                featuredNodes: {
                    owner: { screenName: 0, profilePicURL: 0 },
                    featured: 0,
                    hidden: 0,
                    ID: 0,
                    title: 0,
                    views: 0,
                    pictureURL: 0,
                    pictureUnsafe: 0,
                },
                nodes: {
                    owner: { screenName: 0, profilePicURL: 0 },
                    featured: 0,
                    hidden: 0,
                    ID: 0,
                    title: 0,
                    content: 0,
                    views: 0,
                    pictureURL: 0,
                    pictureUnsafe: 0,
                },
            },
            // I shouldnt need any of the parameters if it just reloads the page
            (res) => {
                if (params.newScreenName) {
                    setRedirect(
                        <Redirect to={`/account/${params.newScreenName}`} />
                    );
                    new Cookies().set("account", params.newScreenName, {
                        path: "/",
                    });
                    window.location.reload(false);
                }
                if (params.isAdmin !== account.isAdmin) {
                    window.location.reload(false);
                }
                setAccount(res);
                setShow(false);
                close();
            }
        );
    };

    const deleteAccount = () => {
        new Cookies().set("account", "", { path: "/" });
        mutation_call("deleteAccount", { screenName }, {}, () => {
            setRedirect(<Redirect to="/" />);
            window.location.reload(false);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            setPass1("");
            setNameField("");
        }, 1000);
    }, []);

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
                <Modal.Title>Editing Account</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body
                    {...(loggedInAs && loggedInAs.unsafeMode
                        ? { style: { backgroundColor: palette[4] } }
                        : {})}
                >
                    {profilePicture ? (
                        <img
                            src={profilePicture}
                            alt={screenName + "'s Profile Pic"}
                            onError={(e) => {
                                e.target.style.display = "none";
                                setInfo(
                                    <span style={{ color: "red" }}>
                                        Picture not found!
                                    </span>
                                );
                            }}
                            style={{
                                opacity:
                                    profilePicture === profilePictureField
                                        ? 1
                                        : 0.2,
                                width: "100%",
                                "object-fit": "contain",
                                padding: "1px",
                                borderRadius: "8px",
                            }}
                        />
                    ) : (
                        ""
                    )}
                    <Form.Label>Profile Pic URL:</Form.Label>
                    <Form.Control
                        value={profilePictureField}
                        onChange={(e) => setProfilePictureField(e.target.value)}
                        {...(loggedInAs && loggedInAs.unsafeMode
                            ? {
                                  style: {
                                      backgroundColor: palette[5],
                                      color: "white",
                                  },
                              }
                            : {})}
                    />
                    <Form.Label>Bio:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        value={bioField}
                        onChange={(e) => setBioField(e.target.value)}
                        {...(loggedInAs && loggedInAs.unsafeMode
                            ? {
                                  style: {
                                      backgroundColor: palette[5],
                                      color: "white",
                                  },
                              }
                            : {})}
                    />

                    <Form.Label>Change your screen name:</Form.Label>
                    <Form.Control
                        placeholder={screenName}
                        value={nameField}
                        onChange={(e) => setNameField(e.target.value)}
                        {...(loggedInAs && loggedInAs.unsafeMode
                            ? {
                                  style: {
                                      backgroundColor: palette[5],
                                      color: "white",
                                  },
                              }
                            : {})}
                    />

                    <Form.Label>Change your password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="••••••••"
                        value={pass1}
                        onChange={(e) => setPass1(e.target.value)}
                        {...(loggedInAs && loggedInAs.unsafeMode
                            ? {
                                  style: {
                                      backgroundColor: palette[5],
                                      color: "white",
                                  },
                              }
                            : {})}
                    />
                    {pass1 ? (
                        <>
                            <Form.Label>Confirm password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="••••••••"
                                value={pass2}
                                onChange={(e) => setPass2(e.target.value)}
                                {...(loggedInAs && loggedInAs.unsafeMode
                                    ? {
                                          style: {
                                              backgroundColor: palette[5],
                                              color: "white",
                                          },
                                      }
                                    : {})}
                            />
                        </>
                    ) : (
                        ""
                    )}
                    {loggedInAs && loggedInAs.isAdmin ? (
                        <>
                            <Form.Label>Admin Controls:</Form.Label>
                            <Form.Check
                                type="checkbox"
                                checked={hidden || false}
                                onChange={(e) => setHidden(e.target.checked)}
                                label="Account should be hidden"
                                id="hide"
                            />
                            <Form.Check
                                type="checkbox"
                                checked={isAdmin || false}
                                onChange={(e) => setAdmin(e.target.checked)}
                                label="Account is an admin"
                                id="adm"
                            />
                        </>
                    ) : (
                        ""
                    )}

                    {info ? info : ""}
                </Modal.Body>
                <Modal.Footer
                    {...(loggedInAs && loggedInAs.unsafeMode
                        ? { style: { backgroundColor: palette[5] } }
                        : {})}
                >
                    <Button
                        onClick={() => editPage()}
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
                        Edit Account
                    </Button>
                    <Button
                        onClick={() => {
                            showModal(
                                <ConfirmModal
                                    loggedInAs={loggedInAs}
                                    title="Delete Account"
                                    content="This will erase all content created by this account, including all pages and suggested choices, and liked and disliked content. Are you sure you wish to continue?"
                                    onConfirm={() => deleteAccount()}
                                    close={() => {
                                        showModal(undefined);
                                    }}
                                />
                            );
                        }}
                        variant="danger"
                    >
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Form>
            {showingModal || ""}
        </Modal>
    );
};
export default EditAccountModal;
