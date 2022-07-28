const BASE_URL = "https://www.themealdb.com/api/json/v1/1"
const CATEGORIES_DIV = document.getElementById('categories')

const params = new Proxy(new URLSearchParams(window.location.search),{
    get: (searchParams, prop) =>  searchParams.get(prop),
})

const category = params.category


const createMealElement = (id, mealName, imgThumbnail) => {
    const a = $("<a></a>").attr('href', `meal_detail.html?category=${category}&id=${id}`)

    const parentDiv = $("<div></div>").addClass("col-md-3 col-sm-6 col-xs py-3 px-3")

    const mainDiv = $("<div></div>").addClass("meal rounded position-relative").css('background-image', `url(${imgThumbnail})`)

    const textBg = $("<div></div>").addClass('text-background')

    const text = $("<div></div>").addClass("text-category text-center text-capitalize").text(mealName)
    
    mainDiv.append(textBg)
    mainDiv.append(text)
    parentDiv.append(mainDiv)
    a.append(mainDiv)
    parentDiv.append(a)
    $("#categories").append(parentDiv)
}

const getMealsByCategory = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`)
        const meals = response.data.meals
        meals.map(meal => {
            createMealElement(meal.idMeal, meal.strMeal, meal.strMealThumb)
        })
        $("#category").append(category)
    } catch (err){
        console.error(err)
    }
}

getMealsByCategory()