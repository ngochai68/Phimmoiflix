async function getMovies() {
  try {
    const response = await fetch('http://localhost:3000/movies');
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function renderMovies() {
  const movies = await getMovies();
  const sliderMove = document.querySelector('.light-slider-container .slider-content .slider-move');

  movies.forEach(movie => {
    const html = `<div class="slide-item-wrap">
                    <div class="lightSlider">
                    <div class="plist-img-wrap">
                        <div>
                        <a href="#">
                            <div class="pic-box">
                            <span>
                                <img src="${movie.img_1_url}" alt="" />
                            </span>
                            <div class="update-info-layer">
                                <div class="update-info-mask">Cập nhật tập 28</div>
                            </div>
                            </div>
                        </a>
                        </div>
                        <a href="#">
                        <div class="text-box">
                            <p class="title">${movie.name}</p>
                        </div>
                        </a>
                    </div>
                    </div>
                </div>`;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    const slideItemWrap = wrapper.firstChild;

    sliderMove.appendChild(slideItemWrap);
  });
}

renderMovies();
