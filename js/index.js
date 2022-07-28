const BASE_URL = "https://www.themealdb.com/api/json/v1/1"
const CATEGORIES_DIV = document.getElementById('categories')

const createCategoryElement = (categoryName, imgThumbnail) => {
    const a = $("<a></a>").attr('href', `category_detail.html?category=${categoryName.toLowerCase()}`)

    const parentDiv = $("<div></div>").addClass("col-md-3 col-sm-6 col-xs py-3 px-2")

    const mainDiv = $("<div></div>").addClass("meal rounded position-relative").css('background-image', `url(${imgThumbnail})`)

    const textBg = $("<div></div>").addClass('text-background')

    const text = $("<div></div>").addClass("text-category text-center text-capitalize").text(categoryName)
    
    mainDiv.append(textBg)
    mainDiv.append(text)
    parentDiv.append(mainDiv)
    a.append(mainDiv)
    parentDiv.append(a)
    $("#categories").append(parentDiv)
}

const getCategories = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/categories.php`)
        const categories = response.data.categories
        console.log(categories)
        categories.map(category => {
            createCategoryElement(category.strCategory, category.strCategoryThumb)
        })
    } catch (err){
        console.error(err)
    }
}


getCategories()