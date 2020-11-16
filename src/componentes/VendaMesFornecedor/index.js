import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorVndMesF } from './styles';

export default class VndMesFornecedor extends Component {
    constructor(props){
        super(props);
        this.state = {
            mes: '',
            fornecedor: ''
        }
        this.qtd = React.createRef();
        this.comissao = React.createRef();
    }

    componentDidUpdate(){
        const { mes, fornecedor } = this.state;
        let comissao = 0;
        let vendas = [];
            this.props.vnd.map(vd => {
                if (moment(vd.CREATED_AT).isSame(`${mes}`, 'month') && vd.VENDOR_ID == fornecedor) {
                    vendas = [ ...vendas, vd];
                    comissao += parseFloat(vd.AMOUNT) - parseFloat(vd.VENDOR_AMOUNT);
                }
                return 0;
            })
        this.qtd.current.value = vendas.length;
        this.comissao.current.value = comissao.toFixed(2);
    }

    handleFornecedor = e => {
        this.setState({
            fornecedor: e.target.value
        })
    }

    handleMes = e => {
        this.setState({
            mes: e.target.value
        })
    }

    render(){
        return (
            <IndicadorVndMesF>
              <legend>Vendas por mês - Fornecedor</legend>
              <label for="mes">Mês: </label>
              <input type="month" name="mes" placeholder="Ex: 2020-10" onChange={this.handleMes} />
              <label for="cd_fornecedor">ID Fornecedor: </label>
              <input type="number" name="cd_fornecedor" onChange={this.handleFornecedor} />
              <label for="qtd">Quantidade: </label>
              <input ref={this.qtd} type="number" disabled />
              <label for="comissao">Comissão Lejour: </label>
              <input ref={this.comissao} type="number" name="comissao" disabled />
            </IndicadorVndMesF>
        );
    }
}