class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
  // Always exclude products with category 'private'
  let baseFilter = {
    category: { $ne: 'Private' }
  };

  if (this.queryStr.keyword) {
    const keywordFilter = {
      $or: [
        { name: { $regex: this.queryStr.keyword, $options: 'i' } },
        { barcode: { $regex: this.queryStr.keyword, $options: 'i' } },
      ],
    };

    this.query = this.query.find({ ...baseFilter, ...keywordFilter });
  } else {
    this.query = this.query.find(baseFilter);
  }

  return this;
}


  filter() {
    const queryStrCopy = { ...this.queryStr };
    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach(field => delete queryStrCopy[field]);

    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

module.exports = APIFeatures;
