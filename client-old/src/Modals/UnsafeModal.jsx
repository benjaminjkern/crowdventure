import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { palette } from "../index";

const ConfirmModal = (props) => {
    const { onConfirm, close, loggedInAs } = props;
    const [show, setShow] = useState(true);

    const [understand, setUnderstand] = useState(false);
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
                <Modal.Title>Turn on Unsafe Mode</Modal.Title>
            </Modal.Header>
            <Modal.Body
                {...(loggedInAs && loggedInAs.unsafeMode
                    ? { style: { backgroundColor: palette[4] } }
                    : {})}
            >
                Unsafe Mode allows you to see <b>ALL</b> of the content on
                Crowdventure, including content that has been classified as
                &quot;unsafe&quot;. Before you can continue, you must
                acknowledge and agree to the terms of service:
                <p />
                <Form>
                    <Form.Control
                        disabled
                        as="textarea"
                        rows="5"
                        value={`Please read these terms of service ("terms", "terms of service") carefully before using the Crowdventure website (the "service").
            
I. Conditions of Use
  We will provide their services to you, which are subject to the conditions stated below in this document. Every time you visit this website, use its services or make a purchase, you accept the following conditions. This is why we urge you to read them carefully.
            
II. Privacy Policy
  Before you continue using our website we advise you to read our privacy policy [link to privacy policy] regarding our user data collection. It will help you better understand our practices.
            
III. Copyright
  Content published on this website (digital downloads, images, texts, graphics, logos) is the property of Crowdventure and/or its content creators and protected by international copyright laws. The entire compilation of the content found on this website is the exclusive property of [name], with copyright authorship for this compilation by [name].
            
IV. Communication
  The entire communication with us is electronic. Every time you send us an email or visit our website, you are going to be communicating with us. You hereby consent to receive communications from us. If you subscribe to the news on our website, you are going to receive regular emails from us. We will continue to communicate with you by posting news and notices on our website and by sending you emails. You also agree that all notices, disclosures, agreements and other communications we provide to you electronically meet the legal requirements that such communications be in writing.
            
V. Applicable Law
  By visiting this website, you agree that the laws of the United States of America, without regard to principles of conflict laws, will govern these terms of service, or any dispute of any sort that might come between [name] and you, or its business partners and associates.
            
VI. Disputes
  Any dispute related in any way to your visit to this website or to products you purchase from us shall be arbitrated by state or federal court [your location] and you consent to exclusive jurisdiction and venue of such courts.
            
VII. Comments, Reviews, and Emails
  Visitors may post content as long as it is not obscene, illegal, defamatory, threatening, infringing of intellectual property rights, invasive of privacy or injurious in any other way to third parties. Content has to be free of software viruses, political campaign, and commercial solicitation.
  We reserve all rights (but not the obligation) to remove and/or edit such content. When you post your content, you grant Crowdventure non-exclusive, royalty-free and irrevocable right to use, reproduce, publish, modify such content throughout the world in any media.
            
VIII. License and Site Access
  We grant you a limited license to access and make personal use of this website. You are not allowed to download or modify it. This may be done only with written consent from us.
            
IX. User Account
  If you are an owner of an account on this website, you are solely responsible for maintaining the confidentiality of your private user details (username and password). You are responsible for all activities that occur under your account or password.
  We reserve all rights to terminate accounts, edit or remove content and cancel orders in their sole discretion.`}
                    />
                    <Form.Check
                        style={{ float: "right" }}
                        type="checkbox"
                        label="I agree to the terms of service."
                        checked={understand}
                        id="check"
                        onChange={(e) => {
                            setUnderstand(e.target.checked);
                        }}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer
                {...(loggedInAs && loggedInAs.unsafeMode
                    ? { style: { backgroundColor: palette[5] } }
                    : {})}
            >
                <Button
                    variant="primary"
                    onClick={onConfirm}
                    disabled={!understand}
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
                    Turn on Unsafe Mode
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
