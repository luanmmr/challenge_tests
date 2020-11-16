import React, { Component } from 'react';
import { IndicadorUsrSemana } from './styles';
import moment from 'moment';


export default class UsrSemana extends Component {
    constructor(props) {
      super(props);
      this.state = {
          date: ''
      };
      this.criados = React.createRef();
    }

    handleDate = e => {
      this.setState({
        date: e.target.value
      },
      () => {
        const { date } = this.state;
        let inicio_sem = moment(date, "YYYY-MM-DD").day(0);
        let fim_sem = moment(date, "YYYY-MM-DD").day(7);
        let weekly = [];
        this.props.usrs.map(user => {
        if (moment(user.CREATED_AT).isBetween(inicio_sem, fim_sem)){
          weekly = [ ...weekly, user.CREATED_AT];
        }
            return 0;
        });
        this.criados.current.value = weekly.length;
      });
    }
    
    render(){
        return (
          <IndicadorUsrSemana>
            <legend>Semanal</legend>
            <label>Data: </label>
            <input type="date" onChange={this.handleDate} />
            <label for="number">Criados:</label>
            <input ref={this.criados} type="number" disabled />     
          </IndicadorUsrSemana>
        );
    }
}