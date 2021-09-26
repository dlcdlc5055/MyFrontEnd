const getData = async (number) => {
    const url = `http://numbersapi.com/${number}/trivia`
    const response = await fetch(url)
    const status = response.status;
    const text = await response.text()
    if(status!==404)
        return text
    else
        return ''
}

export default getData