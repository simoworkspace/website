import { Header } from './components/Header';
import { Bots } from './components/Bots';
import { Addbot } from './pages/Addbot';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Mobilemenu } from './components/Mobilemenu';
import { Bot } from './pages/Bot';
import { AddbotSubmit } from './pages/AddbotSubmit';

function App() {
    return (
        <html>
            <header>
                <Header />
            </header>
            <body>
                <Routes>
                    <Route path='/bot/:botid' element={<Bot />} />
                    <Route path='/' element={<Bots />} />
                    <Route path='addbot' element={<Addbot />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Mobilemenu />
            </body>
            
        </html>
    );
}

export default App;