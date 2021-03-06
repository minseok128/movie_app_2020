import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = { isLoading: true };
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies: movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span>
              Loading<br></br>
              Loading<br></br>
              Loading<br></br>
            </span>
          </div>
        ) : (
          <div className="movies">
            <h1 className="main__title">A Film</h1>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                rating={movie.rating}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
                poster={movie.medium_cover_image}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
