import React, { Component } from 'react';
import '../styles/App.css';
import * as func from './functions';
import Pokemon from './Pokemon';
import battleMusic from '../styles/Music/107 - battle.mp3'
import { Link } from 'react-router-dom'

const baseURL = 'https://pokeapi.co/api/v2';

export default class Battlefield extends Component {
    state = {
        showPopup: false,
        pokemons: []
    }

    getRandomIndex = (max) => {
        return Math.floor(Math.random() * max) + 1
    }

    componentDidMount() {
        func.fetchRequest('GET', `${baseURL}/pokemon/${this.getRandomIndex(150)}/`, (data) => {
            this.setState({
                pokemon1: {
                    isTurn: true,
                    number: 2,
                    name: data.name,
                    initialHp: Number(data.stats[5].base_stat),
                    hp: Number(data.stats[5].base_stat),
                    baseAtk: Number(data.stats[4].base_stat),
                    baseDef: Number(data.stats[3].base_stat),
                    type: data.types[0].type.name,
                    sprite: data.sprites.back_default,
                    // moveUrl: data.moves[this.getRandomIndex(data.moves.length - 1)].move.url,
                    moveUrl: [data.moves[this.getRandomIndex(data.moves.length - 1)].move.url, data.moves[this.getRandomIndex(data.moves.length - 1)].move.url, data.moves[this.getRandomIndex(data.moves.length - 1)].move.url]
                }
            })
        })
        func.fetchRequest('GET', `${baseURL}/pokemon/${this.getRandomIndex(150)}/`, (data) => {
            this.setState({
                pokemon2: {
                    isTurn: false,
                    number: 1,
                    name: data.name,
                    initialHp: Number(data.stats[5].base_stat),
                    hp: Number(data.stats[5].base_stat),
                    baseAtk: Number(data.stats[4].base_stat),
                    baseDef: Number(data.stats[3].base_stat),
                    type: data.types[0].type.name,
                    sprite: data.sprites.front_default,
                    // moveUrl: data.moves[this.getRandomIndex(data.moves.length - 1)].move.url,
                    moveUrl: [data.moves[this.getRandomIndex(data.moves.length - 1)].move.url, data.moves[this.getRandomIndex(data.moves.length - 1)].move.url, data.moves[this.getRandomIndex(data.moves.length - 1)].move.url]
                }
            })
        })
    }

    // showPopup = () => {
    //     this.setState({
    //         showPopup: true,
    //     })
    // }

    componentDidUpdate() {
        if(this.state.pokemon2 && this.state.pokemon1) {
            if(!this.state.pokemon1.hp) {
                func.fetchRequest('GET', `${baseURL}/pokemon/${this.getRandomIndex(150)}/`, (data) => {
                    this.setState({
                        pokemon1: {
                            isTurn: true,
                            number: 2,
                            name: data.name,
                            initialHp: Number(data.stats[5].base_stat),
                            hp: Number(data.stats[5].base_stat),
                            baseAtk: Number(data.stats[4].base_stat),
                            baseDef: Number(data.stats[3].base_stat),
                            type: data.types[0].type.name,
                            sprite: data.sprites.back_default,
                            // moveUrl: data.moves[this.getRandomIndex(data.moves.length - 1)].move.url,
                            moveUrl: [data.moves[this.getRandomIndex(data.moves.length - 1)].move.url, data.moves[this.getRandomIndex(data.moves.length - 1)].move.url, data.moves[this.getRandomIndex(data.moves.length - 1)].move.url]
                        }
                    });
                });
                // this.showPopup();
            }else if(!this.state.pokemon2.hp) {
                func.fetchRequest('GET', `${baseURL}/pokemon/${this.getRandomIndex(150)}/`, (data) => {
                    this.setState({
                        pokemon2: {
                            isTurn: true,
                            number: 1,
                            name: data.name,
                            initialHp: Number(data.stats[5].base_stat),
                            hp: Number(data.stats[5].base_stat),
                            baseAtk: Number(data.stats[4].base_stat),
                            baseDef: Number(data.stats[3].base_stat),
                            type: data.types[0].type.name,
                            sprite: data.sprites.front_default,
                            // moveUrl: data.moves[this.getRandomIndex(data.moves.length - 1)].move.url,
                            moveUrl: [data.moves[this.getRandomIndex(data.moves.length - 1)].move.url, data.moves[this.getRandomIndex(data.moves.length - 1)].move.url, data.moves[this.getRandomIndex(data.moves.length - 1)].move.url]
                        }
                    })
                })
                // this.showPopup();
            }
        }
    }

