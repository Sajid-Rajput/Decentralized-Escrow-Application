module.exports = class ApiFeatures {
  constructor(_query, _queryString) {
    this.query = _query;
    this.queryString = _queryString;
  }

  filter() {
    const { depositor, beneficiary, arbiter } = this.queryString;
    const filter = {};

    if (depositor) {
      filter.depositor = depositor;
    } else if (beneficiary) {
      filter.beneficiary = beneficiary;
    } else if (arbiter) {
      filter.arbiter = arbiter;
    }

    this.query = this.query.find(filter);
    return this;
  }
};
