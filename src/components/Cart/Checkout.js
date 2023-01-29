import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const IsEmpty=value=>value.trim()===""
const isNotFiveChars=value=>value.trim().length === 5


const Checkout = (props) => {
    const [formInputValidity,setformInputValidity]=useState({
            name:true,
            Street:true,
            city:true,
            postalcode:true
    })
    const NameInputref=useRef()
    const StreetInputref=useRef()
    const PostalCodeInputref=useRef()
    const CityInputref=useRef()

  const confirmHandler = (event) => {
    event.preventDefault();
    const EnteredName=NameInputref.current.value
    const EnteredStreet=StreetInputref.current.value
    const EnteredPostalCode=PostalCodeInputref.current.value
    const EnteredCity=CityInputref.current.value
    const EnteredNameValid=!IsEmpty(EnteredName)
    const EnteredStreetValid=!IsEmpty(EnteredStreet)
    const EnteredpostalValid=isNotFiveChars(EnteredPostalCode)
    const EnteredCityValid=!IsEmpty(EnteredCity)
   

    setformInputValidity({
        name:EnteredNameValid,
        Street:EnteredStreetValid,
        city:EnteredCityValid,
        postalcode:EnteredpostalValid
    })

    const formValid=EnteredNameValid && EnteredStreetValid && EnteredpostalValid && EnteredCityValid
    if(!formValid){
     return
    }
      props.Submitting()
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={NameInputref}/>
        {!formInputValidity.name && <p className={classes.err}>please enter your Name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={StreetInputref}/>
        {!formInputValidity.Street && <p className={classes.err}>please enter your Street</p>}

      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={PostalCodeInputref}/>
        {!formInputValidity.postalcode && <p className={classes.err}>please enter your Postal Code(5 charscter log)</p>}

      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={CityInputref} />
        {!formInputValidity.city && <p className={classes.err}>please enter your city</p>}

      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;