    attack = (playerNumber, childPwr) => {
        console.log('clicked!')
        if (playerNumber === 2) {
            const { pokemon2, pokemon1 } = this.state;
            if (!childPwr) {
                // debugger;
                this.setState({
                    pokemon2: {
                        ...pokemon2,
                        baseDef: Math.floor(this.state.pokemon2.baseDef + 5),
                        isTurn: !pokemon2.isTurn
                    },
                    pokemon1: {
                        ...pokemon1,
                        isTurn: !pokemon1.isTurn
                    }
                })
            } else {
                let damage = Number((pokemon1.baseAtk * childPwr/100) - (pokemon2.baseDef / 4));
                // debugger;
                this.setState({
                    pokemon2: {
                        ...pokemon2,
                        hp: Math.floor(this.state.pokemon2.hp - damage <= 0 ? 0 : this.state.pokemon2.hp - damage),
                        isTurn: !pokemon2.isTurn
                    },
                    pokemon1: {
                        ...pokemon1,
                        isTurn: !pokemon1.isTurn
                    }
                })
            }
        } else {
            if (playerNumber === 1) {
                const { pokemon2, pokemon1 } = this.state
                if (!childPwr) {
                    // debugger;
                    this.setState({
                        pokemon1: {
                            ...pokemon1,
                            baseDef: Math.floor(this.state.pokemon1.def + 5),
                            isTurn: !pokemon1.isTurn
                        },
                        pokemon2: {
                            ...pokemon2,
                            isTurn: !pokemon2.isTurn
                        }
                    })
                } else {
                    // const hpLess = Object.assign({}, pokemon1);
                    // delete hpLess.hp;
                    // debugger;
                    let damage = Number((pokemon2.baseAtk * childPwr/100) - (pokemon1.baseDef / 4));
                    // debugger;
                    this.setState({
                        pokemon1: {
                            ...pokemon1,
                            hp: Math.floor(this.state.pokemon1.hp - damage <= 0 ? 0 : this.state.pokemon1.hp - damage),
                            isTurn: !pokemon1.isTurn
                        },
                        pokemon2: {
                            ...pokemon2,
                            isTurn: !pokemon2.isTurn
                        }
                    })
                }
            }
        }
    }

    renderPopUp() {
        return <div className="gameover">
        <button type='button'>Play Again</button>
        <Link to='/opening'><button type='button' className='startbutton'>GIVE UP</button></Link>
      </div>
    }

    render() {

        let battlearena = '';

        if(this.state.pokemon1) {
            if(this.state.pokemon1.type == 'water') {
                battlearena = 'background-water';
            } else if (this.state.pokemon1.type == 'electric'){
                battlearena = 'background-electric';
            } else if (this.state.pokemon1.type == 'fire') {
                battlearena = 'background-fire';
            } else if (this.state.pokemon1.type == 'flying') {
                battlearena = 'background-flying';
            } else if (this.state.pokemon1.type == 'ghost') {
                battlearena = 'background-ghost';
            } else if (this.state.pokemon1.type == 'ground') {
                battlearena = 'background-ground';
            } else if (this.state.pokemon1.type == 'ice') {
                battlearena = 'background-ice';
            } else {
                battlearena = 'background-default';
            }
        }

        return (
            <div className='battlefield'>
                <div id='header'>Pokemon</div>
                <div className="battlefield-duel" >
                    <div className={battlearena}></div>
                    { this.state.pokemon1 ? <Pokemon pokemon={this.state.pokemon1} attack={this.attack} /> : null }
                    { this.state.pokemon2 ? <Pokemon pokemon={this.state.pokemon2} attack={this.attack} /> : null }
                    
                </div>
                <audio controls autoPlay loop>
                        <source src={battleMusic}  type='audio/mpeg' />
                </audio>
            </div>
        )
    }
}