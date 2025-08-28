import './IniziaQuestionario.css'
import '../../Pages/Questionario/Questionario.css'

const IniziaQuestionario = () => {
  return (
    <div className="questionario-page">
      <div className="questionario-container">
        <div className="questionnaire-heading">
          <h1 className='text-center'>Benvenuto/a nel tuo questionario</h1>
          <hr className='' />
          <h2 className='text-center px-2'>Raccoglieremo la tua esperienza e le tue esigenze, così potrai ricevere vera assistenza personalizzata</h2>
          <h3 className='text-center px-4'>Se sei pronto/a clicca su inzia, ci vediamo dall'altra parte !</h3>
          <button className="btn questionnaire-button my-5"><a href="/questionario">Inizia Questionario</a></button>
         
        </div>

      
      </div>
    </div>
  );
}

export default IniziaQuestionario