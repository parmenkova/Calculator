describe('last', function () {
  it('returns last element', function () {
    var array = [0, 1, 2];
    var result = last(array);
    expect(result).to.be(2);
  });
});

describe('ifNumber', function () {
  it('makes value a new element of the buffer', function () {
    expect(ifNumber([], '5')).to.eql(['5']);
    expect(ifNumber(['1', '+'], '5')).to.eql(['1', '+', '5']);
  });

  it('concatenates value with last element of the buffer', function () {
    expect(ifNumber(['25'], '5')).to.eql(['255']);
    expect(ifNumber(['1', '+', '1'], '5')).to.eql(['1', '+', '15']);
  });

  it('replaces zero element with value', function () {
    expect(ifNumber(['0'], '5')).to.eql(['5']);
    expect(ifNumber(['1', '+', '0'], '5')).to.eql(['1', '+', '5']);
  });
})

describe('ifSighn', function () {
  it('appends zero and value as the first and the second elements of the buffer', function () {
    expect(ifSighn([], '+')).to.eql(['0', '+']);
  });

  it('replaces last element of the buffer whith value', function () {
    expect(ifSighn(['1', '+'], '*')).to.eql(['1', '*']);
  });

  it('appends the result of operation and value as the first and the second elements of the buffer', function () {
    expect(ifSighn(['1', '+', '2'], '*')).to.eql(['3', '*']);
  });

  it('appends value as a new element of the buffer', function () {
    expect(ifSighn(['123'], '+')).to.eql(['123', '+']);
  });

  it('appends value as a new element of the buffer and deletes the point from the end of the first element of the buffer', function () {
    expect(ifSighn(['123.'], '+')).to.eql(['123', '+']);
  });
});

describe('checkLastElem', function () {
  it('deletes the point from the end of the last element of the buffer', function () {
    expect(checkLastElem(['123.'])).to.eql(['123']);
  });
});
