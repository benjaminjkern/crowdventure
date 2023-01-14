import React, { useContext, useState } from "react";
import { mutationCall } from "../apiUtils";
import CrowdventureModal from "../components/CrowdventureModal";
import CrowdventureTextInput from "../components/CrowdventureTextInput";
import { ModalContext } from "../modal";

// import SearchPage from "../Node/SearchPage";

import CreateNodeModal from "../nodes/CreateNodeModal";
import { UserContext } from "../user";

const SuggestChoiceModal = ({ fromNode, choice }) => {
    const [info, setInfo] = useState("");

    const [toPage, setToPage] = useState(choice?.to.ID || "");
    const [suggestAction, setSuggestAction] = useState(choice?.action || "");
    const [hidden, setHidden] = useState(choice?.hidden);

    const { user } = useContext(UserContext);
    const { openModal } = useContext(ModalContext);

    const createNewAction = (toID) => {
        if (!toID) {
            openModal(
                <CreateNodeModal
                    picture={fromNode.pictureURL}
                    pictureUnsafe={fromNode.pictureUnsafe}
                    callback={(node) => createNewAction(node.ID)}
                />
            );
        } else {
            mutationCall(
                "suggestChoice",
                { ID: 0 },
                {
                    accountScreenName: user.screenName,
                    fromID: fromNode.ID,
                    action: suggestAction,
                    toID,
                }
            ).then(() => {});
        }
    };

    return (
        <CrowdventureModal
            modalTitle="Suggesting New Choice"
            modalButtons={[
                {
                    text: "Submit New Choice",
                    onClick: () =>
                        suggestAction
                            ? createNewAction(toPage)
                            : setInfo(
                                  <span style={{ color: "red" }}>
                                      Action cannot be empty!
                                  </span>
                              ),
                },
            ]}
        >
            Action:
            <CrowdventureTextInput
                value={suggestAction}
                onChange={setSuggestAction}
            />
            Go to Page:
            {/* <SearchPage
                        callback={(nodeID) => setToPage(nodeID)}
                        toID={toPage}
                    /> */}
            {info}
        </CrowdventureModal>
    );
};

export default SuggestChoiceModal;
