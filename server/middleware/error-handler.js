const { CustomApiError } = require('../errors/custom-error')

const errorHandler = (err, req, res, next) => {
	if (err instanceof CustomApiError) {
		return res.status(err.statusCode).json({
			msg: err.message,
		})
	}
	console.log(err.message)

	return res.status(500).json({
		msg: err.message,
	})
}

module.exports = errorHandler
