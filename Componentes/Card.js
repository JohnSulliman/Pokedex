import React from 'react';
import {Link} from 'react-router-dom'

class Card extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoaded: false,
            pokemon: {}
        }


    }

    criarListaTipos() {
        return this.state.pokemon.types.map((tipo) => {
            return <span className={`card-list__card__card-type card-list__card__card-type--${tipo.type.name}`} key={this.state.pokemon.id + '-' + tipo.type.name}>{tipo.type.name}</span>
        })
    }

    render(){
        const { isLoaded, pokemon} = this.state;

        if (!isLoaded) {
            return(
                <div className='card-list__card'>
                    Carregando...
                </div>
            )
        }
        else {
            const imageId=`000${pokemon.id}`.slice(-3);
            const imageSrc = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`

            return(
                <Link to={`/pokemon/${pokemon.id}`}>
                    <div className='card-list__card'>
                        <img className='card-list__card__img'src={imageSrc} alt={pokemon.name} />
                        <div className='card-list__card__info'>
                            <p className='card-list__card__id'>Nº {pokemon.id}</p>
                        </div>
                        <h5 className='card-list__card__name'>{pokemon.name}</h5>
                        <div className='card-list__card__types'>
                            {this.criarListaTipos()}
                        </div>
                    </div>
                </Link>
            );
        }

    }

    componentDidMount() {
        fetch(this.props.pokemon.url)
        .then(resultado => resultado.json())
        .then(resultadoJson =>{
            this.setState({
                isLoaded: true,
                pokemon: resultadoJson
            })
        }) 
    }
    
}

export default Card;