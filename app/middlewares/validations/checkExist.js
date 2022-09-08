const checkExists = (Model, key) => {
    return async(req, res, next) => {
        const { id } = req.params;
        const item = await Model.findOne({
            where: {
                id,
            },
        });
        if (item) {
            req.item = item;
            next();
        } else {
            res.status(404).send(`Not found ${key} have id = ${id}!`);
        }
    };
};

module.exports = {
    checkExists,
};