const minLengthErrorMessage = (characterLength, name) => {
  return `${name} needs to more than ${characterLength} characters.`;
};

const maxLengthErrorMessage = (characterLength, name) => {
  return `${name} can't be more than ${characterLength} characters.`;
};

const requiredErrorMessage = (name) => {
  return `${name} is required.`;
};

const formatMongooseErrorMessage = (err) => {
  const errors = {};

  if (err.name === "ValidationError") {
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
  } else {
    errors.general = "Somethign went wrong.";
  }

  return errors;
};

module.exports = {
  minLengthErrorMessage,
  maxLengthErrorMessage,
  requiredErrorMessage,
  formatMongooseErrorMessage,
};
