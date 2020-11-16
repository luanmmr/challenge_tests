import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorAgmDiaCategoria } from './styles';

export default class AgmDiaCategoria extends Component {
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
        let agendamentos = [];
        if (status !== "" && categoria !== "") {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isSame(`${data}`, 'day') && ag.STATUS === status 
                    && ag.VENDOR_CATEGORY == categoria) {
                    agendamentos = [ ...agendamentos, ag];
                }
                return 0;
            }) 
        } else {
            this.props.agm.map(ag => {
                if (moment(ag.BEGINS_AT).isSame(`${data}`, 'day') && ag.VENDOR_CATEGORY == categoria) {
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
            <IndicadorAgmDiaCategoria>
              <legend>Agendamentos por dia - Categoria</legend>
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
            </IndicadorAgmDiaCategoria>
        );
    }
}