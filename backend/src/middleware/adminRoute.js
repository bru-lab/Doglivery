export const adminOnly = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied - Admins only",
            });
        }

        next();
    } catch (error) {
        console.log(
            "Error in adminOnly middleware:",
            error.message
        );

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};