// Lấy dữ liệu phim từ API
async function getMoviesData() {
  try {
    const response = await fetch('http://localhost:3000/movies');
    return response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Hiển thị dữ liệu ra giao diện trang chủ
async function renderMovies() {
  const moviesData = await getMoviesData();
  const sliderMoveElement = document.querySelector(
    '.light-slider-container .slider-content .slider-move'
  );
  const fragment = document.createDocumentFragment();

  moviesData.forEach(movie => {
    const slideItemWrapElement = document.createElement('div');
    slideItemWrapElement.classList.add('slide-item-wrap');

    const html = `<div class="lightSlider" data-id="${movie.id}">
                    <div class="plist-img-wrap">
                      <div>
                        <a href="#">
                          <div class="pic-box">
                            <span>
                              <img src="${movie.img_1_url}" alt="" />
                            </span>
                            <div class="update-info-layer">
                              <div class="update-info-mask">${
                                movie.current_episode === movie.total_episodes
                                  ? `Cập nhật tập ${movie.current_episode}`
                                  : `Trọn bộ ${movie.total_episodes} tập`
                              }</div>
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
                  </div>`;

    slideItemWrapElement.innerHTML = html;
    fragment.appendChild(slideItemWrapElement);
  });

  sliderMoveElement.appendChild(fragment);

  const movieLinks = document.querySelectorAll(
    '.light-slider-container .slider-content .slider-move .slide-item-wrap .lightSlider[data-id]'
  );

  movieLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const movieId = link.getAttribute('data-id');
      // Sử dụng movieId để thực hiện các hoạt động khác, ví dụ: get thông tin phim từ API bằng id, chuyển hướng đến trang chi tiết phim, vv.
      console.log('Clicked on movie with id:', movieId);
    });
  });
}

renderMovies();
