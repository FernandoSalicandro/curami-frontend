import './ChiSiamo.css'

const ChiSiamo = () => {

  return (
    <div className="page-main">
      <div className="chiSiamo-container">
        <div className="chi-siamo">
          <div className="about-caption">
            <h1 className='my-5'>Chi siamo</h1>
            <figure>
              <img src="/foto-tessera.jpeg" alt="Foto di Fernando Alberto Salicandro" />
            </figure>

            <div className="bio-box">
              <h2>Mi chiamo Fernando Alberto Salicandro, fondatore di <span className='accent'>Curami.it</span></h2>
              <p>
                Da 4 anni sognavo di creare un servizio davvero utile ai pazienti.
                Ho lavorato sia in strutture private che pubbliche, per l'Assistenza Domiciliare Integrata (ADI) e in studio. </p>
              <hr />
              <p>
                Ho visto con i miei occhi, giorno per giorno, le <span className="accent">difficoltà di pazienti</span> e parenti che troppo spesso non potevano
                accedere all'assistenza domiciliare a causa dei <span className="accent">tempi biblici</span> del SSN a sua volta oberato dalle richieste.

             

              </p>   
              <hr />
              <p>  Pazienti appena operati con un <span className="accent">bisogno urgente</span> di riabilitazione che dovevano <span className="accent">aspettare mesi</span> per iniziare le proprie cure,
                  con inevitabili esiti negativi sulla loro salute.</p>
              <hr />
              <p>
                <span className='primary'>Curami.it</span> mira proprio a <span className="accent">tagliare i tempi</span> e fornire un servizio altamente qualificato e personalizzato a <span className='accent'>costi sostenibili</span> per famiglie e pazienti.
              </p>
            </div>


            <div className="mission-box">
              <h3>Mission</h3>
              <p>
                <span className="accent">La missione</span> è tanto semplice quanto fondamentale:
                <br />
                rendere l'assistenza infermieristica e fisioterapica il più <span className="accent">rapida</span> possibile, dai <span className="accent">costi sostenibili e personalizzata</span> sulla situazione del paziente e in linea con i bisogni della famiglia, dei caregiver, di coloro che si prendono cura del paziente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )


}

export default ChiSiamo