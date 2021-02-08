class HTTPFetchClient {
  get(url){
    return new Promise((resolve,reject) => {
      fetch(url)
      .then(result => result.ok ? resolve(result.json()) : reject(result))
      .catch(error => reject(error))
    })
  }
}

  class ApiService {

    static success(result){
      return{
        hasErrors: false,
        result
      }
    }
    static failure(error){
      return{
        hasErrors: true,
        error
      }
    }
    static appendSlug(url,slug = ''){
      
      return slug.length ? `${url}/${slug}` : url
    }
    constructor(client,url){
      this.url = url;
      this.client = client;
    }
    getAll(slug){
      return this.client.get(ApiService.appendSlug(this.url,slug))
      .then(result => ApiService.success(result))
      .catch(error => ApiService.failure(error))
    }

  }

const fetchClient = new HTTPFetchClient();
const budgetsApiService = new ApiService(fetchClient,"api/budgets");

const services = {
  budgets: budgetsApiService

}
export default services;