"use client";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// ブロックを選択してから、メッセージを変更する画面
export default function InputMsg({
  selectedBlock,
  setSelectedBlock
}) {

  // メッセージデータ
  const [msgs, setMsgs] = useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmitFun = (data) => {
    console.log(data);
    setSelectedBlock("");
  }

  useEffect(
    // ブロックのメッセージを取得する
    () => {
      const b = [
        { category: "nomal", angle: 0, message: "test", reading: "testtest", file: "" },
        { category: "nomal", angle: 1, message: "test", reading: "testtest", file: "" },
        { category: "nomal", angle: 2, message: "test", reading: "testtest", file: "" },
        { category: "nomal", angle: 3, message: "test", reading: "testtest", file: "" },
      ]
      setMsgs(b)
    }
    , []);

  return (<>
    <Modal show={selectedBlock} onHide={() => setSelectedBlock("")} fullscreen={true} className="p-0">
      <Modal.Header closeButton>
        <Modal.Title>ブロック（{selectedBlock}）のメッセージ修正</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmitFun)}>
        <Modal.Body style={{maxHeight: "75vh"}}>
          <div className="overflow-auto">
            {msgs.map((msg, index) =>
              <Card key={index}>
                <Card.Header>カテゴリ：{msg.category}、アングル：{msg.angle}</Card.Header>
                <input type="hidden" value={msg.category} {...register(`${index}.category`)} />
                <input type="hidden" value={msg.angle} {...register(`${index}.angle`)} />
                <Card.Body>
                  <Row className="mb-2">
                    <Col sm="6">
                      <Form.Group as={Row} controlId="formMsg">
                        <Form.Label column sm="2">
                          メッセージ
                        </Form.Label>
                        <Col>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            defaultValue={msg.message}
                            {...register(`${index}.message`)}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group as={Row} controlId="formReading">
                        <Form.Label column sm="2">
                          読み方
                        </Form.Label>
                        <Col>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            defaultValue={msg.reading}
                            {...register(`${index}.reading`)}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedBlock("")}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>

  </>);
}
