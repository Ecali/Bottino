import React, { Component } from 'react'
import CardIn from './card';
import BuySell from './formBuySell';
import {Container, Row, Col} from 'react-bootstrap';
class Stock extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentPrice : '',
            currentPriceFloat : 0,
            descriptionPrice: '',
            codePrice: ''
        }
        this.btcCode = 'BTC'
        this.titleBit = 'VALORE ATTUALE DEI BITCOIN';
        this.titleBalance = 'IL TUO BILANCIO';
        this.titleOrder = 'PLACE ORDER';

        this.text = '';
        this.balance = 35
        this.bitcoinBalance = 0.00035;
    }
    componentDidMount(){
        this.fetchBTC();
    }
    howManyBTC(){
        return (this.balance / this.state.currentPriceFloat).toFixed(6);
    }
    fetchBTC(){
        const API_LINK = 'https://api.coindesk.com/v1/bpi/currentprice/EUR.json';

        fetch(API_LINK)
            .then(res => res.json())
            .then(data => {
                let price = data.bpi.EUR;
                this.setState({
                    currentPrice : price.rate,
                    currentPriceFloat : price.rate_float,
                    descriptionPrice : price.description,
                    codePrice: price.code
                });
                console.log('rate : '+ this.state.currentPriceFloat);
                console.log(price);
            })
            .catch(console.log)

    }
    render() {
        this.text = this.state.currentPrice +' '+ this.state.codePrice;
        //this.bitcoinBalance = this.howManyBTC();
        return (
            <Container className='main-container'>
                <Row>
                    <Col className='col-sm-8'>
                        <CardIn
                        title = {this.titleBit}
                        text = {this.text}
                        description = {this.state.descriptionPrice}
                        />
                    </Col>
                    <Col>
                        <CardIn
                        title = {this.titleBalance}
                        text = {this.balance + ' '+ this.state.codePrice}
                        text2 = {this.bitcoinBalance + ' '+ this.btcCode}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className='col-sm-8' >

                    </Col>
                    <Col>
                        <CardIn 
                        title = {this.titleOrder}
                        text= {<BuySell/>}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default Stock;
