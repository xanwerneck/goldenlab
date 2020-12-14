import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button,
    Container,
    Row
  } from "shards-react";
import Menu from "../components/Menu";
import Ocorrencia from "../components/Ocorrencia";
import Video from "../components/Video";
import FirebaseService from "../services/FirebaseService";
import { calculaTempo } from "../utils/helpers";
import './type.css'

export default class Maquina extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maquina : null
        }
    }
    componentDidMount() {
        this.setState({
            maquina : this.props.location.state.maquina
        })
    }
    render() {
        return (
            <>
                <Menu 
                    goLogin={() => this.props.history.push('/login')}
                />
                <Container>
                {
                    this.state.maquina ? (
                        <Card style={{borderRadius: 0}}>
                            <CardImg src={this.state.maquina.value.image} />
                            <CardBody>
                                <CardTitle>{this.state.maquina.value.nome}</CardTitle>
                                <p>{this.state.maquina.value.descricao}</p>
                            </CardBody>
                            <CardFooter>
                                Esta máquina está em operação há <strong>{calculaTempo(this.state.maquina.value.inicio_operacao)}</strong>
                            </CardFooter>
                        </Card>
                    ) : null
                }
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