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

const validatePassword = (req, res, next) => {
  const verifyPassword = 'password' in req.body;
  if (verifyPassword) return next();
  res.status(400).json({ message: 'O campo "password" é obrigatório' });
};

const verifyPassword = (req, res, next) => {
  const validPassword = req.body.password;
  if (validPassword.length >= 6) return next();
  res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
};

module.exports = {
  validateEmail,
  verifyEmail,
  validatePassword,
  verifyPassword,
};