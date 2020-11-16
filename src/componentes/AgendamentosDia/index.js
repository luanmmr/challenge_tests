import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorAgmDia } from './styles';

export default class AgmDia extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
            status: ''
        }
        this.qtd = React.createRef();
    }

    componentDidUpdate(){
        const { data, status } = this.state;
        let agendamentos = [];
        if (status !== "") {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isSame(`${data}`, 'day') && ag.STATUS === status) {
                    agendamentos = [ ...agendamentos, ag];
                }
                return 0;
            })
        } else {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isSame(`${data}`, 'day')) {
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

    render(){
        return (
            <IndicadorAgmDia>
              <legend>Agendamentos por dia</legend>
              <label for="data">Data: </label>
              <input type="date" name="data" onChange={this.handleData} />
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
            </IndicadorAgmDia>
        );
    }
}