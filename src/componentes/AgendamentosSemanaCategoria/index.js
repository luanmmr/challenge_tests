import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorAgmSemanaCategoria } from './styles';

export default class AgmSemanaCategoria extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',
            status: '',
            categoria: ''
        }
        this.qtd = React.createRef();
    }

    componentDidUpdate(){
        const { categoria, data, status } = this.state;
        let inicio_sem = moment(data, "YYYY-MM-DD").day(0);
        let fim_sem = moment(data, "YYYY-MM-DD").day(7);
        let agendamentos = [];
        if (status !== "") {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isBetween(inicio_sem, fim_sem) && ag.STATUS === status && 
                    ag.VENDOR_CATEGORY == categoria) {
                    agendamentos = [ ...agendamentos, ag];
                }
                return 0;
            })
        } else {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isBetween(inicio_sem, fim_sem) && ag.VENDOR_CATEGORY == categoria) {
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

    handleCategoria = e => {
        this.setState({
            categoria: e.target.value
        })
    }

    render(){
        return (
            <IndicadorAgmSemanaCategoria>
              <legend>Agendamentos por samana - Categoria</legend>
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
              <label for="fornecedor">Categoria: </label>
              <select id="categoria" onChange={this.handleCategoria}>
                  <option value="" selected>Escolha...</option>
                  <option value="assessoria-de-casamento">Assessoria de Casamento</option>
                  <option value="buffet">Buffet</option>
                  <option value="espaco">Espaço</option>
                  <option value="foto-e-filmagem">Foto e Filmagem</option>
                  <option value="lista-de-presentes">Lista de Presentes</option>
                </select>
              <label for="qtd">Quantidade: </label>
              <input ref={this.qtd} type="number" disabled />
            </IndicadorAgmSemanaCategoria>
        );
    }
}