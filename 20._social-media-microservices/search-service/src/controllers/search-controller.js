const Search = require("../models/searchPostSchema");



const searchPostController = async (req, res) => {
    logger.info('Search endpoint hit...')
    try {
        const {query} = req.query

        const results = await Search.find(
            {
            $text : {$search : query}
        },
        {
            score : {$meta : 'textScore'}
        }
    )
    .sort({score  : {$meta : 'textScore'}})
    .limit(10);

    return res.json({
        success: true,
        message: "Successfully Searched data",
        results

    })
    } catch (error) {
        logger.warn('Error Occured while search post', error);

        return res.status(500).json({
            success: false,
            message: 'Error Occured while search post'
        })
    }
}

module.exports = { searchPostController }