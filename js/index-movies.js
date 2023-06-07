async function fetchMoviesData() {
    try {
        const response = await fetch('http://localhost:3000/movies');
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function createSlideItemWrapElement(html) {
    const slideItemWrapElement = document.createElement('div');
    slideItemWrapElement.classList.add('slide-item-wrap');
    slideItemWrapElement.innerHTML = html;
    return slideItemWrapElement;
}

function createMovieLinkEventListener(link) {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const movieId = link.getAttribute('data-id');
        console.log('Clicked on movie with id:', movieId);
        // Sử dụng movieId để thực hiện các hoạt động khác, ví dụ: get thông tin phim từ API bằng id, chuyển hướng đến trang chi tiết phim, vv.
    });
}

async function renderMovies() {
    try {
        const moviesData = await fetchMoviesData();
        const sliderMoveElement = document.querySelector('.light-slider-container .slider-content .slider-move');
        const fragment = document.createDocumentFragment();

        moviesData.forEach((movie) => {
            const movieUpdateInfo = movie.episodes.length === movie.totalEpisodes
        ? `Trọn bộ ${movie.totalEpisodes} tập`
        : `Cập nhật tập ${movie.episodes.length}`;

        console.log(movie.episodes.length);
        console.log(movie.totalEpisodes);
        console.log(movieUpdateInfo);

            const html = `<div class="lightSlider" data-id="${
                movie.id
            }">
                  <div class="plist-img-wrap">
                    <div>
                      <a href="#">
                        <div class="pic-box">
                          <span>
                            <img src="${
                movie.img1Url
            }" alt="" />
                          </span>
                          <div class="update-info-layer">
                            <div class="update-info-mask">${movieUpdateInfo}</div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <a href="#">
                      <div class="text-box">
                        <p class="title">${
                movie.name
            }</p>
                      </div>
                    </a>
                  </div>
                </div>`;

            const slideItemWrapElement = createSlideItemWrapElement(html);
            fragment.appendChild(slideItemWrapElement);
        });

        sliderMoveElement.appendChild(fragment);

        const movieLinks = document.querySelectorAll('.light-slider-container .slider-content .slider-move .slide-item-wrap .lightSlider[data-id]');

        movieLinks.forEach((link) => {
            createMovieLinkEventListener(link);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

renderMovies();
