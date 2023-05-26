import { Header } from './components/Header';
import { Bots } from './components/Bots';
import { Addbot } from './pages/Addbot';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Mobilemenu } from './components/Mobilemenu';

function App() {
    return (
        <>
        <Mobilemenu/>
            <header>
                <Header/>
            </header>
            <body>
                <Routes>
                    <Route path='/' element={<Bots/>}/>
                    <Route path='addbot' element={<Addbot/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </body>
        </>
    );
}

export default App;