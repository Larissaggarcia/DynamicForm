import React, { useState, useEffect  } from 'react';
import Styles from '../../styles/TicketForm.module.css';
import FormImage from '../../images/form-img.png';
import { ZendeskData } from './ZendeskAPI';

const modules = [
  { value: '', label: 'Choose an option' },
  { value: 'Orders', label: 'Orders' },
  { value: 'Payments', label: 'Payments' },
  { value: 'Catalog', label: 'Catalog' },
  { value: 'Others', label: 'Others' },
];

function Forms() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [dynamicFields, setDynamicFields] = useState({});
  const [detailing, setDetailing] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    const mandatoryFieldsFilled = name !== '' && email !== '' && subject !== '' && detailing !== '' && Object.values(dynamicFields).every(value => value !== '');
    setAllFieldsFilled(mandatoryFieldsFilled);
  }, [name, email, subject, detailing, dynamicFields]);
  

  const handleModuleChange = (event) => {
    setSubject(event.target.value);
    setDynamicFields({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const description = buildDescription();
    try {
      await ZendeskData(name, email, subject, description);
      setName('');
      setEmail('');
      setSubject('');
      setDynamicFields({});
      setDetailing('');
    } catch (error) {
      console.error('Erro ao criar o ticket:', error);
    }
  };

  const buildDescription = () => {
    let description = detailing + '\n';
    Object.entries(dynamicFields).forEach(([key, value]) => {
      description += `${key}: ${value}\n`;
    });
    return description.trim();
  };

  const renderDynamicFields = () => {
    switch (subject) {
      case 'Orders':
        return (
          <>
            <div className={Styles.inputs}>
              <label>
                Order Number*
                <input
                  type="text"
                  value={dynamicFields['Order Number'] || ''}
                  onChange={(event) => setDynamicFields({ ...dynamicFields, 'Order Number': event.target.value })}
                />
              </label>
            </div>
            <div className={Styles.checkboxStyle}>
              <label>
                <input
                  type="checkbox"
                  checked={dynamicFields['Affecting All Users?'] || false}
                  onChange={(event) => setDynamicFields({ ...dynamicFields, 'Affecting All Users?': event.target.checked })}
                />
                Affecting All Users
              </label>
            </div>
          </>
        );
      case 'Payments':
        return (
          <>
            <div className={Styles.inputs}>
              <label>
                Transaction Number*
                <input
                  type="text"
                  value={dynamicFields['Transaction Number'] || ''}
                  onChange={(event) => setDynamicFields({ ...dynamicFields, 'Transaction Number': event.target.value })}
                />
              </label>
            </div>
            <div className={Styles.inputs}>
              <label>
                Transaction Status*
                <input
                  type="text"
                  value={dynamicFields['Transaction Status'] || ''}
                  onChange={(event) => setDynamicFields({ ...dynamicFields, 'Transaction Status': event.target.value })}
                />
              </label>
            </div>
            <div className={Styles.inputs}>
              <label>
                Payment Acquirer*
                <input
                  type="text"
                  value={dynamicFields['Payment Acquirer'] || ''}
                  onChange={(event) => setDynamicFields({ ...dynamicFields, 'Payment Acquirer': event.target.value })}
                />
              </label>
            </div>
          </>
        );
      case 'Catalog':
        return (
          <>
            <div className={Styles.inputs}>
              <label>
                SkuId*
                <input
                  type="text"
                  value={dynamicFields['SkuId'] || ''}
                  onChange={(event) => setDynamicFields({ ...dynamicFields, 'SkuId': event.target.value })}
                />
              </label>
            </div>
            <div className={Styles.inputs}>
                <label>
                  Print of the Page*
                  <input
                    type="file"
                    onChange={(event) => {
                      if (event.target.files.length > 0) {
                        const file = event.target.files[0];
                        setDynamicFields({ ...dynamicFields, 'Print of the Page': file });
                      }
                    }}
                  />
                </label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.imagemContainer}>
        <img src={FormImage} alt="img" className={Styles.imagem} />
      </div>
      <form onSubmit={handleSubmit} className={Styles.formulario}>
        <div className={Styles.formTitle}>Open Service Ticket</div>
        <div className={Styles.inputs}>
          <label>
            Account Name*
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
            <select value={subject} onChange={handleModuleChange} className={Styles.select}>
              {modules.map(module => (
                <option key={module.value} value={module.value}>{module.label}</option>
              ))}
            </select>
          </label>
        </div>
        {renderDynamicFields()}
        <div className={`${Styles.inputs} ${Styles.description}`}>
          <label>
            Detailing*
            <textarea
              value={detailing}
              placeholder='Detailing'
              onChange={(event) => setDetailing(event.target.value)}
            />
          </label>
        </div>
        <button type="submit" disabled={!allFieldsFilled}>Create Ticket</button>
      </form>
    </div>
  );
}

export default Forms;
