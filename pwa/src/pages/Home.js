import { faChartBar, faNotEqual, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Row, Col, Button, Card, CardBody, CardImg } from "shards-react";
import Menu from "../components/Menu";
import Ocorrencia from "../components/Ocorrencia";
import Video from "../components/Video";
import FirebaseService from "../services/FirebaseService";
import { mascaraData } from "../utils/helpers";
import './type.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ocorrencias : [],
            maquinas : []
        }
    }
    componentDidMount() {
        FirebaseService.getDataList('ocorrencias', (data) => {
            var data_list = []
            data_list = data.filter(item => {
                if(!item.value.resolvido){
                    return item
                }
            })
            this.setState({
                ocorrencias : data_list
            })
        })

        FirebaseService.getDataList('maquinas', (data) => {
            this.setState({
                maquinas : data
            })
        })
    }
    render() {
        return (
            <>
            <Menu 
                goLogin={() => this.props.history.push('/login')}
            />
            <h4 style={{margin: 20}}>
                Desvios na operação
            </h4>
            <div style={{margin: 15}}>
            {
                this.state.ocorrencias.map((item, i) => {
                    return (
                        <Ocorrencia 
                        categoria={item.value.descricao} 
                        data={mascaraData(item.value.data_ocorrencia)} 
                        resolvido={item.value.resolvido}
                        document={item} />
                    )
                })
            }
            </div>            
            <h4 style={{margin: 20}}>
               Maquinário
            </h4>
            <div style={{margin: 15}}>
            <Row>
            {
                this.state.maquinas.map((item, i) => {
                    return (
                    <Col xs="6">
                        <Card onClick={() => this.props.history.push('/maquina', {maquina: item})}>
                            <CardBody>
                                <CardImg src={item.value.image} style={{maxWidth: "100%"}} />
                                <p style={{fontSize: 12, marginTop: 15}}>
                                    {item.value.nome}
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    )
                })
            }
            </Row>
            </div>
            <div style={{margin: 15, marginTop: 30}}>
                <Button pill block
                onClick={() => this.props.history.push('/chatbot')}
                style={{backgroundColor: "#8C0406", border: 0, borderRadius: 20, fontSize: 20}}
                >
                    <Row>
                        <Col style={{marginTop: 10}}>
                            <FontAwesomeIcon icon={faRobot} />
                        </Col>
                        <Col>
                            <div class="typewriter">
                                <h1>Oi... Quer alguma ajuda?</h1>
                            </div>
                        </Col>
                    </Row>
                    
                    
                </Button>

                <Button pill block
                onClick={() => this.props.history.push('/painel')}
                style={{backgroundColor: "#333333", border: 0, borderRadius: 20, fontSize: 20}}
                >
                    <Row>
                        <Col style={{marginTop: 10}}>
                            <FontAwesomeIcon icon={faChartBar} />
                        </Col>
                        <Col>
                             <div class="painel">
                                <h1>Me leva para o painel</h1>
                            </div>
                        </Col>
                    </Row>
                    
                    
                </Button>
            </div>

    </>
        )
    }
}