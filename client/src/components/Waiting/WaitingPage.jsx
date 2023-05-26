import { useState } from 'react';
import Timer from './hourglass.png';
import emailjs from 'emailjs-com';

const WaitingPage = () => {
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = () => {
    emailjs.init('ZFssj1wAXblN5GwbS')
    emailjs
      .send('service_kxvcwrh', 'template_6ojknj8', {
        to_name: 'Popa Laurentiu',
        to_email: 'popa.laur.01@gmail.com',
        message: 'Someone is trying to activate his account',
      })
      .then(
        (response) => {
          console.log('Email sent:', response.text);
          setEmailSent(true);
        },
        (error) => {
          console.error('Email not sent:', error);
        }
      );
  };

  return (
    <div className="waiting-page">
      <h2>Thank you for submitting the form!</h2>
      {!emailSent && (
        <div className='em-send'>
          <h3>
            Send an email to our team and 
            in a short period of time we are going to confirm your identity and
            come back with an email when your account is going to be activated.
          </h3>
          <button onClick={sendEmail} className='send-email'>Send Email</button>
        </div>
      )}
      {emailSent && (
        <div className='em-sent'>
          <h3>An email has been sent to our team. We will be back shortly ! </h3>
          <img src={Timer} alt="Hourglass" />
        </div>
      )}
    </div>
  );
};

export default WaitingPage;
