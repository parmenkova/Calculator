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

  it('concatenate value with last element of the buffer', function () {
    expect(ifNumber(['25'], '5')).to.eql(['255']);
    expect(ifNumber(['1', '+', '1'], '5')).to.eql(['1', '+', '15']);
  });

  it('replase zero element with value', function () {
    expect(ifNumber(['0'], '5')).to.eql(['5']);
    expect(ifNumber(['1', '+', '0'], '5')).to.eql(['1', '+', '5']);
  });
})
