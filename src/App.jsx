import { useEffect, useState } from 'react';
import './App.css';

const OPERATIONS = ['-', '+'];

const generateOperations = () => [...Array(20)].reduce(
  accumulator => {
    // random oparation: addition/subtraction
    const opType = Math.floor(Math.random() * 2);

    // random first number
    let n1 = Math.floor(Math.random() * 21);

    // random second number, if addition, make sure it doesn't go beyond 20
    let n2 = Math.floor(Math.random() * (opType ? 20 - n1 : 21));

    // if subtraction, first number must be the largest
    !opType && n1 < n2 && ([n1, n2] = [n2, n1]);

    const str = `${n1} ${OPERATIONS[opType]} ${n2} = `;
    const res = opType ? n1 + n2 : n1 - n2;

    accumulator.expressions.push(str);
    accumulator.results.push(res);

    return accumulator;
  },
  { expressions: [], results: [] }
);

const App = () => {
  const [humanRes, setHumanRes] = useState(Array(20).fill(''));
  const [endResults, setEndResults] = useState(Array(20).fill(''));
  const [{ expressions, results }, setOperations] = useState({
    expressions: [],
    results: []
  });

  useEffect(() => {
    setOperations(generateOperations());
  }, []);

  const generate = () => {
    setHumanRes(endResults.map(_ => ''));
    setEndResults(endResults.map(_ => ''));
    setOperations(generateOperations());
  };

  const onChange = (e) => {
    const { value, name: i } = e.target;

    setHumanRes(pr => [...pr.slice(0, +i), +value, ...pr.slice(+i + 1)]);
  };

  const list = expressions.map((expression, i) => 
    <div key={i} className="row">
      <p>{expression}</p>
      <input className="inp" value={humanRes[i]} onChange={onChange} name={i} />
      <h3
        className="end-result"
        style={{ backgroundColor: endResults[i] === 'RIGHT' ? 'green' : 'red'}}
      >
        {endResults[i]}
      </h3>
    </div>  
  );

  const verify = () => {
    humanRes.includes('')
      ? alert('Per favore inserisci tutti i risultati...')
      : setEndResults(results.map(
        (result, i) => result === humanRes[i] ? 'RIGHT' : 'WRONG'
      ));
  };

  return (
    <div className="grid">
      {list}
      <div className="btns">
        <button className="btn-verify" onClick={verify}>
          Verify
        </button>
        <button className="btn-generate" onClick={generate}>
          Genarate
        </button>
      </div>
    </div>
  );
}

export default App;
