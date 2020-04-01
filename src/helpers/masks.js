import VMasker from "vanilla-masker";

const standard = value => {
  return value;
};

const date = value => {
  const rawValue = value.replace(/[/]/g, "");
  return rawValue.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
};

const cpf = value => {
  const rawValue = value.replace(/[-.]/g, "");
  return rawValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const phone = value => {
  const rawValue = value.replace(/[()\-\s]/g, "");
  if (rawValue.length < 11)
    return VMasker.toPattern(rawValue, "(99) 9999-9999");
  return VMasker.toPattern(rawValue, "(99) 99999-9999");
};

const cep = value => {
  const rawValue = value.replace(/[()\-\s]/g, "");
  return VMasker.toPattern(rawValue, "99.999-999");
};

export const masks = {
  date,
  cpf,
  phone,
  cep,
  standard
};
