const calculateAllWithFields = require('./calculate');

test('t', () => {
    var eObject = {};
    calculateAllWithFields([ {id:"c", placeholder: "distance to the focus", label: "c"}],{e:eObject}, {c:1, a:2},
    );
    expect(eObject.value).toBe(0.5);
})