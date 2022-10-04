const validateEmail = (req, res, next) => {
  const verifyEmail = 'email' in req.body;
  if (verifyEmail) return next();
  res.status(400).json({ message: 'O campo "email" é obrigatório' });
};

const verifyEmail = (req, res, next) => {
  const validEmail = req.body.email;
  const emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;
  if (emailRegex.test(validEmail)) return next();
  res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

// referência https://stackoverflow.com/questions/4964691/super-simple-email-validation-with-javascript

module.exports = {
  validateEmail,
  verifyEmail,
};