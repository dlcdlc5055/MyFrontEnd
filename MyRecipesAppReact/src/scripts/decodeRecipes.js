export const decodeRecipes = (data) => {
    let buffer = []
    let i = 0
    console.log(data);
    for (let item of data) {
        item.recipe.id = i
        buffer.push(item.recipe)
        i += 1
    }
    return buffer
}