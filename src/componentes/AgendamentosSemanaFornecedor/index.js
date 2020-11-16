import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorAgmSemanaFornecedor } from './styles';

export default class AgmSemanaFornecedor extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
            status: '',
            fornecedor: ''
        }
        this.qtd = React.createRef();
    }

    componentDidUpdate(){
        const { fornecedor, data, status } = this.state;
        let inicio_sem = moment(data, "YYYY-MM-DD").day(0);
        let fim_sem = moment(data, "YYYY-MM-DD").day(7);
        let agendamentos = [];
        if (status !== "") {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isBetween(inicio_sem, fim_sem) && ag.STATUS === status && 
                    ag.VENDOR_ID == fornecedor) {
                    agendamentos = [ ...agendamentos, ag];
                }
                return 0;
            })
        } else {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isBetween(inicio_sem, fim_sem) && ag.VENDOR_ID == fornecedor) {
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

    handleData = e => {
        this.setState({
            data: e.target.value
        })
    }

    handleFornecedor = e => {
        this.setState({
            fornecedor: e.target.value
        })
    }

    render(){
        return (
            <IndicadorAgmSemanaFornecedor>
              <legend>Agendamentos por semana - ID Fornecedor</legend>
              <label for="data">Data: </label>
              <input type="date" name="data" placeholder="Ex: 2020-10" onChange={this.handleData} />
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
            </IndicadorAgmSemanaFornecedor>
        );
    }
}