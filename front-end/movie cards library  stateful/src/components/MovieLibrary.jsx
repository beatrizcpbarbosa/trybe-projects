// implement AddMovie component here
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    const { movies } = this.props;

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };
  }

  handleState = (paramState) => {
    this.setState((previusState) => ({ movies: [...previusState.movies, paramState] }));
    // aqui estou pegando as informações do novo filme e adicionando junto com os filmes que já existem no state movies
  }

  handleChangeText = (event) => {
    this.setState({ searchText: event.target.value });
    // estou pegando o valor de cada input do SeachBar e passando para o estado
  }

  handleChangeBookmark = (event) => {
    this.setState({ bookmarkedOnly: event.target.value });
  }

  handleChangeGenre = (event) => {
    this.setState({ selectedGenre: event.target.value });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre } = this.state;

    let { movies } = this.state;

    const filterMoviesByBookmarked = movies.filter((movie) => movie.bookmarked === true);

    const filterMoviesByGenre = movies.filter((movie) => movie.genre === selectedGenre);

    const filterMoviesByText = movies.filter((movie) => movie.title.includes(searchText)
      || movie.subtitle.includes(searchText)
      || movie.storyline.includes(searchText));

    if (searchText) movies = filterMoviesByText;
    if (bookmarkedOnly) movies = filterMoviesByBookmarked;
    if (selectedGenre) movies = filterMoviesByGenre;

    return (
      <div>

        <h2> My awesome movie library </h2>
        <SearchBar
          searchText={ searchText }
          bookmarkedOnly={ bookmarkedOnly }
          selectedGenre={ selectedGenre }
          onSearchTextChange={ this.handleChangeText }
          onBookmarkedChange={ this.handleChangeBookmark }
          onSelectedGenreChange={ this.handleChangeGenre }
        />
        <MovieList movies={ movies } />
        <AddMovie onClick={ this.handleState } />

      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default MovieLibrary;

// o instrutor Matheus Yuri Silva Domingos me ajudou a entender a logica de onde chamar o que desse componente e nas funções que são passadas como props para o componente SeachBAr
// Na lógica de filtragem dos filmes, consultei o pull request da Ana Ventura
