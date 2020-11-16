import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorAgmMes } from './styles';

export default class AgmMes extends Component {
    constructor(props){
        super(props);
        this.state = {
            mes: '',
            status: ''
        }
        this.qtd = React.createRef();
    }

    componentDidUpdate(){
        const { mes, status } = this.state;
        let agendamentos = [];
        if (status !== "") {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isSame(`${mes}`, 'month') && ag.STATUS === status) {
                    agendamentos = [ ...agendamentos, ag];
                }
                return 0;
            })
        } else {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isSame(`${mes}`, 'month')) {
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

    render(){
        return (
            <IndicadorAgmMes>
              <legend>Agendamentos por mês</legend>
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
              <label for="qtd">Quantidade: </label>
              <input ref={this.qtd} type="number" disabled />
            </IndicadorAgmMes>
        );
    }
}