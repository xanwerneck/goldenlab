
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Row, Col, Card, CardBody } from "shards-react";
import FirebaseService from "../services/FirebaseService";

export default class Ocorrencia extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resolvido : false
        }
    }
    resolver = () => {
        var document = this.props.document
        document.value.resolvido = true
        FirebaseService.update('ocorrencias', document.key, document.value, () => {
            this.setState({
                resolvido : !this.state.resolvido
            })
        })
    }
  render() {
        return (
        <div style={{marginBottom: 15, maxWidth: "100%"}}>
            <Row>
                <Col lg="10" xs="10">
                    <Card style={{height: 44}}>
                        <CardBody style={{padding: 10}}>
                            <Row>
                                <Col xs="7">
                                <strong>#{this.props.categoria}</strong>
                                </Col>
                                <Col xs="5">
                                {this.props.data}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="2" xs="2" style={{padding: 0}} >
                    {
                        (this.props.resolvido || this.state.resolvido) ? (
                            <Button theme="success" style={{height: 44}}>
                                <FontAwesomeIcon icon={faCheckDouble} />
                            </Button>
                        ) : (
                            <Button 
                            onClick={() => this.resolver()}
                            theme="light" style={{height: 44}}>
                                <FontAwesomeIcon icon={faCheckDouble} />
                            </Button>
                        )
                    }
                    
                </Col>
            </Row>
        </div>
        )
    }
}