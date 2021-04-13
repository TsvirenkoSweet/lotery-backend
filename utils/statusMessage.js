module.exports = {
    badRequest: (res, message) => res.status(400).json({message}),
    notFound: (res, message) => res.status(404).json({message}),
}
