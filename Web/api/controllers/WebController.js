module.exports = {

    homepage: function(req, res) {
        Dish.find()
        .where({ specialty: true })
        .sort({ id: 'desc' })
        .limit(3)
        .exec(function(err, specialties) {
            Dish.find()
            .where({ chefFavorite: true })
            .sort({ id: 'desc' })
            .limit(3)
            .exec(function(err, chefFavorites) {
                return res.view({
                          chefFavorites: chefFavorites,
                          specialties: specialties
                        });
            });
        });
    },
};