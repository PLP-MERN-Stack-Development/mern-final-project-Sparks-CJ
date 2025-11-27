exports.uploadLocal = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file provided' });

    const url = `/uploads/${req.file.filename}`;
    res.json({ url, filename: req.file.originalname });
  } catch (err) { next(err); }
};
