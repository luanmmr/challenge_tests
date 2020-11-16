import React, { Component } from 'react';
import api from './services/api';
import UsrMes from './componentes/UsuariosMes';
import UsrDia from './componentes/UsuariosDia';
import UsrSemana from './componentes/UsuariosSemana';
import CsmMes from './componentes/CasamentosMes';
import CsmEstilo from './componentes/CasamentosEstilo';

export default class App extends Component {
  constructor(props){
    super(props);
    this.usuariosMes = this.usuariosMes.bind(this);
    this.usuariosDia = this.usuariosDia.bind(this);
    this.state = {
      users: [],
      weddings: [],
      usrs_mes: [],
      usrs_dia: []
    }
  }

  async componentDidMount() {
    const [users, weddings] = await Promise.all([
      api.get("/user").then(resp => resp.data),
      api.get("/wedding").then(resp => resp.data)
    ]);
    this.setState({
      users: users,
      weddings: weddings
    })
  }

  usuariosMes(usrMes){
    this.setState({
      usrs_mes: usrMes
    })
  }

  usuariosDia(usrDia){
    this.setState({
      usrs_dia: usrDia
    })
  }

  render() {
    const { weddings, users, usrs_mes, usrs_dia } = this.state;
    return (
      <div>
        <fieldset>
          <legend><h1>Dados dos Usuários</h1></legend>
            <UsrMes usrs={users} evtAddUsuariosMes={this.usuariosMes} />
            <h3>Total: {usrs_mes.length}</h3>
            <UsrDia usrs={users} evtAddUsuariosDia={this.usuariosDia} />
            <h3>Total: {usrs_dia.length}</h3>
            <UsrSemana usrs={users} />
        </fieldset>
        <br></br><br></br>
        <fieldset>
          <legend><h1>Dados dos Casamentos</h1></legend>
            <CsmMes wds={weddings} />
            <CsmEstilo wds={weddings} />
        </fieldset>
      </div>
    );
  }

}
