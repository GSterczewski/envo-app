
class BaseApiActions{
  
  static successSuffix = "_SUCCESS";
  static failSuffix = "_FAIL";
  
  static fetchPrefix = "FETCH_";
  static createPrefix = "CREATE_";
  static updatePrefix = "UPDATE_";
  static deletePrefix = "DELETE_";

  constructor(namespace){
    this.namespace = namespace;
    this.pluralNamespace = this.pluralizeNamespace(namespace)
  }

  pluralizeNamespace(namespace){
    return namespace.charAt(namespace.length -1) === 'y' ? namespace.substr(0,namespace.length-1) + 'ies' : namespace + 's';
  }
  createActionType(prefix="", suffix = "", pluralize = false){
    let actionName = pluralize ? this.pluralNamespace.toUpperCase() : this.namespace.toUpperCase();
    
    return this.pluralNamespace + '/' + prefix + actionName + suffix;
  }

  createPendingAction(prefix, pluralize = false){
    return function(){
      return {
        type: this.createActionType(prefix, "", pluralize)
      }
    }
  }
  createSuccessAction(prefix, pluralize = false){
    return function(data){
      return {
        type: this.createActionType(prefix, BaseApiActions.successSuffix, pluralize),
        payload: {
          ...data
        }
      }
    }
  }
  createFailAction(prefix, pluralize = false){
    return function(errorMessage){
      return {
        type: this.createActionType(prefix, BaseApiActions.failSuffix, pluralize),
        payload: new Error(errorMessage),
        error: true
      }
    }
  }

  fetch = this.createPendingAction(BaseApiActions.fetchPrefix, true);
  fetchSuccess = this.createSuccessAction(BaseApiActions.fetchPrefix, true);
  fetchFail = this.createFailAction(BaseApiActions.fetchPrefix, true);
  
  create = this.createPendingAction(BaseApiActions.createPrefix);
  createSuccess = this.createSuccessAction(BaseApiActions.createPrefix);
  createFail = this.createFailAction(BaseApiActions.createPrefix);

  update = this.createPendingAction(BaseApiActions.updatePrefix);
  updateSuccess = this.createSuccessAction(BaseApiActions.updatePrefix);
  updateFail = this.createFailAction(BaseApiActions.updatePrefix);

  delete = this.createPendingAction(BaseApiActions.deletePrefix);
  deleteSuccess = this.createSuccessAction(BaseApiActions.deletePrefix);
  deleteFail = this.createFailAction(BaseApiActions.deletePrefix);

  
}


export default class BudgetsActions extends BaseApiActions {
  constructor(){
    super("budget")
  }
  
}