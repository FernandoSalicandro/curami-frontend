// Opzioni riusabili
export const GIORNI = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica','Indifferente'].map(d => ({ title: d, value: d }));
export const ORARI = ['Mattina', 'Pomeriggio', 'Sera'].map(v => ({ title: v, value: v }));
export const URGENZA = ['1','2','3','4','5'].map(v => ({ title: v, value: v }));
export const PREF_SESSO = ['Uomini', 'Donne'].map(v => ({ title: v, value: v }));

export const  STEP_CONFIG = {
  genere: {
    component: 'multichoice',
    title: 'Sei uomo o donna?',
    options: [{ title: 'Uomo', value: 'Uomo' }, { title: 'Donna', value: 'Donna' }],
    multicheck: false
  },
  eta: {
    component: 'multichoice',
    title: 'Quanti anni hai?',
    options: ['0-17','18-25','26-35','36-45','46-55','55+'].map(v => ({ title: v, value: v })),
    multicheck: false
  },
  stato_paziente: {
    component: 'multichoice',
    title: "Sei stato operato o dimesso dall'ospedale ?",
    options: [
      { title: 'Operato', value: 'Operato' },
      { title: 'Dimesso', value: 'Dimesso' },
      { title: 'Nessuna delle due', value: 'Nessuna delle due' }
    ],
    multicheck: false
  },
  racconto_evento: {
    component: 'freetext',
    title: 'Ci racconti brevemente cosa è successo?'
  },
  servizio: {
    component: 'multichoice',
    title: 'Hai bisogno di un Infermiere o di un Fisioterapista?',
    options: [
      { title: 'Infermiere', value: 'Infermiere' },
      { title: 'Fisioterapista', value: 'Fisioterapista' },
      {title : 'Entrambi', value : 'Entrambi'},
      { title: 'Non lo so, vorrei essere guidato', value: 'Non lo so, vorrei essere guidato' }
    ],
    multicheck: false
  },
  zona_dolore: {
    component: 'multichoice',
    title: 'Dove ti fa male?',
    options: [
      { title: 'Collo', value: 'Collo' },
      { title: 'Spalla / Spalle', value: 'Spalla / Spalle' },
      { title: 'Braccia', value: 'Braccia' },
      { title: 'Mani/Polsi', value: 'Mani/Polsi' },
      { title: 'Anca / Anche', value: 'Anca / Anche' },
      { title: 'Schiena', value: 'Schiena' },
      { title: 'Gambe', value: 'Gambe' }
    ],
    multicheck: true
  },
  servizio_infermiere: {
    component: 'multichoice',
    title: 'Per quale servizio ti serve un Infermiere?',
    options: ['Punture','Somministrazione Terapie','Medicazioni','Gestione Catetere','Altro']
      .map(v => ({ title: v, value: v })),
      multicheck: true
  },
  urgenza: {
    component: 'multichoice',
    title: 'Quanto è urgente? (1 = bassa, 5 = alta)',
    options: URGENZA,
    multicheck: false
  },
  giorni: {
    component: 'checklist',
    title: 'In quali giorni sei più disponibile?',
    options: GIORNI
  },
  orari: {
    component: 'multichoice',
    title: 'In quali orari sei più disponibile?',
    options: ORARI,
    multicheck: true
  },
  preferenza_genere: {
    component: 'multichoice',
    title: 'Preferisci professionisti Uomini o Donne?',
    options: PREF_SESSO,
    multicheck: false
  },
  contatti: { // nuovo step contatti
    component: 'contact',
    title: 'come possiamo contattarti ?'
  },
  thanks: {
    component: 'thanks',
    title: 'Grazie! Ti ricontatteremo il prima possibile.'
  }
};

export default { GIORNI, ORARI, URGENZA, PREF_SESSO, STEP_CONFIG };