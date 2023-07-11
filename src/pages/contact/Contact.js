import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.scss'
import Card from '../../components/card/Card'
import { FaEnvelope, FaPhoneAlt, FaGithub } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'
import { ToastContainer, toast } from 'react-toastify';
import contactImg from '../../assets/contactus.svg'
import { Link } from 'react-router-dom';

const Contact = (e) => {
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'template_uxpc3zd', form.current, 'VaPo4DMypj--R-EW5')
      .then((result) => {
          toast.success('Message sent')
      }, (error) => {
          toast.error(error.text)
      })
    
      // Empty form fields
    e.target.reset()  
  }

  return (
    <section>
      <ToastContainer />
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form onSubmit={(e) => sendEmail(e)} ref={form}>
            <Card cardClass={styles.card}>
              <label>Name:</label>
              <input type="text" name='user_name' placeholder='Full Name' required />
              <label>Email:</label>
              <input type="email" name='user_email' placeholder='Email' required />
              <label>Subject:</label>
              <input type="text" name='subject' placeholder='Subject' />
              <label>Message</label>
              <textarea name="message" cols="30" rows="10" placeholder='Write your message here...'></textarea>
              <button className='--btn --btn-primary'>Send Message</button>
            </Card>
          </form>

          <div className={styles.details}>
            <div className={styles.image}>
              <img src={contactImg} alt="Contact us" width={300} />
            </div>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt size={14}/>
                  <p>+234 342 604 1187</p>
                </span>
                <span>
                  <FaEnvelope size={14}/>
                  <p>Support@eshop.com</p>
                </span>
                <span>
                  <HiLocationMarker size={18}/>
                  <p>Miami, Florida</p>
                </span>
                <Link to='https://github.com/Alex21400'>
                  <span>
                      <FaGithub size={18} color='white'/>
                      <p>@Alex21400</p>
                  </span>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact