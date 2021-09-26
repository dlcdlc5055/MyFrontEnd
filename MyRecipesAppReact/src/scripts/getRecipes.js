export const getRecipes = async (search) => {
    const APP_ID = `9cffe5d1`
    const APP_KEY = `fead9516aaed9163bd23db4988b6a86a`
    const url = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    const hits = data.hits
    return hits
}