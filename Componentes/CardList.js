import React from 'react';
import Card from './Card';
import pokebola from '../img/pokebola.png'
import SearchBox from './SearchBox';

class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            pokemons: []
        };
    }

    criarCardsPokemon() {
        return this.state.pokemons.map((pokemon) => {
            return <Card pokemon = {pokemon} key = {pokemon.name} />
        });
    }

    buscarPokemons(evento) {
        const nomePokemon = evento.target.value.toLowerCase()
        const pokemon = this.state.loadedPokemons
        const pokemonFiltrado = pokemon.filter((pokemon) => pokemon.name.includes(nomePokemon))
        this.setState({
            pokemons: pokemonFiltrado
        })
    }

    render() {
        const isLoaded = this.state.isLoaded;

        if (!isLoaded) {
            return(
                <div className='card-list__body'>
                    Carregando...
                </div>
            );
        }
        else {
            return(
                    <div className='card-list__body'>
                        <header className='card-list__body__img'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png' 
                            className='card-list__img__pokemon'
                            alt='pokemon'/>
                            <menu className='card-list__body__pokebola'>
                                <img src={pokebola} width='30' alt='pokebola'/>
                                <span className='card-list__body__pokedex'>Pokedex</span>
                            </menu>
                        </header>
                        <SearchBox placeholder='Buscar Pokemons...' funcaoBuscar={(evento) => this.buscarPokemons(evento)}/>
                        <div className='card-list'>
                            {this.criarCardsPokemon()}
                        </div>
                        <footer className='card-list__body__footer'>
                            <span><strong>Criador:</strong> Jonathan Sulliman</span>
                            <span><strong>Projeto criado com React.js</strong></span>
                            <span><strong>Projeto para aula de Front-End da 
                                <a href='https://blueedtech.com.br/' target='_blanck'> Blue-EdTech</a>
                            </strong></span>
                        </footer>
                    </div>
            );
        }
    }

    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/pokemon")
        .then(resultado => resultado.json())
        .then(resultadoJson =>{
            this.setState({
                isLoaded: true,
                loadedPokemons: resultadoJson.results,
                pokemons: resultadoJson.results
            })
        });
    }       
}

export default CardList;