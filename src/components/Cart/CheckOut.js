import React, { useRef, useState } from "react";
import Classes from "./CheckOut.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 5;

const CheckOut = (props) => {
  const [formInputIsValid, setFomrIsValid] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const confrimHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFomrIsValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };
  return (
    <form className={Classes.form} onSubmit={confrimHandler}>
      <div
        className={`${Classes.control} ${
          formInputIsValid.name ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputIsValid.name && <p> please enter a valid name!</p>}
      </div>
      <div
        className={`${Classes.control} ${
          formInputIsValid.street ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputIsValid.street && <p> please enter a valid street!</p>}
      </div>
      <div
        className={`${Classes.control} ${
          formInputIsValid.postalCode ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="postal">P.O Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputIsValid.postalCode && (
          <p> please enter a valid postal code!</p>
        )}
      </div>
      <div
        className={`${Classes.control} ${
          formInputIsValid.city ? "" : Classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputIsValid.city && <p> please enter a valid city!</p>}
      </div>
      <div className={Classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={Classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
