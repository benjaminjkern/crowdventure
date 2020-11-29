import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { mutation_call, escape, palette } from "../index";

import ConfirmModal from "./ConfirmModal";

import Cookies from "universal-cookie";

import { Redirect } from "react-router-dom";

const EditAccountModal = (props) => {
  const {
    screenName,
    bio,
    profilePicture,
    close,
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

  const editPage = () => {
    const esBio = escape(bioField, true);
    const esPicture = escape(profilePictureField);

    const params = { screenName };
    if (bioField !== bio) params.bio = `""${esBio}""`;
    if (profilePictureField !== profilePicture)
      params.profilePicURL = esPicture;

    mutation_call(
      "editAccount",
      params,
      {
        bio: 0,
        screenName: 0,
        profilePicURL: 0,
        totalNodeViews: 0,
        totalSuggestionScore: 0,
        nodes: { featured: 0, ID: 0, title: 0, views: 0, pictureURL: 0 },
      },
      // I shouldnt need any of the parameters if it just reloads the page
      (res) => {
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
                  <span style={{ color: "red" }}>Picture not found!</span>
                );
              }}
              style={{
                opacity: profilePicture === profilePictureField ? 1 : 0.2,
                width: "100%",
                "object-fit": "contain",
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
              ? { style: { backgroundColor: palette[5], color: "white" } }
              : {})}
          />
          <Form.Label>Bio:</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={bioField}
            onChange={(e) => setBioField(e.target.value)}
            {...(loggedInAs && loggedInAs.unsafeMode
              ? { style: { backgroundColor: palette[5], color: "white" } }
              : {})}
          />
          {info ? info : ""}
        </Modal.Body>
        <Modal.Footer
          {...(loggedInAs && loggedInAs.unsafeMode
            ? { style: { backgroundColor: palette[5] } }
            : {})}
        >
          <Button
            onClick={editPage}
            style={{
              border: `1px solid ${palette[2]}`,
              backgroundColor: palette[0],
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
            onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
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
