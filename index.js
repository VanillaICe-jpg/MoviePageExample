//API initiaton
const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH ="https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// delcares where Elements will be inserted
    const main = document.querySelector("main");
    const form = document.getElementById("form");
    const search = document.getElementById("search");
    const banner = document.querySelector(".banner")

    
    async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();
    
        console.log(respData);
    
        showMovies(respData.results);

    }

        function showMovies(movies) {
            // clear main
            main.innerHTML = "";

            let i = -1;

       movies.forEach((movie) => {
        const {poster_path,title,vote_average,backdrop_path} =movie;


        // creating elements for the banner

        const BannerElement =document.createElement("li");
            BannerElement.classList.add("a")
            BannerElement.innerHTML = `
                <div class="mySlides fade">
                    <img src="${IMGPATH + backdrop_path}">
                    
                    <div class="text">
                    ${title}
                        </div>
                </div>
        `;
        banner.appendChild(BannerElement);

        //Creating elements for Each Movie
        const movieElement = document.createElement("div");

            movieElement.classList.add("movie");
            movieElement.innerHTML = `
                    <img 
                        src= "${IMGPATH + poster_path}" 
                        alt="${title}"
                    />
                    <div class="movie-info">
                        <h3>${title} </h3>
                        <span> ${vote_average}</span>
                    </div>
                </div>
                `; 

            main.appendChild(movieElement);
        });

        // JS For Search bar

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const searchTerm = search.value;

            if (searchTerm) {
                getMovies(SEARCHAPI + searchTerm);

                search.value = "";
            }
        });
    }

getMovies(APIURL);


// Basic JS for Carousel 

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

