import { phoneRawValue, phoneWithoutRegionCode, dateRawValue, cpfRawValue } from './stringManipulation';
import CPF from 'cpf-check';
import moment from 'moment';

export const MESSAGES = {
  EMPTY_EMAIL: 'O campo de email é obrigatório',
  INVALID_EMAIL: 'O email informado não é valido',
  EMAIL_IS_DIFFERENT: 'Os e-mails informados não conferem',
  EMPTY_PASSWORD: 'O campo senha é obrigatório',
  EMPTY_NAME: 'O campo é obrigatório',
  EMPTY_CELLPHONE: 'O campo celular é obrigatório',
  PHONE_JUST_NUMBERS: 'O telefone deve ter apenas números',
  INVALID_CELLPHONE: 'O telefone não tem o número de dígitos necessários',
  EMPTY_DATE: 'O campo data é obrigatório',
  DATE_JUST_NUMBERS: 'Apenas números devem ser digitados',
  DATE_INVALID: 'Data informada é inválida',
  SHORT_DATE: 'A data deve ser digitada completa DD/MM/YYYY',
  EMPTY_CPF: 'O CPF deve ser informado',
  SHORT_CPF: 'O CPF deve conter 11 dígitos',
  CPF_JUST_NUMBERS: 'Apenas números devem ser digitados',
  CPF_INVALID: 'CPF inválido',
  PASSWORD_IS_DIFFERENT: 'As senhas informadas não conferem',
};

export const validateEmail = (email) => {
  if (isFieldEmpty(email)) {
    return { isValid: false, message: MESSAGES.EMPTY_EMAIL };
  }

  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = regExp.test(email.toLowerCase());

  if (!isValid) {
    return { isValid, message: MESSAGES.INVALID_EMAIL };
  }

  return { isValid, message: undefined };
};

export const isFieldEmpty = (value) => {
  return value === '' || value === undefined;
};

export const validateConfirmEmail = (value) => {
  const validatorObj = { isValid: true, message: undefined };
  validatorObj.isValid = false;
  validatorObj.message = MESSAGES.EMAIL_IS_DIFFERENT;

  return validatorObj;
}

export const validateConfirmPassword = () => {
  let validatorObj = { isValid: true, message: undefined };
  validatorObj.isValid = false;
  validatorObj.message = MESSAGES.PASSWORD_IS_DIFFERENT;

  return validatorObj;
}

export const validateCPF = (value) => {
  const validatorObj = { isValid: true, message: undefined };
  const rawValue = cpfRawValue(value);
  const isEmpity = isFieldEmpty(rawValue);
  const onlyNumbers = hasOnlyNumbers(rawValue);
  const CPFValid = CPF.validate(value);

  if (isEmpity) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.EMPTY_CPF;
  }
  else if (!CPFValid) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.CPF_INVALID;
  }
  else if (!onlyNumbers) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.CPF_JUST_NUMBERS;
  }
  else if (rawValue.length < 11) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.SHORT_CPF;
  }

  return validatorObj;
};

export const validatePassword = (password) => {
  const isValid = !isFieldEmpty(password);

  if (!isValid) {
    return { isValid, message: MESSAGES.EMPTY_PASSWORD };
  }

  return { isValid, message: undefined };
};

export const validateName = (name) => {
  const isValid = !isFieldEmpty(name);

  if (!isValid) {
    return { isValid, message: MESSAGES.EMPTY_NAME };
  }

  return { isValid, message: undefined };
};

export const hasOnlyNumbers = (value) => {
  const regex = new RegExp(/\D/, 'g');
  const hasLetters = regex.test(value);

  return !hasLetters;
}

export const validateCellphone = (value) => {
  const validatorObj = { isValid: true, message: undefined };
  const rawValue = phoneRawValue(value);
  const numberWithoutRegion = phoneWithoutRegionCode(value);
  const isEmpity = isFieldEmpty(rawValue);
  const onlyNumbers = hasOnlyNumbers(rawValue);

  if (isEmpity) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.EMPTY_CELLPHONE;
  } else if (!onlyNumbers) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.PHONE_JUST_NUMBERS;
  } else if (numberWithoutRegion.length < 9) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.INVALID_CELLPHONE;
  }

  return validatorObj;
};

export const validateDate = (value) => {
  const validatorObj = { isValid: true, message: undefined };
  const rawValue = dateRawValue(value);
  const isEmpity = isFieldEmpty(rawValue);
  const onlyNumbers = hasOnlyNumbers(rawValue);

  const dataString = value.split("/");
  var dateFormat = `${dataString[2]}-${dataString[1]}-${dataString[0]}`;
  const dateIsValid = moment(dateFormat).isValid();

  if (isEmpity) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.EMPTY_DATE;
  } else if (!dateIsValid) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.DATE_INVALID;
  } else if (!onlyNumbers) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.DATE_JUST_NUMBERS;

  } else if (rawValue.length < 8) {
    validatorObj.isValid = false;
    validatorObj.message = MESSAGES.SHORT_DATE;
  }

  return validatorObj;
};

export const formValidator = (refs) => {
  try {

    if (Array.isArray(refs) && refs.length > 0) {
      // validates if form is fully filled
      const notFilledFieldIndex = refs.findIndex(ref => !ref.value);
      if (notFilledFieldIndex !== -1) {
        return 'O formulário deve ser completamente preenchido';
      }

      // validates if all fields are valid
      const notValidFieldIndex = refs.findIndex(ref => !ref.isValid && ref.isValid !== undefined);
      if (notValidFieldIndex !== -1) {
        return `O campo ${refs[notValidFieldIndex].name} deve ser preenchido corretamente`;
      }

      return undefined;
    }

    return 'Algo inesperado conteceu!';
  } catch (e) {
    return 'Algo inesperado conteceu!' + e.message;
  }
}