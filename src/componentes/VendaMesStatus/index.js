import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorVndMesS } from './styles';

export default class VndMesStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
            mes: '',
            status: ''
        }
        this.qtd = React.createRef();
        this.comissao = React.createRef();
    }

    componentDidUpdate(){
        const { mes, status } = this.state;
        let vendas = [];
        let comissao = 0;
        if (status !== "") {
            this.props.vnd.map(vd => {
                if (moment(vd.CREATED_AT).isSame(`${mes}`, 'month') && vd.ACCEPTED === status) {
                    vendas = [ ...vendas, vd];
                    comissao += parseFloat(vd.AMOUNT) - parseFloat(vd.VENDOR_AMOUNT);
                }
                return 0;
            })
        } else {
            this.props.vnd.map(vd => {
                if (moment(vd.CREATED_AT).isSame(`${mes}`, 'month')) {
                    vendas = [ ...vendas, vd];
                    comissao += parseFloat(vd.AMOUNT) - parseFloat(vd.VENDOR_AMOUNT);
                }
                return 0;
            })
        }
        this.qtd.current.value = vendas.length;
        this.comissao.current.value = comissao.toFixed(2);
    }

    handleStatus = e => {
        this.setState({
            status: e.target.value
        })
    }

    handleMes = e => {
        this.setState({
            mes: e.target.value
        })
    }

    render(){
        return (
            <IndicadorVndMesS>
              <legend>Vendas por mês - Status</legend>
              <label for="mes">Mês: </label>
              <input type="month" name="mes" placeholder="Ex: 2020-10" onChange={this.handleMes} />
              <label for="status">Status: </label>
              <select id="status" onChange={this.handleStatus}>
                  <option value="" selected>Todos</option>
                  <option value="TRUE">Aceita</option>
                  <option value="FALSE">Não Aceita</option>
                </select>
              <label for="qtd">Quantidade: </label>
              <input ref={this.qtd} type="number" disabled />
              <label for="comissao">Comissão Lejour: </label>
              <input ref={this.comissao} type="number" name="comissao" disabled />
            </IndicadorVndMesS>
        );
    }
}