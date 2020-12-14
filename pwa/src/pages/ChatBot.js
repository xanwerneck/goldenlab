import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Container,
    Row
  } from "shards-react";
import Chat from "../components/Chat";
import Menu from "../components/Menu";
import Ocorrencia from "../components/Ocorrencia";
import Video from "../components/Video";
import FirebaseService from "../services/FirebaseService";
import { calculaTempo } from "../utils/helpers";
import './type.css'

export default class ChatBot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message_list : []
        }
    }
    componentDidMount() {
        this.addMensagem('Bem-vindo, estou pronto...', 'left')
    }

    addMensagem = (message, side, type = 'text', link = '', nome_arquivo = '') => {
        var message_new = {
            position: side,
            type: type ? type : "text",
            text: nome_arquivo ? nome_arquivo : message,
            date: new Date(),
            link : link
        }
        this.setState({
            message_list : [...this.state.message_list, message_new]
        })
    }
    render() {
        return (
            <>
                <Menu 
                    goLogin={() => this.props.history.push('/login')}
                />
                <Container>
                <Chat 
                message_list={this.state.message_list}
                addMensagem={this.addMensagem}
                />
                <div style={{margin: 15, marginTop: 30}}>
                    <Button pill block
                    style={{backgroundColor: "#8C0406", border: 0, fontSize: 20}}
                    onClick={()=>this.props.history.goBack()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </div>
                </Container>
                
            </>
        )
    }
}