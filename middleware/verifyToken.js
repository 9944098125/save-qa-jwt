const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	// taking token from request headers in authorization and splitting it to retrieve token only
	// req.headers.authorization => Bearer -------token----------
	const token =
		req.headers.authorization && req.headers.authorization.split(" ")[1];

	if (!token) {
		// if no token it gives error
		return res.status(401).json({ error: "Unauthorized: No token provided." });
	}

	// verifying the token received with our token
	jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
		if (err) {
			return res.status(403).json({ error: "Forbidden: Invalid token." });
		}

		// Attach the decoded payload to the request object for use in subsequent middleware or routes
		req.user = decoded;
		console.log(req.user);
		// allowing that token to proceed
		next();
	});
};

module.exports = verifyToken;
