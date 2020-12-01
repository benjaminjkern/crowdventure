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
        Unsafe Mode allows you to see ALL of the content on Crowdventure,
        including content that has been classified as "unsafe". Before you can
        continue, you must acknowledge and agree to the terms of service:
        <p />
        <Form>
          <Form.Control
            disabled
            as="textarea"
            rows="5"
            value={`Lorem ipsum dolor sit amet, eos doming dolores offendit cu, malis vituperata ut mea, at homero indoctum duo. Suas solum dicam duo eu, te nulla delenit civibus per, vim vidisse delicata id. Amet velit commune et nam, his in iudico nonumes epicuri. In possim graecis eum, ne case civibus qui.

            Ei decore perpetua cum, error persius reprehendunt ad qui, usu eirmod phaedrum id. Saperet convenire id qui, sea nulla nonumes at. Sed ne vero ludus regione, sit cu commodo dignissim. Te vis ullum aeque democritum, ex temporibus appellantur neglegentur eos. At vix erat discere, nam nobis repudiare posidonium te, aeterno eruditi conceptam qui in. Odio autem adipiscing sit te, errem maiestatis vituperata quo eu.
            
            Ius te nihil vocent. His ne vivendo dissentiet, mel ne fierent omittantur vituperatoribus. Sale possit repudiandae vis ut. At qui mundi referrentur. Utamur fabellas neglegentur mel eu, modus doming semper ne duo. Idque legere doming quo no, vis atqui affert ea, sea amet natum an. Labore tibique scribentur no vix, pri in errem utinam.
            
            Vocibus ceteros periculis his ei, vel ex epicurei consulatu, cu solum offendit usu. Aeterno suscipit percipit at quo, error viris aperiam ei vim. Quem detracto legendos at est, euripidis philosophia vis ea, ei quaestio torquatos nam. Dicam numquam reformidans vis ex, eam audiam rationibus ut, vel idque quaestio interpretaris ne.
            
            Eam augue propriae id, vel eu invenire hendrerit. An ipsum partiendo usu, usu omnis brute ea. Ullum corpora delicata sea in, quo dico meis minim in. Idque delectus quo et, mel alterum praesent an. Vero nobis rationibus sea ea, mei ea dictas euripidis rationibus. Ubique aliquid placerat et mei.`}
          />
          <Form.Check
            style={{ float: "right" }}
            type="checkbox"
            label="I understand"
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
          onMouseEnter={(e) => (e.target.style.backgroundColor = palette[2])}
          onMouseLeave={(e) => (e.target.style.backgroundColor = palette[0])}
        >
          Turn on Unsafe Mode
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
