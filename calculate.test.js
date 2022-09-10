const [calculateAllWithFields, formula_has_solution] = require('./calculate');

test('calculateAllWithFields', () => {
    var cObject = {};
    calculateAllWithFields([ {id:"c", placeholder: "distance to the focus", label: "c", formulas:[" e * a "]}],{c:cObject}, {e:1, a:2},
    );
    expect(cObject.value).toBe(1*2);
})

test('formula_has_solution', () => {
    expect(formula_has_solution(" e * a ", {e:1, a:2})).toBe("1*2");
})