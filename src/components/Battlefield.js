import React, { Component } from 'react';
import '../styles/App.css';
import * as func from './functions';
import Pokemon from './Pokemon';
import battleMusic from '../styles/Music/107 - battle.mp3'

const baseURL = 'https://pokeapi.co/api/v2';

export default class Battlefield extends Component {
    state = {
        pokemons: []
    }

    getRandomIndex = (max) => {
        return Math.floor(Math.random() * max) + 1
    }

    componentDidMount() {
        func.fetchRequest('GET', `${baseURL}/pokemon/${this.getRandomIndex(150)}/`, (data) => {
            this.setState({
                pokemon1: {
                    number: 2,
                    name: data.name,
                    hp: Number(data.stats[5].base_stat),
                    baseAtk: Number(data.stats[4].base_stat),
                    baseDef: Number(data.stats[3].base_stat),
                    type: data.types[0].type.name,
                    sprite: data.sprites.back_default,
                    moveUrl: data.moves[this.getRandomIndex(data.moves.length - 1)].move.url,
                }
            })
        })
        func.fetchRequest('GET', `${baseURL}/pokemon/${this.getRandomIndex(150)}/`, (data) => {
            this.setState({
                pokemon2: {
                    number: 1,
                    name: data.name,
                    hp: Number(data.stats[5].base_stat),
                    baseAtk: Number(data.stats[4].base_stat),
                    baseDef: Number(data.stats[3].base_stat),
                    type: data.types[0].type.name,
                    sprite: data.sprites.front_default,
                    moveUrl: data.moves[this.getRandomIndex(data.moves.length - 1)].move.url,
                }
            })
        })
    }

    attack = (playerNumber, childDmg) => {
        console.log('clicked!')
        if (playerNumber === 2) {
            const { pokemon2, pokemon1 } = this.state
            if (!childDmg) {
                const defLess = Object.assign({}, pokemon2);
                delete defLess.baseDef;
                this.setState({
                    pokemon2: {
                        ...defLess,
                        baseDef: Math.floor(this.state.pokemon2.def + 5)
                    }
                })
            } else {
                const hpLess = Object.assign({}, pokemon2);
                delete hpLess.hp;
                let damage = (pokemon1.baseAtk * childDmg/100) * (pokemon2.baseDef/100)
                this.setState({
                    pokemon2: {
                        ...hpLess,
                        hp: Math.floor(this.state.pokemon2.hp - damage) <= 0 ? 0 : Math.floor(this.state.pokemon2.hp - damage)
                    }
                })
            }
        } else {
            if (playerNumber === 1) {
                const { pokemon2, pokemon1 } = this.state
                if (!childDmg) {
                    const defLess = Object.assign({}, pokemon1);
                    delete defLess.baseDef;
                    this.setState({
                        pokemon1: {
                            ...defLess,
                            baseDef: Math.floor(this.state.pokemon1.def + 5)
                        }
                    })
                } else {
                    const hpLess = Object.assign({}, pokemon1);
                    delete hpLess.hp;
                    let damage = (pokemon2.baseAtk * childDmg/100) * (pokemon1.baseDef/100)
                    this.setState({
                        pokemon1: {
                            ...hpLess,
                            hp: Math.floor(this.state.pokemon1.hp - damage) <= 0 ? 0 : Math.floor(this.state.pokemon1.hp - damage)
                        }
                    })
                }
            }
        }
    }

    render() {
        return (
            <div className="battlefield">
                <div className='background'></div>
                { this.state.pokemon1 ? <Pokemon pokemon={this.state.pokemon1} attack={this.attack} /> : null }
                { this.state.pokemon2 ? <Pokemon pokemon={this.state.pokemon2} attack={this.attack} /> : null }
                <audio controls autoPlay loop>
                    {/* <source src='Assets/Music/107 - battle.mp3'  type='audio/mpeg' /> */}
                    <source src={battleMusic}  type='audio/mpeg' />
                </audio>
            </div>
        )
    }
}