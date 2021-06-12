import React from 'react'
import {Link} from 'react-router-dom'

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.id = parseInt(props.match.params.id);

        this.state = {
            isLoaded: false,
            pokemon: {}
        }
    }

    criarListaTipos() {
        return this.state.pokemon.types.map((tipo) => {
            return <span className={`info__body__types__type info__body__types__type--${tipo.type.name}`} key={tipo.type.name}>{tipo.type.name}</span>
        })
    }

    criarListaHabilidades() {
        return this.state.pokemon.abilities.map((habilidade) => {
            return <span className={habilidade.ability.name} key={habilidade.ability.name}>{habilidade.ability.name}</span>
        })
    }

    // criarListaFraquesa() {
    //     return this.state.pokemon.weaknesses.map((weak) => {
    //         return <span className={weak} key={weak}>{weak}</span>
    //     })
    // }

    render() {
        const isLoaded = this.state.isLoaded;

        if (!isLoaded) {
            return (
                <div className='info'>
                    Carregando...
                </div>
            )
        }
        else {
            const pokemon = this.state.pokemon;
            const imageId=`000${pokemon.id}`.slice(-3);
            const imageSrc = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`
            return(
                <section className='info'>
                    <div className='info__header'>
                        {pokemon.name}
                    </div>
                    <div className='info__body'>
                        <div className='info__body__block'>
                            <img className='info__body__img' src={imageSrc} alt={pokemon.name} />
                        </div>
                        <div className='info__body__block'>
                            <p><strong>Height:</strong> {`${pokemon.height}m`}</p>
                            <p><strong>Weight:</strong> {`${pokemon.weight}kg`}</p>
                            <p><strong>Abilities:</strong> {this.criarListaHabilidades()}</p>
                            <strong>Type:</strong>
                            <div className='info__body__type'>
                                {this.criarListaTipos()}
                            </div>
                            {/* <strong>Weaknesses:</strong>
                            <div className='info-weak'>
                                {this.criarListaFraquesa()}
                            </div> */}
                        </div>
                    </div>
                    <div className='info__footer'>
                        <Link to='/' className='info__footer__link'>Voltar</Link>
                    </div>
                </section>
            );
        }

    }

    componentDidMount() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
        .then(resultado => resultado.json())
        .then(resultadoJson =>{
            this.setState({
                isLoaded: true,
                pokemon: resultadoJson
            })
        }) 
    }
}

export default Info