export const sendRouteError = (error, res, fallbackMessage) => {
  console.error(error);

  if (error?.name === 'ValidationError') {
    return res.status(400).json({ message: 'Please provide valid data.' });
  }

  if (error?.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource ID.' });
  }

  return res.status(500).json({ message: fallbackMessage });
};
