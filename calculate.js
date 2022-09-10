const hasAllElements= ()  => {
    return [];
}
    
function calculateAllWithFields(field_definitions,$,v)
{

    if (v.c !== "" && v.a !== "") {
        $.e.value = v.c / v.a;
    }

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
    const G = 6.67430e-11;


    // e = c / a
    if (c !== "" && a !== "") {
        e = c / a;
        document.getElementById("e").value = e;
    }
    if (e !== "" && a !== "") {
        c = e * a;
        document.getElementById("c").value = c;
    }
    if (c !== "" && e !== "") {
        a = c / e;
        document.getElementById("c").value = c;
    }
    if (M !== "") {
        µ = G * M;
        document.getElementById("µ").value = µ;
    }
    if (a !== "" && e !== "") {
        p = a * (1- e*2);
        document.getElementById("p").value = p;
    }

    if (v0 !== "" && v1 !== "" &&v2 !== "" && pos0 !== "" && pos1 !== "" && pos2 !== "") {
        h0 = pos1 * v2 - pos2 * v1;
        h1 = pos2 * v0 - pos0 * v2;
        h2 = pos0*v1-pos1*v0;
        document.getElementById("h0").value = h0;
        document.getElementById("h1").value = h1;
        document.getElementById("h2").value = h2;
    }
    if (v0 !== "" && v1 !== "" &&v2 !== "") {
        v_old = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
        document.getElementById("v").value = v_old;
    }
    if (pos0 !== "" && pos1 !== "" && pos2 !== "") {
        r = Math.sqrt(pos0 * pos0 + pos1 * pos1 + pos2 * pos2);
        document.getElementById("r").value = r;
    }
    if (v_old !== "" && µ !== "" && r !== "") {
        E = v_old*v_old/2 - µ / r;
        document.getElementById("E").value = E;
    }
    if (v_old !== "" && r !== "" && angle_r_v !== "") {
        h = r * v_old * Math.sin(angle_r_v);
        document.getElementById("h").value = h;
    }
    if (h0 !== "" && h1 !== "" && h2 !== "") {
        h = Math.sqrt(h0 * h0 + h1*h1 + h2*h2);
        document.getElementById("h").value = h;
    }
    if (h !== "" && E !== "" && µ !== "") {
        e = Math.sqrt(1 + 2*E*h*h/(µ*µ))
        document.getElementById("e").value = e;
    }
    if (apogee !== "" && perigee !== "") {
        a = (parseInt(apogee) + parseInt(perigee)) / 2;
        document.getElementById("a").value = a;
    }
    if (apogee !== "" && µ !== "") {
        period = 2*Math.PI * (parseInt(apogee)) / Math.sqrt(µ);
        document.getElementById("period").value = period;
    }
    if (e !== "" && a !== "") {
        perigee = a * (1-e);
        document.getElementById("perigee").value = perigee;
    }
    if (e !== "" && a !== "") {
        apogee = a * (1+e);
        document.getElementById("apogee").value = apogee;
    }
    if (µ !== "" && a !== "") {
        E = -µ / (2*a);
        document.getElementById("E").value = E;
    }
}


function addVectorElement(colElement, field_definition) {
    var column = document.getElementById(colElement);
    var divEl = createDiv();
    divEl.appendChild(create_label_from_definition(field_definition));
    for (var i = 0; i < 3; i++) {
        divEl.appendChild(createCell(field_definition, i));
    }
    column.appendChild(divEl);
}


function addElement(colElement, field_definition) {
    var column = document.getElementById(colElement);
    var divEl = createDiv();
    var inputEl = createCell(field_definition, "");
    divEl.appendChild(create_label_from_definition(field_definition));
    divEl.appendChild(inputEl);
    column.appendChild(divEl);
}

//Technical
function create_label_from_definition(field_definition) {
    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", field_definition.id);
    labelEl.classList.add("form-label");
    labelEl.innerText = field_definition.label;
    return labelEl;
}

function createCell(field_definition, i) {
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", field_definition.id + "" + i);
    inputEl.setAttribute("placeholder", field_definition.placeholder);
    inputEl.addEventListener('change', calculateAll);
    inputEl.classList.add("form-control");
    return inputEl;
}

function createDiv() {
    var divEl = document.createElement("div");
    divEl.classList.add("mb-3");
    return divEl;
}


module.exports = calculateAllWithFields;