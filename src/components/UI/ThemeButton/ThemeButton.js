import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

const buttonStyles = {
  color: '#fff',
  border: 0,
  backgroundColor: 'transparent',
  marginLeft: 2
}

export default function ThemeButton(props) {
  const theme = useContext(ThemeContext);

  return (
    <button
      style={buttonStyles}
      onClick={theme.changeTheme}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bucket-fill" viewBox="0 0 16 16">
        <path d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0a4.5 4.5 0 0 1 8.945 0H3.527z" />
      </svg>
    </button>
  );
}