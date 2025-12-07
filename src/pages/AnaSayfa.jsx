import { Link } from "react-router-dom";

export default function AnaSayfa() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>React Fortgeschrittene Arbeiten</h1>
      <p>
        In diesem Projekt gibt es Beispieldateien zu Formularen und der
        Benutzerliste. Du kannst fortfahren, indem du einen der folgenden Links
        auswählst.
      </p>

      <nav style={{marginTop: '1.5rem'}}>
        <ul style={{listStyle:'none', padding: 0, display: 'flex', gap:'1rem'}}>
            <li><Link to='/formlar'>Formbeispiele</Link></li>
            <li><Link to='/kullanicilar' >Benutzersliste</Link></li>

        </ul>
      </nav>
    </main>
  );
}
