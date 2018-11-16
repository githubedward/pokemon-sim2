import React, { Component } from 'react';
import '../styles/App.css';
import * as func from './functions';

export default class Pokemon extends Component {
    state = {
    }

    capitalizeFirst = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }

    componentDidMount() {
        const { moveUrl } = this.props.pokemon
        if (moveUrl) {
            func.fetchRequest('GET', moveUrl, (move) => {
                this.setState({
                    move: {
                        number: this.props.pokemon.number,
                        name: move.name,
                        power: move.power,
                        pp: move.pp,
                        damageClass: move.damage_class.name
                    }
                })
            })
        }
    }

    attack = () => {
        this.props.attack(this.state.move.number, this.state.move.power)
        console.log(this.state.move.power)
    }

    render(){
        // console.log(this.state)
        const { name, type, hp, sprite } = this.props.pokemon;
        const { move } = this.state
        const { attack } = this.props

        return (
            <div className='pokemon'>
                <img src={ sprite } alt='Pokemon Sprite'/>
                <div className='pokemon-info'>
                    <h2>Name: { this.capitalizeFirst(name) } </h2>
                    <h2>Type: { this.capitalizeFirst(type) } </h2>
                    <h2>HP: { hp } </h2>
                </div>
                <button type='button' className='pokemon-attack' onClick={this.attack}> { move ? move.name : null } </button>
            </div>
        )
    }
}