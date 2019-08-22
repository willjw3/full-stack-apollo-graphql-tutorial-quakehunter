const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        quakes: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allQuakes = await dataSources.quakeAPI.getAllQuakes();
            // we want these in reverse chronological order
            allQuakes.reverse();
            const quakes = paginateResults({
              after,
              pageSize,
              results: allQuakes
            });
            return {
              quakes,
              cursor: quakes.length ? quakes[quakes.length - 1].cursor : null,
              // if the cursor of the end of the paginated results is the same as the
              // last item in _all_ results, then there are no more results after this
              hasMore: quakes.length
                ? quakes[quakes.length - 1].cursor !==
                  allQuakes[allQuakes.length - 1].cursor
                : false
            };
          },
        quake: (_, { id }, { dataSources }) =>
            dataSources.quakeAPI.getQuakeById({ quakeId: id }),
        users: (_, __, { dataSources }) => 
            dataSources.userAPI.getUsers()
    }
};