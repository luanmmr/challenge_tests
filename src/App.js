import React, { Component } from 'react';
import api from './services/api';
import UsrMes from './componentes/UsuariosMes';
import UsrDia from './componentes/UsuariosDia';
import UsrSemana from './componentes/UsuariosSemana';
import CsmMes from './componentes/CasamentosMes';
import CsmEstilo from './componentes/CasamentosEstilo';
import AgmDia from './componentes/AgendamentosDia';
import AgmMes from './componentes/AgendamentosMes';
import AgmSemana from './componentes/AgendamentosSemana';
import AgmDiaFornecedor from './componentes/AgendamentosDiaFornecedor';
import AgmMesFornecedor from './componentes/AgendamentosMesFornecedor';
import AgmSemanaFornecedor from './componentes/AgendamentosSemanaFornecedor';
import AgmDiaCasamento from './componentes/AgendamentosDiaCasamento';
import AgmMesCasamento from './componentes/AgendamentosMesCasamento';
import AgmSemanaCasamento from './componentes/AgendamentosSemanaCasamento';
import AgmDiaCategoria from './componentes/AgendamentosDiaCategoria';
import AgmMesCategoria from './componentes/AgendamentosMesCategoria';
import AgmSemanaCategoria from './componentes/AgendamentosSemanaCategoria';
import { AppFieldSet } from './styles';

export default class App extends Component {
  constructor(props){
    super(props);
    this.usuariosMes = this.usuariosMes.bind(this);
    this.usuariosDia = this.usuariosDia.bind(this);
    this.state = {
      users: [],
      weddings: [],
      appointments: [],
      usrs_mes: [],
      usrs_dia: []
    }
  }

  async componentDidMount() {
    const [users, weddings, appointments] = await Promise.all([
      api.get("/user").then(resp => resp.data),
      api.get("/wedding").then(resp => resp.data),
      api.get("/appointment").then(resp => resp.data)
    ]);
    this.setState({
      users: users,
      weddings: weddings,
      appointments: appointments   
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
    const { appointments, weddings, users, usrs_mes, usrs_dia } = this.state;
    return (
      <div>
        <AppFieldSet>
          <legend><h1>Dados do Usuário</h1></legend>
            <UsrMes usrs={users} evtAddUsuariosMes={this.usuariosMes} />
            <h3>Total: {usrs_mes.length}</h3>
            <UsrDia usrs={users} evtAddUsuariosDia={this.usuariosDia} />
            <h3>Total: {usrs_dia.length}</h3>
            <UsrSemana usrs={users} />
        </AppFieldSet>
        <AppFieldSet>
          <legend><h1>Dados do Casamento</h1></legend>
            <CsmMes wds={weddings} />
            <CsmEstilo wds={weddings} />
        </AppFieldSet>
        <AppFieldSet>
          <legend><h1>Dados de Agendamento</h1></legend>
          <AgmDia agm={appointments} />
          <AgmMes agm={appointments} />
          <AgmSemana agm={appointments} />
          <AgmDiaFornecedor agm={appointments} />
          <AgmMesFornecedor agm={appointments} />
          <AgmSemanaFornecedor agm={appointments} />
          <AgmDiaCasamento agm={appointments} />
          <AgmMesCasamento agm={appointments} />
          <AgmSemanaCasamento agm={appointments} />
          <AgmDiaCategoria agm={appointments} />
          <AgmMesCategoria agm={appointments} />
          <AgmSemanaCategoria agm={appointments} />
        </AppFieldSet>
      </div>
    );
  }

}
