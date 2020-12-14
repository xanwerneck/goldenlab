import React from "react";
import { Container, Row, Button } from "shards-react";
import { Form, FormInput, FormGroup } from "shards-react";
import AuthService from "../services/AuthService";
import { firebaseAuth } from "../utils/firebaseUtils";

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email : "",
            senha : ""
        }
    }

    login = () => {
        AuthService.Login(this.state.email, this.state.senha, (ret) => {
            if (ret) {
                this.props.history.push('/inicio')
            }
        })
    }
    render() {
        return (
            <Container >
                <div style={{textAlign: "center"}}>
                    <img src="/images/logo-horizontal.jpg" width="96" style={{borderRadius: 10}} />
                </div>
                <div style={{marginTop: '20vh'}}>
                <h1
                style={{color: "#2b0600", marginBottom: 30}}
                >
                    Login
                </h1>
                <Form>
                    <FormGroup>
                        <label htmlFor="#email">E-mail</label>
                        <FormInput 
                        id="#email" placeholder="E-mail" 
                        onChange={(event) => this.setState({email : event.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="#password">Senha</label>
                        <FormInput type="password" id="#password" placeholder="Password" 
                        onChange={(event) => {this.setState({senha : event.target.value})}}
                        />
                    </FormGroup>
                </Form>
                <Button pill block style={{backgroundColor: "#8c0406", border: 0}}
                onClick={() => this.login()}
                >
                    <strong>Entrar</strong>
                </Button>
                </div>
            </Container>
        )
    }
}