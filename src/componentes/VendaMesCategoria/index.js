import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorVndMesC } from './styles';

export default class VndMesCategoria extends Component {
    constructor(props){
        super(props);
        this.state = {
            mes: '',
            categoria: ''
        }
        this.qtd = React.createRef();
        this.comissao = React.createRef();
    }

    componentDidUpdate(){
        const { mes, categoria } = this.state;
        let vendas = [];
        let comissao = 0;
            this.props.vnd.map(vd => {
                if (moment(vd.CREATED_AT).isSame(`${mes}`, 'month') && vd.VENDOR_CATEGORY === categoria) {
                    vendas = [ ...vendas, vd];
                    comissao += parseFloat(vd.AMOUNT) - parseFloat(vd.VENDOR_AMOUNT);
                }
                return 0;
            })
        this.qtd.current.value = vendas.length;
        this.comissao.current.value = comissao.toFixed(2);
    }

    handleCategoria = e => {
        this.setState({
            categoria: e.target.value
        })
    }

    handleMes = e => {
        this.setState({
            mes: e.target.value
        })
    }

    render(){
        return (
            <IndicadorVndMesC>
              <legend>Vendas por mês - Categoria</legend>
              <label for="mes">Mês: </label>
              <input type="month" name="mes" placeholder="Ex: 2020-10" onChange={this.handleMes} />
              <label for="categoria">Categoria: </label>
              <select id="status" onChange={this.handleCategoria}>
                  <option value="" selected>Escolha...</option>
                  <option value="espaco">Espaço</option>
                  <option value="assessoria-de-casamento">Assessoria de Casamento</option>
                  <option value="mobiliario">Mobiliário</option>
                  <option value="decoracao-cenografia">Decoração-Cenografia</option>
                  <option value="buffet">Buffet</option>
                  <option value="servico-de-bar-bartender">Serviço de Bartender</option>
                  <option value="banda">Banda</option>
                  <option value="som-iluminacao">Som-Iluminação</option>
                  <option value="brinde-lembrancinhas">Brinde-Lembrancinhas</option>
                  <option value="foto-e-filmagem">Foto e Filmagem</option>
                  <option value="bolos-doces">Bolos DOces</option>
                  <option value="dj">Dj</option>
                  <option value="coral-orquestra">Coral-Orquestra</option>
                  <option value="aluguel-de-carro">Aluguel de carro</option>
                </select>
              <label for="qtd">Quantidade: </label>
              <input ref={this.qtd} type="number" disabled />
              <label for="comissao">Comissão Lejour: </label>
              <input ref={this.comissao} type="number" name="comissao" disabled />
            </IndicadorVndMesC>
        );
    }
}