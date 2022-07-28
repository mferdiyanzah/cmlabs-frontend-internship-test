const BASE_URL = "https://www.themealdb.com/api/json/v1/1"


const params = new Proxy(new URLSearchParams(window.location.search),{
    get: (searchParams, prop) =>  searchParams.get(prop),
})

const mealId = params.id
const category = params.category
$("#category").append(`<a href="category_detail.html?category=${category}">${category}</a>`)


const createMealElement = (mealName, imgThumbnail, instruction, ingredients, urlYt) => {
    $("#meal-name").append(mealName)

    $("#mealImg").attr("src", imgThumbnail)

    $("#instruction").append(instruction)
    
    for(i = 0; i < ingredients.length; i++){
        $("#recipes").append(`<li class="text-capitalize">${ingredients[i]}</li>`)
    }

    $('iframe').attr("src", urlYt)
}

let mealDetail

const getMealsById = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/lookup.php?i=${mealId}`)
        const meals = response.data.meals[0]

        let ingredients = []
        let measure = []

        for (const property in meals){
            if (property.includes('strIngredient') && meals[property]){
                ingredients.push(meals[property])
            }
            if (property.includes('strMeasure') && meals[property]){
                measure.push(meals[property])
            }
        }
        
        let finalIngredients = []
        for (let i = 0; i < ingredients.length;i++){
            const tempIngredients = measure[i] + ' ' + ingredients[i]
            finalIngredients.push(tempIngredients)
        }
        let strYt = meals.strYoutube
        strYt = strYt.replace("watch?v=", "embed/")
        console.log(strYt)

        createMealElement(meals.strMeal, meals.strMealThumb, meals.strInstructions, finalIngredients, strYt)
    } catch (err){
        console.error(err)
    }
}

getMealsById()
