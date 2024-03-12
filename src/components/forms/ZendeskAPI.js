import axios from 'axios';

const zendeskSubdomain = 'dynamicportfolio';

const ZendeskData = async (name, email, subject, description) => {

  const options = {
    method: "post",
    url: `https://${zendeskSubdomain}.zendesk.com/api/v2/requests.json`,
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      request: {
        subject,
        comment: {
          body: description
        },
        requester: {
          name,
          email
        }
      }
    }
  };

  try {
    await axios(options);
    alert("Formulário enviado com sucesso");
  } catch (error) {
    alert("Erro ao enviar o formulário");
  }
};

export {ZendeskData};
