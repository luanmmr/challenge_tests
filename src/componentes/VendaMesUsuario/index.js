import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorVndMesU } from './styles';

export default class VndMesUsuario extends Component {
    constructor(props){
        super(props);
        this.state = {
            mes: '',
            usuario: ''
        }
        this.qtd = React.createRef();
        this.comissao = React.createRef();
    }

    componentDidUpdate(){
        const { mes, usuario } = this.state;
        let comissao = 0;
        let vendas = [];
            this.props.vnd.map(vd => {
                if (moment(vd.CREATED_AT).isSame(`${mes}`, 'month') && vd.WEDDING_ID == usuario) {
                    vendas = [ ...vendas, vd];
                    comissao += parseFloat(vd.AMOUNT) - parseFloat(vd.VENDOR_AMOUNT);
                }
                return 0;
            })
        this.qtd.current.value = vendas.length;
        this.comissao.current.value = comissao.toFixed(2);
    }

    handleUsuario = e => {
        this.setState({
            usuario: e.target.value
        })
    }

    handleMes = e => {
        this.setState({
            mes: e.target.value
        })
    }

    render(){
        return (
            <IndicadorVndMesU>
              <legend>Vendas por mês - Usuário</legend>
              <label for="mes">Mês: </label>
              <input type="month" name="mes" placeholder="Ex: 2020-10" onChange={this.handleMes} />
              <label for="cd_usuario">ID Usuário: </label>
              <input type="number" name="cd_usuario" onChange={this.handleUsuario} />
              <label for="qtd">Quantidade: </label>
              <input ref={this.qtd} type="number" disabled />
              <label for="comissao">Comissão Lejour: </label>
              <input ref={this.comissao} type="number" name="comissao" disabled />
            </IndicadorVndMesU>
        );
    }
}