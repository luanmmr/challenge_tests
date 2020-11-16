import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorCsmEstilo } from './styles';

export default class CsmEstilo extends Component {
    constructor(props){
        super(props);
        this.state = {
            mes: '',
            estilo: ''
        }
        this.qtd = React.createRef();
    }

    componentDidUpdate(){
        const { mes, estilo } = this.state;
        let casamentos = [];
        this.props.wds.map(wd => {
            if (moment(wd.WEDDING_DATE).isSame(`${mes}`, 'month') && wd.STYLE === estilo) {
                casamentos = [ ...casamentos, wd];
            }
            return 0;
        });
        this.qtd.current.value = casamentos.length;
    }

    handleEstilo = e => {
        this.setState({
            estilo: e.target.value
        })
    }

    handleMes = e => {
        this.setState({
            mes: e.target.value
        })
    }

    render(){
        return (
            <IndicadorCsmEstilo>
                <legend>Casamentos por Estilo no Mês</legend>
                <label for="mes">Mês: </label>
                <input type="month" name="mes" placeholder="Ex: 2020-10" onChange={this.handleMes} />
                <label for="estilo">Estilo: </label>
                <select id="estilo" onChange={this.handleEstilo}>
                  <option value="nenhum" selected>Escolha...</option>
                  <option value="classico">Clássico</option>
                  <option value="moderno">Moderno</option>
                  <option value="rustico">Rústico</option>
                </select>
                <label for="qtd">Quantidade: </label>
                 <input ref={this.qtd} type="number" disabled />
            </IndicadorCsmEstilo>
        );
    }
}