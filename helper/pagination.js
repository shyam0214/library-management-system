const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const skip = page ? (page - 1) * limit : 0;
    
    return { limit, skip };
};

module.exports = { getPagination };
