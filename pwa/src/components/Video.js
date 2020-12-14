import React from "react";
import captureVideoFrame from "capture-video-frame";
import { Alert, Button, Card, CardBody, Container } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FirebaseService from "../services/FirebaseService";
import { firestore } from "firebase";

export default class Video extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            interval : 0,
            results : []
        }
    }

    onPlay = () => {
        var intervalID = setInterval(() => {
            const frame = captureVideoFrame("video-pallet", "png");

            // Upload
            fetch('https://malte-ambev.herokuapp.com/monitoramento/api/image', {
                method : "POST",
                body : JSON.stringify({
                    'image' : frame.dataUri.replace('data:image/png;base64,', '')
                }),
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                if (res.message == "NOT OK") {
                    var current_timestamp = new Date().getTime()
                    FirebaseService.pushData('ocorrencias', {
                        descricao : "Pallet com defeito",
                        maquina: "Despalitizadora",
                        resolvido: false,
                        data_ocorrencia: new Date()
                    }, (data) => {
                        console.log(data)
                    })
                }
                this.setState({
                    results : [...this.state.results, res]
                })
            })
            .catch(error => {
                this.setState({
                    results : [...this.state.results, error]
                })
            })
        }, 9000)
        this.setState({
            interval : intervalID
        })
    }
    onPause = () => {
        clearInterval(this.state.interval)
    }

    render() {
        return (
            <Container>
                <Card style={{marginTop: 20}}>
                    <CardBody>
                        <video width="100%" controls autoPlay id="video-pallet" onPlay={() => this.onPlay()} onPause={() => this.onPause()}>
                            <source src={this.props.video} type="video/mp4" />
                        </video>
                    </CardBody>
                </Card>
                <div style={{marginTop : 20}}>
                {
                    this.state.results.map((item, i) => {
                        return (
                            <div key={i}>
                                {
                                    item.message == "OK" ? (
                                        <Alert theme="light">
                                            Pallet OK
                                        </Alert>    
                                    ) : (
                                        <Alert theme="warning">
                                            <strong>Erro! </strong> Foi identificado um pallet com defeito na linha de produção
                                        </Alert>
                                    )
                                }
                            </div>
                            
                        )
                    })
                }
                </div>

                <div style={{margin: 15, marginTop: 30}}>
                    <Button pill block
                    style={{backgroundColor: "#8C0406", border: 0, fontSize: 20}}
                    onClick={()=>this.props.goBack()}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </div>
            </Container>
        )
    }
}