import './TestimonialCard.css'

const TestimonialCard = ({quote, patient, photo, photo_alt}) => {
  return (
    <div className='testimonial-card'>
        
        <div className="photo">
            <img src={photo} alt={photo_alt} />
            
        </div>
        <div className="quote">
            
           <p className='text-center'>{quote}</p>
        </div>
        <div className="patient-testimonial">
            <h4 className='text-center'>{patient}</h4>
        </div>
        
       </div>
  )
}

export default TestimonialCard