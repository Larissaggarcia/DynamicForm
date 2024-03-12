import React, { useState } from 'react';
import Styles from '../../styles/TicketForm.module.css';
import FormImage from '../../images/form-img.png';
import { ZendeskData } from './ZendeskAPI';

function Forms() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await ZendeskData(name, email, subject, description);
      console.log(response);
        setName('');
        setEmail('');
        setSubject('');
        setDescription('');
    } catch (error) {
      console.error('Erro ao criar o ticket:', error);
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.imagemContainer}>
        <img src={FormImage} alt="img" className={Styles.imagem} />
      </div>
      <form onSubmit={handleSubmit} className={Styles.formulario}>
        <div className={Styles.formTitle}>Open Ticket of Service</div>
        <div className={Styles.inputs}>
          <label>
            Account Name
            <input
              type="text"
              value={name}
              placeholder='Account Name*'
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </div>
        <div className={Styles.inputs}>
          <label>
          Requester Email*
            <input
              type="email"
              value={email}
              placeholder='Requester Email'
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div className={Styles.inputs}>
          <label>
          Subject*
            <input
              type="text"
              value={subject}
              placeholder='Subject'
              onChange={(event) => setSubject(event.target.value)}
            />
          </label>
        </div>
        <div className={Styles.inputs}>
          <label>
          Detailing
            <textarea
              value={description}
              placeholder='Detailing'
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
}

export default Forms;
