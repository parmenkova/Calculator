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

describe('ifPoint', function () {
  it('appends to the buffer new element "0."', function () {
    expect(ifPoint([])).to.eql(['0.']);
    expect(ifPoint(['1', '+'])).to.eql(['1', '+', '0.']);
  });

  it('appends the point to the last element of the buffer', function () {
    expect(ifPoint(['1'])).to.eql(['1.']);
    expect(ifPoint(['1', '+', '1'])).to.eql(['1', '+', '1.']);
  });

  it('doesn\'t append the point', function () {
    expect(ifPoint(['1.1'])).to.eql(['1.1']);
    expect(ifPoint(['1.'])).to.eql(['1.']);
    expect(ifPoint(['3', '+', '1.2'])).to.eql(['3', '+', '1.2']);
  });
});

describe('ifAc', function () {
  it('clears the buffer', function () {
    expect(ifAc(['1'])).to.eql([]);
    expect(ifAc(['1', '+'])).to.eql([]);
    expect(ifAc(['1', '+', '12'])).to.eql([]);
  });
});

describe('ifC', function () {
  it('clears last element of the buffer', function () {
    expect(ifC(['1'])).to.eql([]);
    expect(ifC(['1', '+'])).to.eql(['1']);
    expect(ifC(['1', '+', '27'])).to.eql(['1', '+']);
  });
});

describe('getResult', function () {
  it('returns result', function () {
    expect(getResult(['1', '+', '2'])).to.eql(['3']);
    expect(getResult(['1', '+'])).to.eql(['2']);
    expect(getResult(['2', '*'])).to.eql(['4']);
    expect(getResult(['2', '/'])).to.eql(['1']);
    expect(getResult(['2', '-'])).to.eql(['0']);
  })
})