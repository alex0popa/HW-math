import { useState } from "react";

import { Container } from "./Elements";

export const Generator = ({ setShowGenerator, generate }) => {
  const [input, setInput] = useState(10);
  const [withChange, setWithChange] = useState(true);
  const disabled = input < 10;

  const handleSubtraction = () => setWithChange(!withChange);

  const handleClick = () => {
    if (input >= 10) {
      generate(input, withChange);
      setShowGenerator(false);
    }
  };

  const handleChange = ({ target: { value }, key }) => {
    key === 'Enter' && handleClick();
    !isNaN(value) && setInput(Number(value));
  };
  
  return (
    <Container >
      <p>Scegli il numero piu grande che userai per le operazioni, minimo 10</p>
      <div style={{ display: 'flex',  justifyContent: "center" }}>
        <input
          placeholder="Inserisci il numero piu grande"
          style={{ width: '195px', marginBottom: '1rem' }}
          onChange={handleChange}
          onKeyPress={handleChange}
          value={input}
        />
        <button
          onClick={handleClick}
          disabled={disabled}
          style={{
            backgroundColor: disabled ? '' : 'green',
            color: disabled ? 'black' : 'whitesmoke',
            width: '50px',
            height: '25px',
            borderRadius: '10px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            marginLeft: '5px'
          }}
        >
          Ok
        </button>
      </div>
      <p>Sottrazioni: </p>
      <span>

        <label>Con cambio</label>
        <input
          type="checkbox"
          checked={withChange}
          onClick={handleSubtraction}
        />
      </span>
      <span>
        <label>Senza cambio</label>
        <input
          type="checkbox"
          checked={!withChange}
          onClick={handleSubtraction}
        />
      </span>
    </Container>
  );
;}
