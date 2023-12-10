//Validate password
//Minimo 8 caracteres
//Al menos una letra en minuscula
//Al menos una letra en mayuscula
//Contega al menos un número
//Contega al menos un caracter especial
const passwordFormatTest = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-__+.])[A-Za-z\d!@#$%^&*()\-__+.]{8,}$/.test(password)
    ? true
    : false;

export default passwordFormatTest;
