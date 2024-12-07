import React, { useState} from 'react';
import './App.scss';
import {Description} from "./Description";
import {Implementation} from "./Implementation";

export const App = () => {
    const [isDescription, setIsDescription ] = useState(false)

    return (
        <div className="App">
           <div className={'tabs'}>
               <button onClick={() => setIsDescription(true)} className={isDescription ? 'active' : ''}>Description</button>
               <button onClick={() => setIsDescription(false)} className={!isDescription ? 'active' : ''}>Implementation</button>
           </div>

            <div className={'content'}>
                {isDescription ? <Description /> : <Implementation />}
            </div>
        </div>
    );
}

export default App;
