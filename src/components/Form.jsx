import React, { useContext } from 'react';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { StateFormContext } from '../App';

const Form = () => {
  const { setToggleForm, toggleForm } = useContext(StateFormContext);

  const [isClick, setIsClick] = React.useState(false);
  const [isTemplate, setIsTemplate] = React.useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    if (errors.phone) {
      return;
    }
    const templateJSON = {
      phone: data.phone,
      name: data.name,
      message: data.message,
    };
    setIsTemplate([templateJSON]);
  };

  const validatePhone = (value) => {
    if (!value || value.replace(/\D/g, '').length !== 11) {
      setError('phone', {
        type: 'length',
        message: 'Номер должен содержать 11 цифр',
      });
      console.log(value.replace(/\D/g, '').length)
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="wrapper__form">
      <form className="form__authorization" onSubmit={handleSubmit(onSubmit)} action="#">
        <InputMask
          className='form__input'
          id="phone"
          mask="+7 (999) 999-99-99"
          alwaysShowMask={true}
          {...register('phone', {
            required: 'Поле обязательно для заполнения',
            validate: validatePhone,
          })}
        />
        {errors.phone && <p className='form__input-error'>{errors.phone.message}</p>}

        <input
          className='form__input'
          id="name"
          type="text"
          placeholder="name"
          {...register('name', {
            required: 'Поле обязательно для заполнения',
            minLength: {
              value: 2,
              message: 'Имя должно содержать не менее 2 символов',
            },
            maxLength: {
              value: 20,
              message: 'Имя должно содержать не более 20 символов',
            },
            pattern: {
              value: /^[A-Za-zА-Яа-я\s]+$/,
              message: 'Имя может содержать только буквы и пробелы',
            },
          })}
        />
        {errors.name && <p className='form__input-error'>{errors.name.message}</p>}

        <input
          className='form__input'
          id="message"
          type="text"
          placeholder="message"
          {...register('message', {
            required: 'Поле обязательно для заполнения',
            pattern: {
              value: /^[A-Za-zА-Яа-я\s]+$/,
              message: 'Сообщение может содержать только буквы и пробелы',
            },
          })}
        />
        {errors.message && <p className='form__input-error'>{errors.message.message}</p>}

        <button 
          className='form__button-send'
          onClick={() => setIsClick(true)}
          type="submit" 
          disabled={!isValid}
        >Send Form</button>
        {isClick && <p className='form__result'>{JSON.stringify(isTemplate)}</p>}

        <div className='wrapper__close-button'>
          <button 
            onClick={() => setToggleForm(!toggleForm)} 
            className='form__close-button'
          >Close Form</button>
        </div>
      </form>
    </div>
  );
};

export default Form;