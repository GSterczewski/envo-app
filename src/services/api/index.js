
const fetchClient = () => ({
  getAll : url => new Promise((resolve, reject) => fetch(url)
  .then(result => result.ok ? resolve(result.json()) : reject(result))
  .catch(err => reject(err)) )
})

const client = fetchClient();
const appendSlug = (url,slug) => `${url}/${slug}`

const createApiService = client => url => ({
  getAll : slug => client.getAll(appendSlug(url,slug))
})


const budgetsApiService = createApiService(client)("api/budgets");
const services = {
  budgets: budgetsApiService

}
export default services;