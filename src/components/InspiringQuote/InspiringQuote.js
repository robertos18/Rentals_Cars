import { useEffect, useState, useLayoutEffect } from "react";

const quotes = [
  'Budujemy samochody, których nikt nie potrzebuje, ale każdy chce mieć..” – Ferry Porsche',
  'Pierwszego samochodu i pierwszej kobiety nigdy nie zapomnisz.” –  Stirling Moss',
  'Samochód jest dopiero wtedy szybki, kiedy rano stoisz przed nim i boisz się go otworzyć. - Walter Röhrl',
  'Nie czekaj. Pora nigdy nie będzie idealna.” – Napoleon Hill',
  'Jeśli zaczynasz jeździć Bentleyem, zdecydowanie tracisz ochotę na siadanie za kółkiem Rolls Royce..” – Louis Malle',
  'Jeśli myślisz, że przygody bywają niebezpieczne, spróbuj rutyny. Ona jest śmiercionośna.”  – Paulo Coelho',
  'Dopiero kiedy masz naprawdę drogi samochód, należysz do świata bogatych..” – Ralph Lauren',
];

const styles = {
  position: 'absolute',
  padding: '10px',
  top: '10px',
  left: 0,
  right: 0,
  textAlign: 'center',
  color: '#fff',
  fontSize: '0.9rem',
  fontStyle: 'italic',
};

function InsporingQuote(props) {
  const [quote, setQuote] = useState('Wczytywanie cytatu...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useLayoutEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [loading]);

  return (
    <p style={styles}>{quote}</p>
  );
}

export default InsporingQuote;