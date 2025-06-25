"use client";

import { useState, useEffect, Fragment } from "react";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import { useAuth } from "react-oidc-context";

export default function DelegatePage() {

  const auth = useAuth();

  // ブロック、委任者
  const [blocks, setBlocks] = useState([]);
  const [user, setUser] = useState("");
  const [mail, setMail] = useState("");

  useEffect(
    // ブロック一覧を取得する
    () => {
      const b = [
        {
          code: "12345678901",
          category: "test",
          latitude: 1234,
          longitude: 2345,
          install: 1,
          buildingfloor: 1,
          name: "ブロック０１",
          user: "テスト太郎",
          mail: "aaaa@aaa.com"
        },
        {
          code: "12345678901",
          category: "test",
          latitude: 1234,
          longitude: 2345,
          install: 1,
          buildingfloor: 1,
          name: "ブロック０１",
          user: "テスト太郎",
          mail: "aaaa@aaa.com"
        },
        {
          code: "12345678901",
          category: "test",
          latitude: 1234,
          longitude: 2345,
          install: 1,
          buildingfloor: 1,
          name: "ブロック０１",
          user: "テスト太郎",
          mail: "aaaa@aaa.com"
        },
      ]
      setBlocks(b)
    }
    , []);

  return (<>
    <main>
      {auth.isAuthenticated
        && JSON.parse(window.atob(auth.user?.id_token.split(".")[1]))["cognito:groups"].includes("admin")
        &&
        <>
          <Form className="mb-2">
            <Card>
              <Card.Body>
                <Row>
                  <Col sm="6">
                    <Form.Group as={Row} controlId="formUser">
                      <Form.Label column sm="2">
                        委任者名
                      </Form.Label>
                      <Col>
                        <Form.Control
                          value={user}
                          onChange={(e) => setUser(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm="6">
                    <Form.Group as={Row} controlId="formMail">
                      <Form.Label column sm="2">
                        メールアドレス
                      </Form.Label>
                      <Col>
                        <Form.Control
                          value={mail}
                          onChange={(e) => setMail(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form>
          <Row className="mb-2">
            <Col><Button>最新情報取得</Button></Col>

          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th rowSpan={2}>操作</th>
                <th>code</th>
                <th>latitude</th>
                <th>longitude</th>
                <th>user</th>
              </tr>
              <tr>
                <th>name</th>
                <th>category</th>
                <th>buildingfloor</th>
                <th>mail</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block, index) =>
                <Fragment key={index}>
                  <tr>
                    <td rowSpan={2}><Button>更新</Button></td>
                    <td>{block.code}</td>
                    <td>{block.latitude}</td>
                    <td>{block.longitude}</td>
                    <td>{block.user}</td>
                  </tr>
                  <tr>
                    <td>{block.name}</td>
                    <td>{block.category}</td>
                    <td>{block.buildingfloor}</td>
                    <td>{block.mail}</td>
                  </tr>
                </Fragment>
              )}
            </tbody>
          </Table>
        </>}
    </main>

  </>);
}
