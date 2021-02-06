import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import logo from './logo.svg';
import './App.css';
import { Playground } from './components/Playground'

const client = new ApolloClient({
  uri: 'http://localhost:8080',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Playground client={client} />
      </div>
    </ApolloProvider>
  );
}

export default App;
