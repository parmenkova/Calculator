describe('last', function () {
  it('returns last element', function () {
    var array = [0, 1, 2];
    var result = last(array);
    expect(result).to.be(2);
  });
});
