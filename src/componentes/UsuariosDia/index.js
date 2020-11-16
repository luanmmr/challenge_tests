import React, { Component } from 'react';
import moment from 'moment';
import { IndicadorUsrDia } from './styles';

export default class UsrDia extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: ''
        }
    }

    data = e => {
        this.setState({
          data: e.target.value
        })
    }

    usuariosCriadosMes(data) {
        let usuarios_dia = []
        this.props.usrs.map(user => {
          if (moment(user.CREATED_AT).isSame(`${data}`, 'day')){
            usuarios_dia = [ ...usuarios_dia, user.CREATED_AT];
          }
            return 0;
        });
        this.props.evtAddUsuariosDia(usuarios_dia);
      }

    render(){
        const { data } = this.state;
        return(
            <IndicadorUsrDia>
            <legend>Usuários criados no dia</legend>
              <label for="data">Data: </label>
              <input type="date" name="data" onChange={this.data} />
              <input type="button" value="Buscar" onClick={() => this.usuariosCriadosMes(data)} />
            </IndicadorUsrDia>
        );
    }

}
