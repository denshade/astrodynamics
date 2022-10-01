const [calculateAllWithFields, formula_has_solution] = require('./calculate');

test('calculateAllWithFields', () => {
    var cObject = {value:""};
    calculateAllWithFields([ {id:"c", placeholder: "distance to the focus", label: "c", formulas:[" e * a "]}],{c:cObject}, {e:1, a:2});
    expect(cObject.value).toBe(1*2);
})
