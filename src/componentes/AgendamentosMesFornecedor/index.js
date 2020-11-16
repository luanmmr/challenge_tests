import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorAgmMesFornecedor } from './styles';

export default class AgmMesFornecedor extends Component {
    constructor(props){
        super(props);
        this.state = {
            mes: '',
            status: '',
            fornecedor: ''
        }
        this.qtd = React.createRef();
    }

    componentDidUpdate(){
        const { fornecedor, mes, status } = this.state;
        let agendamentos = [];
        if (status !== "") {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isSame(`${mes}`, 'month') && ag.STATUS === status && 
                    ag.VENDOR_ID == fornecedor) {
                    agendamentos = [ ...agendamentos, ag];
                }
                return 0;
            })
        } else {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isSame(`${mes}`, 'month') && ag.VENDOR_ID == fornecedor) {
                    agendamentos = [ ...agendamentos, ag];
                }
                return 0;
            })
        }
        this.qtd.current.value = agendamentos.length;
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

    handleFornecedor = e => {
        this.setState({
            fornecedor: e.target.value
        })
    }

    render(){
        return (
            <IndicadorAgmMesFornecedor>
              <legend>Agendamentos por mês - ID Fornecedor</legend>
              <label for="mes">Mês: </label>
              <input type="month" name="mes" placeholder="Ex: 2020-10" onChange={this.handleMes} />
              <label for="status">Status: </label>
              <select id="status" onChange={this.handleStatus}>
                  <option value="" selected>Todos</option>
                  <option value="CREATED">Criados</option>
                  <option value="CANCELED">Cancelados</option>
                  <option value="CONFIRMED">Confirmados</option>
                  <option value="VISITED">Visitados</option>
                </select>
              <label for="fornecedor">ID Fornecedor: </label>
              <input type="number" name="fornecedor" onChange={this.handleFornecedor} />
              <label for="qtd">Quantidade: </label>
              <input ref={this.qtd} type="number" disabled />
            </IndicadorAgmMesFornecedor>
        );
    }
}