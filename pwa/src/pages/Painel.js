
import React from "react";
import {
    Button,
    Container
  } from "shards-react";
import Video from "../components/Video";
import './type.css'

export default class Painel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <>
                <Container>
                    <Video 
                    video="/videos/pallets.mp4"
                    goBack={() => this.props.history.goBack()}
                    />
                </Container>                
            </>
        )
    }
}