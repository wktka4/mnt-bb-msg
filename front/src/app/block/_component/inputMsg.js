"use client";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useAuth } from "react-oidc-context";

// ブロックを選択してから、メッセージを変更する画面
export default function InputMsg({
  selectedBlock,
  setSelectedBlock
}) {

  const auth = useAuth();

  // メッセージデータ
  const [msgs, setMsgs] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const onSubmitFun = (data) => {
    fetch(
      'http://localhost/api/postMsg/2015-03-31/functions/function/invocations',
      {
        method: "POST",
        body: `{"headers":{"Authorization":"${auth.user?.id_token}"},"body":"${JSON.stringify(data).replaceAll('"', '\\"')}"}`
      }
    ).then(res => closeFun());
  }

  const closeFun = () => {
    reset();
    setSelectedBlock("");
  }

  useEffect(
    // ブロックのメッセージを取得する
    () => {
      console.log(1)
      fetch('http://localhost/api/getMsg/2015-03-31/functions/function/invocations',
        {
          method: "POST",
          body: `{"queryStringParameters":{"code":"${selectedBlock}"}}`
        }
      ).then(res => res.json())
        .then(resJson => setMsgs(resJson.body?.datas))
    }
    , [selectedBlock]);

  return (<>
    <Modal show={selectedBlock} onHide={() => closeFun()} fullscreen={true} className="p-0">
      <Modal.Header closeButton>
        <Modal.Title>ブロック（{selectedBlock}）のメッセージ修正</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmitFun)}>
        <input type="hidden" value={selectedBlock} {...register(`code`)} />
        <Modal.Body style={{ maxHeight: "75vh" }}>
          <div className="overflow-auto">
            {msgs.map((msg, index) =>
              <Card key={index}>
                <Card.Header>カテゴリ：{msg.messagecategory_jp}、アングル：{msg.angle}</Card.Header>
                <input type="hidden" value={msg.messagecategory} {...register(`${index}.messagecategory`)} />
                <input type="hidden" value={msg.angle} {...register(`${index}.angle`)} />
                <input type="hidden" value={msg.wav} {...register(`${index}.wav`)} />
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
                            value={msg.message}
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
                            value={msg.reading}
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
          <Button variant="secondary" onClick={() => closeFun()}>
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
