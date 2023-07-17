'use client'

import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import NavBar from '@/app/components/NavBar';

export default function Test() {

  const user = useSelector(state=>state.user)

  const polls = [
    { id: 1, question: 'What is your favorite color?' },
    { id: 2, question: 'What is your favorite food?' },
    { id: 3, question: 'What is your favorite animal?' },
  ];

  return user.address ? (
    <>
    <NavBar />
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>Polls</Card.Header>
            <ListGroup variant="flush">
              {polls.map((poll) => (
                <ListGroup.Item key={poll.id}>{poll.question}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  ) : (
    <>
      <NavBar />
      <section>
        <div className="has-text-danger">
          <p>Please connect wallet</p>
        </div>
      </section>
    </>
  )
}
