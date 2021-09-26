const up_arrow = document.querySelector(".up_arrow")
const down_arrow = document.querySelector(".down_arrow")
const reviews = document.querySelectorAll(".review")
const nr_of_reviews = 4
var current_review = 0

up_arrow.addEventListener("click", () => {
    current_review -= 1
    if (current_review < 0) {
        current_review = 0
    }
    console.log(current_review);
    updateReviews()
})

down_arrow.addEventListener("click", () => {
    current_review += 1
    if (current_review >= nr_of_reviews) {
        current_review = nr_of_reviews - 1
    }
    console.log(current_review);
    updateReviews()
})

function updateReviews() {
    var value = current_review * 100
    console.log(reviews);
    for (var i = 0; i < reviews.length; i++) {
        reviews[i].style.transform = "translateY(" + -value + "%)"
    }
}