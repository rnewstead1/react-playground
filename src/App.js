import { ApolloProvider } from '@apollo/client';
import './App.css';
import { Playground } from './components/Playground'

function App({ client }) {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Playground client={client} />
      </div>
    </ApolloProvider>
  );
}

export default App;
