// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

global.testApiFetchActions = function(actions, namespace){
  it("should return correct action for fetch start", ()=>{

    expect(actions.fetch()).toEqual({type: namespace + "/FETCH_" + namespace.toUpperCase()});
  })
  it("should return correct action for fetch success", ()=>{
    const payload = {name:"test"};
    const expected = {type: namespace + "/FETCH_" + namespace.toUpperCase() + "_SUCCESS", payload}; 
    expect(actions.fetchSuccess(payload)).toEqual(expected);
  })
  it("should return correct action for fetch fail", ()=>{
    const errorMessage = "api error" ;
    const expected = {type: namespace + "/FETCH_" + namespace.toUpperCase() + "_FAIL", error : true, payload : new Error(errorMessage)}; 
    expect(actions.fetchFail(errorMessage)).toEqual(expected);
  })
}

global.testApiCrudActions = function(actions, namespace, resourceName, actionName){
  it(`should return correct action for ${actionName} start`, ()=>{

    expect(actions[actionName]()).toEqual({type: `${namespace}/${actionName.toUpperCase()}_${resourceName}`});
  })
  it(`should return correct action for ${actionName} success`, ()=>{
    const payload = {name:"test"};
    const expected = {type: `${namespace}/${actionName.toUpperCase()}_${resourceName}_SUCCESS`, payload}; 
    expect(actions[actionName+"Success"](payload)).toEqual(expected);
  })
  it(`should return correct action for ${actionName} fail`, ()=>{
    const errorMessage = "api error" ;
    const expected = {type: `${namespace}/${actionName.toUpperCase()}_${resourceName}_FAIL`, error : true, payload : new Error(errorMessage)}; 
    expect(actions[actionName+"Fail"](errorMessage)).toEqual(expected);
  })
}
