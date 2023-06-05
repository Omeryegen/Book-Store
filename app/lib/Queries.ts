export async function getBooks() {
    const response = await fetch('http://localhost:3000/api/books') 
    const data = response.json()
    return data
}

