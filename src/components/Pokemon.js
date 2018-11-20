import React, { Component } from 'react';
import '../styles/App.css';
import * as func from './functions';

export default class Pokemon extends Component {
    state = {
        number: this.props.pokemon.number,
        isTurn: this.props.pokemon.isTurn
    }

    capitalizeFirst = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }

    componentDidMount() {
        const { moveUrl } = this.props.pokemon;
        let promiseArray = moveUrl.map((url) => fetch(url));
        Promise.all(promiseArray)
        .then((respArray) => Promise.all(respArray.map(resp => resp.json())))
        .then((dataArray) => this.setState({
            moves: dataArray
        }))
    }

    componentDidUpdate(prevProps) {
        // debugger;
        if (prevProps.pokemon.isTurn !== this.props.pokemon.isTurn) {
            console.log(`pokemon-${this.state.number}'s turn!`);
            this.setState({
                isTurn: this.props.pokemon.isTurn  
            })
        }
    }

    render(){
        // console.log(this.state)
        const attack = this.props.attack;
        const { name, type, hp, initialHp, sprite } = this.props.pokemon;
        const { moves, isTurn } = this.state

        let movesJSX = '';
        if (moves && isTurn) {
            movesJSX = moves.map((move, index) => {
                return <button type='button' className='pokemon-info__attack' 
                key={index}
                onClick={ () => attack(this.state.number, Number(move.power))}
                // onClick={ () => {attack(this.state.number, Number(move.power))
                //     this.setState({
                //         isTurn: !this.state.isTurn
                //     })}}
                name = {move.name}
                power = { Number(move.power) }
                pp = {move.pp}
                // damageClass = {move.damage_class.name}
                > { move ? move.name : null } </button>
            })
        } else if (moves && !isTurn) {
            movesJSX = moves.map((move, index) => {
                return <div type='button' className='pokemon-info__attack--disabled pokemon-info__attack' 
                key={index}
                name = {move.name}
                power = { Number(move.power) }
                pp = {move.pp}
                // damageClass = {move.damage_class.name}
                > { move ? move.name : null } </div>
            })
        }

        return (
            <div className='pokemon'>
                <img src={ sprite } alt='Pokemon Sprite'/>
                <div className='pokemon-info'>
                    <h2 className='pokemon-info__text'>{ this.capitalizeFirst(name) } </h2>
                    <h4 className='pokemon-info__text'>{ this.capitalizeFirst(type) } </h4>
                    <h4 className='pokemon-info__text'>HP: { hp } </h4>
                    <progress className='pokemon-info__health' value={ hp } max={ initialHp }></progress>
                    { movesJSX }
                </div>
            </div>
        )
    }
}