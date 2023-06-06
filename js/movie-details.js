const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Lấy dữ liệu từ API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Lấy dữ liệu chi tiết phim
async function fetchMovieById(movieId) {
  return fetchData(`http://localhost:3000/movies/${movieId}`);
}

// Lấy dữ liệu thể loại
async function getGenresData() {
  return fetchData(`http://localhost:3000/genre`);
}

// Lấy dữ liệu khu vực
async function getAreasData() {
  return fetchData(`http://localhost:3000/area`);
}

// Render dữ liệu trang chi tiết
async function renderMovieDetails() {
  const movie = await fetchMovieById(movieId);

  // Render tên phim
  const movieNameElement = document.querySelector(
    '.contentWrapper-movie-details .focus-info-wrapper .focus-info-title'
  );
  movieNameElement.innerHTML = movie.name;

  // Render contentInfoMask
  const infoMaskElement = document.querySelector(
    '.contentWrapper-movie-details .focus-info-wrapper .focus-info-mark'
  );

  const contentInfoMask = generateContentInfoMask(movie);
  infoMaskElement.innerHTML = contentInfoMask;

  // Render contentInfoTag
  const infoTagElement = document.querySelector(
    '.contentWrapper-movie-details .focus-info-wrapper .focus-info-tag'
  );

  const contentInfoTag = generateContentInfoTag(movie);
  infoTagElement.innerHTML = contentInfoTag;

  // Render contentAreaGenre
  const areaGenreElement = document.querySelector('.contentWrapper-movie-details .focus-info-wrapper .focus-info-tag-type');

  const contentAreaGenre = await generateContentAreaGenre(movie);
  areaGenreElement.innerHTML = contentAreaGenre;
}

// Lấy dữ liệu contentInfoMask
function generateContentInfoMask(movie) {
  let contentInfoMask = '';

  if (isTopMovie(movie.rating)) {
    contentInfoMask += `<span class="focus-item-label-top">
                          <span class="focus-item-label-rank">TOP ${movie.rating}</span>
                          Top Phim Thịnh Hành
                        </span>`;
  }

  if (isIQIYIProducer(movie.producer)) {
    contentInfoMask += '<span class="focus-item-label-original">iQIYI sản xuất</span>';
  }

  function isTopMovie(rating) {
    return rating >= 1 && rating <= 10;
  }

  function isIQIYIProducer(producer) {
    return producer === 'IQIYI';
  }

  return contentInfoMask;
}

// Lấy dữ liệu contentInfoTag
function generateContentInfoTag(movie) {
  let contentInfoTag = `<div class="pcScore">
                            <div class="pcScore-1">
                                <div class="album-score">
                                    <div class="all-score-info">
                                        <span class="score-info-greenStar">
                                            <svg width="20px" height="20px" viewbox="0 0 28 27" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g id="V1.12.0_UI_4391_Watch-Page-Add-Rating" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g id="4391-6_1920_info" transform="translate(-948.000000, -906.000000)" fill="#1CC749" fill-rule="nonzero">
                                                        <g id="Group-10-Copy-10" transform="translate(906.000000, 880.000000)">
                                                            <g id="ic/star_green" transform="translate(40.000000, 24.000000)">
                                                                <path d="M16.7983826,2.56356746 L19.7968803,11.2875241 L29.1657516,11.3941138 C29.9719564,11.4033379 30.3057022,12.4128653 29.6590696,12.8853446 L22.1424877,18.3829131 L24.9344802,27.1724634 C25.17436,27.9288402 24.3014061,28.55198 23.643301,28.0938493 L16.0005215,22.7674392 L8.35669898,28.0928244 C7.69963687,28.5509551 6.82563997,27.9267904 7.06551979,27.1714385 L9.85751226,18.3818882 L2.34093036,12.8843197 C1.69429781,12.4118404 2.02804364,11.402313 2.83424842,11.3930889 L12.2031197,11.2864992 L15.2016174,2.56254256 C15.4602704,1.81231509 16.5407725,1.81231509 16.7983826,2.56356746 Z" id="Star"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </span>
                                        <span class="score-info-number">${movie.score}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="broken-line"></div>
                        </div>
                        <span>${movie.classification}</span>
                        <div class="broken-line"></div>
                        <span>${movie.year_manufacture}</span>
                        <div class="broken-line"></div>
                        <span>${
                          movie.current_episode === movie.total_episodes
                            ? `${movie.total_episodes} tập`
                            : `Cập nhật tới tập ${movie.current_episode} / tổng cộng ${movie.total_episodes} tập`
                        }</span>`;
  return contentInfoTag;
}

// Lấy dữ liệu contentAreaGenre
async function generateContentAreaGenre(movie) {
  const areas = await getAreasData();
  const genres = await getGenresData();
  const area = areas.find(item => item.id === movie.area_id);
  const movieGenres = movie.genre_ids.map(genreId => {
    const genre = genres.find(item => item.id === genreId);
    return `<span class="type-style">${genre.name}</span>`;
  }).join('');
  return `<span class="type-style">${area.name}</span>
            ${movieGenres}`;
}

renderMovieDetails();
