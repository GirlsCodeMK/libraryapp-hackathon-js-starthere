// Wrapper function to enable Express to support async/await router functions.
export default fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
