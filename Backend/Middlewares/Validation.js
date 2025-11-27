export const validater = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: true });
  
  if (error) {
    // Extract and clean up the message
    const message = error.details[0].message.replace(/["\\]/g, "");
    return res.status(400).json({ success: false, error: message });
  }
  
  next();
};
