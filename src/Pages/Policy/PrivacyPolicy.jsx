import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <section className="privacy-policy">
      <div className="container">
        <h1 className="text-center">Privacy Policy</h1>

        <p className="mb-3">
          La presente informativa è resa ai sensi degli articoli 13 e 14 del Regolamento UE 2016/679 (GDPR) e del D.lgs. 196/2003, come modificato dal D.lgs. 101/2018.
        </p>

        <h6><strong>Titolare del trattamento</strong></h6>
        <p className="mb-3">
          Il Titolare del trattamento dei dati è Fernando Alberto Salicandro, email: studio.salicandro@gmail.com
        </p>

        <h6><strong>Tipologia di dati raccolti</strong></h6>
        <p className="mb-3">
          I dati raccolti comprendono informazioni anagrafiche, dati di contatto, dati sanitari inseriti volontariamente nel questionario, nonché eventuali preferenze espresse dall’utente.
        </p>

        <h6><strong>Finalità del trattamento</strong></h6>
        <p className="mb-3">
          I dati sono trattati per fornire il servizio richiesto, ossia l’invio delle informazioni a un professionista sanitario disponibile per assistenza domiciliare. I dati possono essere utilizzati anche per comunicazioni di servizio e miglioramento dell’esperienza utente.
        </p>

        <h6><strong>Base giuridica del trattamento</strong></h6>
        <p className="mb-3">
          Il trattamento si basa sul consenso dell’interessato, ai sensi dell’art. 6, par. 1, lett. a) del GDPR.
        </p>

        <h6><strong>Luogo del Trattamento</strong></h6>
        <p className="mb-3">
          I trattamenti avvengono presso la sede del titolare, nonché presso i server del provider del sito web. I dati sono temporaneamente gestiti in ambiente locale durante la fase di sviluppo del sito, in attesa di deploy su hosting conforme GDPR.
        </p>

        <h6><strong>Modalità del trattamento</strong></h6>
        <p className="mb-3">
          Il trattamento avviene con modalità informatiche, mediante strumenti idonei a garantire la sicurezza e la riservatezza dei dati.
        </p>

        <h6><strong>Comunicazione a terzi</strong></h6>
        <p className="mb-3">
          I dati raccolti potranno essere comunicati esclusivamente ai professionisti sanitari disponibili nella zona dell’utente. Il titolare declina ogni responsabilità per trattamenti successivi effettuati da tali soggetti.
        </p>

        <h6><strong>Utilizzo del Pixel Meta (Facebook)</strong></h6>
        <p className="mb-3">
          Questo sito utilizza il Pixel di Meta (Facebook) per monitorare le conversioni e ottimizzare le campagne pubblicitarie su Facebook e Instagram. Il Pixel consente di comprendere le azioni compiute dagli utenti sul sito dopo aver visualizzato o cliccato un’inserzione su Meta.
        </p>
        <p className="mb-3">
          I dati raccolti tramite il Pixel sono anonimizzati e utilizzati esclusivamente in forma aggregata. Nessuna informazione sanitaria viene comunicata a Meta. Il Pixel sarà attivato solo dopo aver ottenuto il consenso dell’utente attraverso il banner cookie.
        </p>

        <h6><strong>Diritti dell’interessato</strong></h6>
        <p className="mb-3">
          Gli utenti hanno il diritto di accedere ai propri dati, rettificarli, cancellarli, limitarne il trattamento o opporsi. È possibile esercitare tali diritti scrivendo a: studio.salicandro@gmail.com
        </p>

        <h6><strong>Conservazione dei dati</strong></h6>
        <p className="mb-3">
          I dati saranno conservati per il tempo necessario a fornire il servizio richiesto e comunque non oltre 12 mesi dalla raccolta, salvo obblighi di legge diversi.
        </p>

        <h6><strong>Modifiche all’informativa</strong></h6>
        <p className="mb-3">
          La presente informativa potrà essere soggetta a modifiche. Gli utenti sono invitati a consultarla periodicamente.
        </p>
      </div>
    </section>
  );
}
