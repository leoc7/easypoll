import React from 'react';
import GlobalStyle from './styles/common/globalstyle';
import Routes from './Routes';
import Header from './components/Header';

function App() {
    return (
        <>
            <Header />
            <GlobalStyle />
            <Routes />
        </>
    );
}

export default App;
