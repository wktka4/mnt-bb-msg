'use client';

import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Link from 'next/link';

export default function Menu({ }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>メニュー</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row><Col>
            <Link href="/block" onClick={handleClose}>メッセージ修正</Link>
          </Col></Row>
          <Row>
            <Link href="/msg" onClick={handleClose}>メッセージ一覧</Link>
          </Row>
          <Row>
            <Link href="/delegate" onClick={handleClose}>メッセージ管理委任</Link>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>

      <Row>
        <Col>
          <Button variant="primary" onClick={handleShow}>
            メニュー
          </Button>
        </Col>
      </Row>
    </>
  );
}
