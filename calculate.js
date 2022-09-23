const hasAllElements= ()  => {
    return [];
}
    
function calculateAllWithFields(field_definitions,elements,values)
{
    do {
        let changed = false;
        field_definitions.forEach(field_definition => {
            if (Array.isArray(field_definition.formulas)) {
                field_definition.formulas.forEach(formula => {
                    const filled_formula = replace_variables_in_formula(formula, values);
                    if (!has_unfilled_variables(filled_formula)){
                        debugger;
                        if (elements[field_definition.id].value == "") changed = true;
                        elements[field_definition.id].value = eval(filled_formula);
                    }    
                })    
            }
        })    
    } while (changed);

}

const replace_variables_in_formula = (formula, values) => {
    let processedFormula = formula;
    for (const key in values) {
        if (values[key] == "") continue;
        processedFormula = processedFormula.replaceAll(" "+key+" ", values[key]);
    }
    return processedFormula;
}

function has_unfilled_variables(filled_formula) {
    return filled_formula.includes(" ");
}

function calculateAll(field_definitions) {
    let a = document.getElementById("a").value;
    let c = document.getElementById("c").value;
    let e = document.getElementById("e").value;
    let h = document.getElementById("h").value;

    let p = document.getElementById("p").value;
    let µ = document.getElementById("µ").value;
    let M = document.getElementById("M").value;

    let pos0 = document.getElementById("pos0").value;
    let pos1 = document.getElementById("pos1").value;
    let pos2 = document.getElementById("pos2").value;

    let v0 = document.getElementById("v0").value;
    let v1 = document.getElementById("v1").value;
    let v2 = document.getElementById("v2").value;

    let h0 = document.getElementById("h0").value;
    let h1 = document.getElementById("h1").value;
    let h2 = document.getElementById("h2").value;

    let v_old = document.getElementById("v").value;
    let r = document.getElementById("r").value;

    
    let apogee = document.getElementById("apogee").value;
    let perigee = document.getElementById("perigee").value;
    let angle_r_v = document.getElementById("angle_r_v").value;

    const allElements = document.getElementsByTagName('input');
    var $ = {}
    var v = {}
    for (const element of allElements) {
        $[element.id] = element;
        v[element.id] = element.value;
      }

    if (v0 !== "" && v1 !== "" &&v2 !== "" && pos0 !== "" && pos1 !== "" && pos2 !== "") {
        h0 = pos1 * v2 - pos2 * v1;
        h1 = pos2 * v0 - pos0 * v2;
        h2 = pos0*v1-pos1*v0;
        document.getElementById("h0").value = h0;
        document.getElementById("h1").value = h1;
        document.getElementById("h2").value = h2;
    }

}


function addVectorElement(colElement, field_definition,field_definitions) {
    var column = document.getElementById(colElement);
    var divEl = createDiv();
    divEl.appendChild(create_label_from_definition(field_definition));
    for (var i = 0; i < 3; i++) {
        divEl.appendChild(createCell(field_definition, i,field_definitions));
    }
    column.appendChild(divEl);
}


function addElement(colElement, field_definition, field_definitions) {
    var column = document.getElementById(colElement);
    column.appendChild(divisionWith(create_label_from_definition(field_definition), createCell(field_definition, "", field_definitions)));
}

//Cryptical

const divisionWith = (...elements) => {
    var division = createDiv();
    elements.forEach(e => division.appendChild(e));
    return division;
}
function create_label_from_definition(field_definition) {
    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", field_definition.id);
    labelEl.classList.add("form-label");
    labelEl.innerText = field_definition.label;
    return labelEl;
}

function createCell(field_definition, i, field_definitions) {
    var inputEl = document.createElement("input");
    //  data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom"
    inputEl.setAttribute("data-toggle", "tooltip");
    inputEl.setAttribute("data-placement", "bottom");
    inputEl.setAttribute("title", field_definition.formulas);
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", field_definition.id + "" + i);
    inputEl.setAttribute("placeholder", field_definition.placeholder);
    inputEl.addEventListener('change', curry(field_definitions));
    inputEl.classList.add("form-control");
    return inputEl;
}

function curry(field_definitions) { // curry(f) does the currying transform
    return function(b) {

        const allElements = document.getElementsByTagName('input');
        var $ = {}
        var v = {}
        for (const element of allElements) {
            $[element.id] = element;
            v[element.id] = element.value;
          }
        return calculateAllWithFields(field_definitions, $,v);
      };    
  }

function createDiv() {
    var divEl = document.createElement("div");
    divEl.classList.add("mb-3");
    return divEl;
}


module.exports = [calculateAllWithFields, replace_variables_in_formula];