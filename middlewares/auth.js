const { verifyAccessToken } = require("../utils/auth");

const authenticateForRole = (req, res, next, allowedRoles = []) => {
    const authorization = req.get('Authorization');
    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const tokenParts = authorization.split(' ');
    if (tokenParts[1]) {
        const payload = verifyAccessToken(tokenParts[1]);
        if (payload.role && allowedRoles.includes(payload.role)) {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden. You do not have access.' });
        }
    }

};

module.exports = { authenticateForRole };
