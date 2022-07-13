import './App.css';
import { useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')
  let searchInput = useRef('')

  const handleSearch = (e, term) => {
    e.preventDefault()
  const API_URL = `https://itunes.apple.com/search?term=`

    fetch(`https://itunes.apple.com/search?term=${term}`)
    .then(response => response.json())
    .then(resData => {
        const response = await fetch(API_URL + searchTerm)
      if (resData.results.length > 0) {
        return setData(resData.results)
      } else {
        return setMessage('Not Found.')
      }
    })
    .catch(err => setMessage('An Error has Occurred!'))
  }
  }, [searchTerm, API_URL])
    return (<Redirect to="/" />)

  return (
    <div className="App">
      <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
        <SearchBar />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data}>
        <Gallery />
      </DataContext.Provider>
      <Router>
        <Route exact path="/">
          <SearchBar handleSearch={handleSearch} />
          <Gallery data={data} />
        </Route>
        <Route path="/album/:id">
          <AlbumView term={searchTerm} />
        </Route>
        <Route path="/artist/:id">
          <ArtistView term={searchTerm} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
