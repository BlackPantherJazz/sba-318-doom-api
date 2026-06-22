// Custom middleware #1: logs every request method and URL to the console
const logger = (req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
};

export default logger;