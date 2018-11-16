import React, { Component } from 'react';
import '../styles/App.css';
import * as func from './functions';

export default class Pokemon extends Component {
    state = {
        number: this.props.pokemon.number,
    }

    capitalizeFirst = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }

    // componentDidMount() {
    //     const { moveUrl } = this.props.pokemon;
    //     func.fetchRequest('GET', moveUrl, (move) => {
    //         this.setState({
    //             move: {
    //                 number: this.props.pokemon.number,
    //                 name: move.name,
    //                 power: move.power,
    //                 pp: move.pp,
    //                 damageClass: move.damage_class.name
    //             }
    //         })
    //     })
    // }

    componentDidMount() {
        const { moveUrl } = this.props.pokemon;
        let promiseArray = moveUrl.map((url) => fetch(url));
        Promise.all(promiseArray)
        .then((respArray) => Promise.all(respArray.map(resp => resp.json())))
        .then((dataArray) => this.setState({
            moves: dataArray
        }))
    }

    // attack = () => {
    //     this.props.attack(this.state.number, this.state.move.power)
    //     console.log(this.state.move.power)
    // }

    render(){
        console.log(this.state)
        const attack = this.props.attack;
        const { name, type, hp, initialHp, sprite } = this.props.pokemon;
        const { moves } = this.state
        let movesJSX = '';
        if (moves) {
            movesJSX = moves.map((move) => {
                return <button type='button' className='pokemon-info__attack' 
                onClick={ () => attack(this.state.number, Number(move.power)) }
                name = {move.name}
                power = { Number(move.power) }
                pp = {move.pp}
                damageClass = {move.damage_class.name}
                > { move ? move.name : null } </button>
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
                    {/* <button type='button' className='pokemon-info__attack' onClick={this.attack}> { move ? move.name : null } </button> */}
                </div>
            </div>
        )
    }
}