import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorCsmMes } from './styles';

export default class CsmMes extends Component {
    constructor(props){
        super(props);
        this.state = {
            mes: ''
        }
        this.qtd = React.createRef();
    }

    componentDidUpdate(){
        const { mes } = this.state;
        let casamentos_mes = []
        this.props.wds.map(wd => {
            if (moment(wd.WEDDING_DATE).isSame(`${mes}`, 'month')){
              casamentos_mes = [ ...casamentos_mes, wd.WEDDING_DATE];
            }
              return 0;
        });
        this.qtd.current.value = casamentos_mes.length;
    }

    mes = e => {
      this.setState({
        mes: e.target.value
      })
    }

    render(){
        return(
            <IndicadorCsmMes>
                <legend>Casamentos no Mês</legend>
                 <label for="mes">Mês: </label>
                 <input type="month" name="mes" placeholder="Ex: 2020-10" onChange={this.mes} />
                 <label for="qtd">Quantidade: </label>
                 <input ref={this.qtd} type="number" disabled />
            </IndicadorCsmMes>
        );
    }
}