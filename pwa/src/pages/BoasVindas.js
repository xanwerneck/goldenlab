import React from "react";
import { Container, Row, Button } from "shards-react";

export default class BoasVindas extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                <img
                src="https://cdn.dribbble.com/users/1170793/screenshots/5996967/work_pack_white-01.png"
                style={{height: 250}}
                />
                </Row>
                <Row>
                <Button pill
                onClick={() => this.props.history.push('/login')}
                >
                    Acessar minha fábrica
                </Button>
                </Row>
            </Container>
        )
    }
}