// Custom middleware #2: validates that POST/PATCH requests have a body
const validator = (req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PATCH') &&
      (!req.body || Object.keys(req.body).length === 0)) {
    return res.status(400).json({ error: 'Request body cannot be empty' });
  }
  next();
};

export default validator;