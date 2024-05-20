/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import "./css/App.css";
import FormInputValue from "./FormInputValue";

const errorMessageStyle = {
  color: "red",
  fontSize: "15px",
};
const errorInput = {
  border: "1px solid red",
};
const successMessageStyle = {
  border: "1px solid green",
};

const App = () => {
  let fName,
    lName,
    Email,
    password = useRef();
  let fNameErr,
    lNameErr,
    emailErr,
    passwordErr = useRef();

  let [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");
  let [popUp, setPopUp] = useState("hidePopUp");
  // show error
  const showErr = (name, error, message, event) => {
    event.preventDefault();
    error.innerHTML = `${message}`;
    Object.assign(error.style, errorMessageStyle);
    Object.assign(name.style, errorInput);
  };
  // show success
  const showSuccess = (name, error, event) => {
    error.innerHTML = ``;
    error.style = null;
    Object.assign(name.style, successMessageStyle);
    setFormData((prevObject) => {
      return {
        ...prevObject,
        [name.name]: name.value,
      };
    });
  };

  // check name is not empty
  const checkName = (name, error, message, event) => {
    if (name.value === "") {
      return showErr(name, error, message, event);
    }
    //check regular expression
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(name.value.trim())) {
      return showErr(name, error, "Only letter allow", event);
    } else {
      showSuccess(name, error, event);
    }
  };
  // check email is not empty
  const checkEmail = (email, error, message, event) => {
    if (email.value === "") {
      return showErr(email, error, message, event);
    }
    //check regular expression
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email.value.trim())) {
      return showErr(email, error, "Invalid Email", event);
    } else {
      showSuccess(email, error, event);
    }
  };
  // check password is not empty
  const checkPassword = (password, error, message, event) => {
    if (password.value === "") {
      return showErr(password, error, message, event);
    }
    //check regular expression for only numbers and letters
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(password.value)) {
      return showErr(password, error, "Invalid Password", event);
    } else {
      showSuccess(password, error, event);
    }
  };

  const clearInputField = () => {
    fName.value = "";
    lName.value = "";
    Email.value = "";
    password.value = "";
  };
  const formSubmit = (event) => {
    event.preventDefault();
    checkName(fName, fNameErr, "Frist Name is required", event);
    checkName(lName, lNameErr, "Last Name is required", event);
    checkEmail(Email, emailErr, "Email is required", event);
    checkPassword(password, passwordErr, "Password is required", event);
    if (
      fName.value &&
      /^[a-zA-Z]+$/.test(fName.value.trim()) &&
      lName.value &&
      /^[a-zA-Z]+$/.test(lName.value.trim()) &&
      Email.value &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        Email.value.trim()
      ) &&
      password.value &&
      /^[a-zA-Z0-9]+$/.test(password.value)
    ) {
      setConfirmationMessage("Your form has been successfully submitted!");
      setPopUp("showPopUp");
    } else {
      setConfirmationMessage(""); // Clear success message if validation fails
    }
  };

  const closePopUp = (e) => {
    setPopUp("hidePopUp");
    clearInputField();
  };
  return (
    <>
      <form action="#" method="post" onSubmit={formSubmit}>
        <div>
          <label htmlFor="fname">Frist Name:</label> <br />
          <input
            ref={(fname) => (fName = fname)}
            type="text"
            name="fname"
            id="fname"
          />{" "}
          <br />
          <span ref={(fname) => (fNameErr = fname)}></span>
        </div>
        <br />
        <div>
          <label htmlFor="lname">Last Name:</label> <br />
          <input
            ref={(lname) => (lName = lname)}
            type="text"
            name="lname"
            id="lname"
          />{" "}
          <br />
          <span ref={(lname) => (lNameErr = lname)}></span>
        </div>
        <br />
        <div>
          <label htmlFor="email">Email:</label> <br />
          <input
            ref={(email) => (Email = email)}
            type="email"
            name="email"
            id="email"
          />{" "}
          <br />
          <span ref={(email) => (emailErr = email)}></span>
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label> <br />
          <input
            ref={(pass) => (password = pass)}
            type="password"
            name="password"
            id="password"
          />{" "}
          <br />
          <span ref={(password) => (passwordErr = password)}></span>
        </div>
        <br />
        <button>Submit</button>
      </form>
      {confirmationMessage && (
        <>
          <div className="popUpBox" id={popUp}>
            <p className="icon">&#10004;</p>
            <h2>Thank You!</h2>
            {confirmationMessage} <br />
            <button onClick={closePopUp} type="button">
              OK
            </button>
          </div>
          <FormInputValue data={formData} />
        </>
      )}
    </>
  );
};

export default App;
