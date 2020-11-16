import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorUsrMes } from './styles';

export default class UsrMes extends Component {
  constructor(props){
    super(props);
    this.usuariosCriadosMes = this.usuariosCriadosMes.bind(this);
    this.state = {
      mes: ''
    }
  }

  mes = e => {
    this.setState({
      mes: e.target.value
    });
  }

  usuariosCriadosMes(mes) {
    let usuarios_mes = []
    this.props.usrs.map(user => {
      if (moment(user.CREATED_AT).isSame(`${mes}`, 'month')){
        usuarios_mes = [ ...usuarios_mes, user.CREATED_AT];
      }
        return 0;
    });
    this.props.evtAddUsuariosMes(usuarios_mes);
  }


  render(){
    const { mes } = this.state;
    return (
      <IndicadorUsrMes>
          <legend>Usuários criados no mês</legend>
            <label for="mes">Mês: </label>
              <input type="month" name="mes" placeholder="Ex: 2020-10" onChange={this.mes} />
              <input type="button" value="Buscar" onClick={() => this.usuariosCriadosMes(mes)} />
      </IndicadorUsrMes>
    );
  }   
}