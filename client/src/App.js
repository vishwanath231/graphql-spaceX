import React from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Launches from './components/Launches';
import {BrowserRouter ,Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Launch from './components/Launch';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
               <div className='container'>
                <Header />
                <Routes>
                    <Route path='/' element={<Launches /> } />
                    <Route path='/launch/:flight_number' element={ <Launch /> } />
                </Routes>
               </div>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App;