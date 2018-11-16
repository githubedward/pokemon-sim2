import React, { Component } from 'react';
import '../styles/App.css';
import * as func from './functions';
import Pokemon from './Pokemon';

const baseURL = 'https://pokeapi.co/api/v2';
const pikachuURL = '/pokemon/pikachu/';
const charmanderURL = '/pokemon/charmander/';

export default class Battlefield extends Component {
    state = {}

    getRandomIndex = () => {
        return Math.floor(Math.random() * 149) + 1
    }

    componentDidMount() {
        func.fetchRequest('GET', `${baseURL}/pokemon/${this.getRandomIndex()}/`, (data) => {
            const randomIndex = Math.floor(Math.random() * data.moves.length - 1);
            this.setState({
                pokemon1: {
                    number: 2,
                    name: data.name,
                    hp: Number(data.stats[5].base_stat),
                    type: data.types[0].type.name,
                    sprite: data.sprites.back_default,
                    moveUrl: data.moves[randomIndex].move.url,
                }
            })
        })
        func.fetchRequest('GET', `${baseURL}/pokemon/${this.getRandomIndex()}/`, (data) => {
            const randomIndex = Math.floor(Math.random() * data.moves.length - 1);
            this.setState({
                pokemon2: {
                    number: 1,
                    name: data.name,
                    hp: Number(data.stats[5].base_stat),
                    type: data.types[0].type.name,
                    sprite: data.sprites.front_default,
                    moveUrl: data.moves[randomIndex].move.url,
                }
            })
        })
    }

    // deleteState = (prop, childProp) => {
    //     let obj = Object.assign({}, prop);
    //     delete obj[childProp];
    // }

    attack = (playerNumber, childDmg) => {
        console.log('clicked!')
        if (playerNumber == 2) {
            const { pokemon2 } = this.state
            const hpLess = Object.assign({}, pokemon2);
            delete hpLess.hp;
            this.setState({
                pokemon2: {
                    ...hpLess,
                    hp: Math.floor(this.state.pokemon2.hp * ( !childDmg ? 1 : childDmg/100 ))
                }
            })
        }
        if (playerNumber == 1) {
            const { pokemon1 } = this.state
            const hpLess = Object.assign({}, pokemon1);
            delete hpLess.hp;
            this.setState({
                pokemon1: {
                    ...hpLess,
                    hp: Math.floor(this.state.pokemon1.hp * ( !childDmg ? 1 : childDmg/100 ))
                }
            })
        }
    }

    render() {
        // console.log(this.state);
        return (
            <div className="battlefield">
                { this.state.pokemon1 ? <Pokemon pokemon={this.state.pokemon1} attack={this.attack} /> : null }
                { this.state.pokemon2 ? <Pokemon pokemon={this.state.pokemon2} attack={this.attack} /> : null }
            </div>
        )
    }
}