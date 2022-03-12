import { useState } from 'react';

import Emoji from "react-emoji-render";

import { Generator } from './Generator';
import '../App.css';


const OPERATIONS = ['+', '-'];
const COLORS = ['blue', 'red'];

const colorNr = (nr, i) => <span style={{ color: COLORS[i] }}>{nr}</span>

const formatStr = (n1, n2, opType) => {
  const firstNr = String(n1).split('').reverse().map(colorNr).reverse();
  const secondNr = String(n2).split('').reverse().map(colorNr).reverse();

  return (
    <h3>
      {firstNr} {OPERATIONS[opType]} {secondNr}{' = '}
    </h3>
  )
}

const generateOperations = (max, withChange) => [...Array(40)].reduce(
  (accumulator, _, i) => {
    // random oparation: addition/subtraction
    const isSubtraction = i % 2;

    // random first number
    let n1 = Math.floor(Math.random() * max + 1);

    // random second number
    let n2 = Math.floor(Math.random() * (max + 1));

    //  if addition, make sure it doesn't go beyond n
    while(!isSubtraction && n1 + n2 > max) {
      n2 = Math.floor(Math.random() * (max + 1));
    }

    // subtractions without exchange
    while (!withChange && isSubtraction && (n1 < n2 || n1 % 10 < n2 % 10)) {
      n2 = Math.floor(Math.random() * (max + 1));
    }

    // if subtraction, first number must be the largest
    isSubtraction && n1 < n2 && ([n1, n2] = [n2, n1]);

    const str = max > 100 || max <= 10 ?  (
      <h3>{`${n1} ${OPERATIONS[isSubtraction]} ${n2} = `}</h3>
    ) : (
      formatStr(n1, n2, isSubtraction)
    );
    const res = isSubtraction ? n1 - n2 : n1 + n2;

    accumulator.expressions.push(str);
    accumulator.results.push(res);

    return accumulator;
  },
  { expressions: [], results: [] }
);

export const Operations = () => {
  const [showGenerator, setShowGenerator] = useState(true);
  const [{ expressions, results }, setOperations] = useState({
    expressions: [],
    results: []
  });
  const [endResults, setEndResults] = useState(Array(40).fill(''));
  const [humanRes, setHumanRes] = useState(Array(40).fill(''));
  
  const generate = (n, withChange) => {
    setShowGenerator(!showGenerator);
    setHumanRes(endResults.map(_ => ''));
    setEndResults(endResults.map(_ => ''));
    setOperations(generateOperations(n, withChange));
  };

  const onChange = (e) => {
    const value = Number(e.target.value);
    const i = Number(e.target.name);

    !isNaN(value) && setHumanRes(
      pr => [...pr.slice(0, i), value, ...pr.slice(i + 1)]
    );
  };

  const list = expressions.map((expression, i) => 
    <div key={i} className="row">
      <p>{expression}</p>
      <input className="inp" value={humanRes[i]} onChange={onChange} name={i} />
      {endResults[i]}
    </div>  
  );

  const verify = () => {
    humanRes.includes('')
      ? alert('Per favore inserisci tutti i risultati...')
      : setEndResults(results.map(
        (result, i) => <Emoji text={ result !== humanRes[i] ? ':-1:' : '❤️'} />
      ));
  };

  return (
    <>
     
      {showGenerator ? (
        <Generator
          setShowGenerator={setShowGenerator}
          generate={generate}
        />
      ) : (
        <>
          <div className="grid">
            {list}
          </div>
          <div className="btns">
            <button
              className="btn-verify"
              onClick={verify}
              style={{ borderRadius: '20px', cursor: 'pointer' }}
            >
              Verifica
            </button>
            <button
              className="btn-generate"
              onClick={() => setShowGenerator(true)}
              style={{ borderRadius: '20px', cursor: 'pointer' }}
            >
              Genera nuova lista
            </button>
          </div>
        </>
    )}
    </>
  );
};
