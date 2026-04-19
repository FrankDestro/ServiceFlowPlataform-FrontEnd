/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
// Recebe inputs e atualizar o campo value de acordo com o nome do input informado (name)
export function update(inputs: any, name: string, newValue: any) {
    return { ...inputs, [name]: { ...inputs[name], value: newValue } };
}

// pega os nomes e valores dos inputs e retorna em um novo objeto na estrutura aceitavel para mandar para o backend
export function toValues(inputs: any) {
    const data: any = {};
    for (var name in inputs) {
        data[name] = inputs[name].value;
    }
    return data;
}

// Atualiza todos os campos de uma vez, ex. buscar na api e atualizar os inputs de uma vez para update
export function updateAll(inputs: any, newValues: any) {

    const newInputs: any = {};
    for (var name in inputs) {
        newInputs[name] = { ...inputs[name], value: newValues[name] };
    }
    return newInputs;
}

//validar se o input tem um validation se tiver verificar senão retorna o input que veio.
export function validate(inputs: any, name: string) {
    if (!inputs[name].validation) {
        return inputs;
    }
    const isInValid = !inputs[name].validation(inputs[name].value);
    return { ...inputs, [name]: { ...inputs[name], invalid: isInValid.toString() } };
}

//recebe os inputs e adicionar o valor "dirty" no campo que voce informar no argumento. - suja o campo informado.  
export function toDirty(inputs: any, name: string) {
    return { ...inputs, [name]: { ...inputs[name], dirty: "true" } };
}

// Executa as funções update e validate 
export function updateAndValidate(inputs: any, name: string, newValue: any) {
    const dataUpdated = update(inputs, name, newValue);
    const dataValidated = validate(dataUpdated, name);
    return dataValidated;
}

// Executa as funções toDirty e validate 
export function dirtyAndValidate(inputs: any, name: string) {
    const dataDirty = toDirty(inputs, name);
    return validate(dataDirty, name);
}

//recebe os inputs e adicionar o valor "dirty" para todos os campos, suja todos os campos 
export function toDirtyAll(inputs: any) {
    const newInputs: any = {};
    for (var name in inputs) {
        newInputs[name] = { ...inputs[name], dirty: "true" }
    }
    return newInputs
}

// recebe os inputs e validar todos os campos, adiciona o atributo "invalid" 
// com o valor da resposta da função validation para todos os campos.  
export function validateAll(inputs: any) {
    const newInputs: any = {};

    for (var name in inputs) {

        if (inputs[name].validation) {
            const isInValid = !inputs[name].validation(inputs[name].value);
            newInputs[name] = { ...inputs[name], invalid: isInValid.toString()};
        } else {
            newInputs[name] = { ...inputs[name] };
        }
    }
    return newInputs;
}

export function dirtyAndValidateAll(inputs: any) {
    return validateAll(toDirtyAll(inputs));
}

export function hasAnyInvalid(inputs : any) {
    for (var name in inputs) {
        if(inputs[name].dirty === "true" && inputs[name].invalid === "true"){
           return true;
        }
    }
    return false;
}


export function setBackendErros (inputs : any, erros : any[]) {
    const newInputs = {...inputs};
    erros.forEach(item => {
        newInputs[item.fieldName].message = item.message;
        newInputs[item.fieldName].dirty = "true"
        newInputs[item.fieldName].invalid = "true"
    });
    return newInputs;
}