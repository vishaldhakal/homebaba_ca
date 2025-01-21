import axios from "axios";
import swal from "sweetalert";

function ContactFormSubmit(msgdata, setSubmitbtn, setCredentials) {
  let baseUrl = "https://api.homebaba.ca";
  let fubUrl = "https://api.followupboss.com/v1/events";
  setSubmitbtn("Submitting...");

  let form_data = new FormData();
  form_data.append("name", msgdata.name);
  form_data.append("email", msgdata.email);
  form_data.append("phone", msgdata.phone);
  form_data.append("message", msgdata.message);
  form_data.append("realtor", msgdata.realtor);

  let neww = msgdata.project_namee.replaceAll("-", " ");
  const words = neww.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  let newwww = words.join(" ");
  form_data.append("proj_name", newwww);
  form_data.append("cityy", msgdata.cityy);

  // Follow Up Boss payload
  const fubPayload = {
    person: {
      contacted: false,
      firstName: msgdata.name.split(" ")[0],
      lastName: msgdata.name.split(" ").slice(1).join(" "),
      emails: [{ value: msgdata.email }],
      phones: [{ value: msgdata.phone }],
      tags: [msgdata.cityy, newwww, msgdata.realtor == "Yes" ? "Agent" : ""],
    },
    source: "homebaba.ca",
    system: "Custom Website",
    type: "Inquiry",
    message: msgdata.message,
  };

  // Function to send data to Follow Up Boss
  const sendToFollowUpBoss = () => {
    return axios.post(fubUrl, fubPayload, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Basic ZmthXzAwTlVCbDF2bGZzRXhyZlZXMmNCYVlqMXJXZzJ6NUNoN2c6",
      },
    });
  };

  let url = `${baseUrl}/api/contact-form-submit/`;
  axios
    .post(url, form_data, {
      headers: {
        "content-type": "multipart/form-data",
      },
      mode: "no-cors",
    })
    .then(() => {
      // If Homebaba submission is successful, send to Follow Up Boss
      return sendToFollowUpBoss();
    })
    .then(() => {
      setSubmitbtn("Successfully Submitted");
      setTimeout(() => {
        setSubmitbtn("Contact Now");
      }, 2000);
      swal(
        `Thank You, ${msgdata.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );
      setCredentials({
        ...msgdata,
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    })
    .catch((errr) => {
      console.log(errr);
      setSubmitbtn("Contact Now");
      swal("Message Failed", "Cannot send your message", "error");
    });
}

export default ContactFormSubmit;
