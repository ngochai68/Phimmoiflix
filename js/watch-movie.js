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

// Render dữ liệu trang chi tiết
async function renderMovieDetails() {
  const movie = await fetchMovieById(movieId);

  const playMainTitleElement = document.querySelector(
    '.intl-play-area .intl-play-right .intl-play-main-title'
  );
  const episodesFilterWrapElement = document.querySelector(
    '.intl-play-area .intl-play-right .episodes-filter-wrap'
  );
  const intlPlayTitleElement = document.querySelector(
    '.intl-play-con .intl-play-con-inner .intl-play-title'
  );
  const playScoreElement = document.querySelector(
    '.intl-play-con .intl-play-con-inner .play-score-ctn'
  );
  const intlPlayTimeElement = document.querySelector(
    '.intl-play-con .intl-play-con-inner .intl-play-time'
  );
  const intlPlayLeftElement = document.querySelector(
    '.intl-play-area-wrap .intl-play-area-inner .intl-play-left'
  );
  const playScrollCtnElement = document.querySelector(
    '.intl-play-area-wrap .intl-play-right .intl-play-scroll-content'
  );

  const [
    contentTitle,
    episodesPageTab,
    playTitle,
    playScore,
    movieIntro,
    videoSource,
    playListEpisodes,
  ] = await Promise.all([
    generateContentTitle(movie),
    generateEpisodesPageTab(movie),
    generatePlayTitle(movie),
    generatePlayScore(movie),
    generateMovieIntro(movie),
    generateVideoSource(movie),
    generatePlayListEpisodes(movie),
  ]);

  playMainTitleElement.innerHTML = contentTitle;
  episodesFilterWrapElement.innerHTML = episodesPageTab;
  intlPlayTitleElement.innerHTML = playTitle;
  playScoreElement.innerHTML = playScore;
  intlPlayTimeElement.innerHTML = movieIntro;
  intlPlayLeftElement.innerHTML = videoSource;
  playScrollCtnElement.innerHTML = playListEpisodes;
}

// Lấy dữ liệu tên phim
function generateContentTitle(movie) {
  return `<a href="movie-details.html?id=${movieId}" class="main-title">${movie.name}</a>`;
}

// Lấy dữ liệu số tập
function generateEpisodesPageTab(movie) {
  const episodeNumbers = movie.episodes.map(episode => parseInt(episode.name.match(/\d+/)[0]));
  const minEpisodeNumber = Math.min(...episodeNumbers);
  const maxEpisodeNumber = Math.max(...episodeNumbers);
  return `<div class="episodes-filter-current">
                <div class="episodes-pages-tab">
                <div class="pages-tab-content">Chọn tập ${minEpisodeNumber}-${maxEpisodeNumber}</div>
                </div>
                <div class="episodes-page-list-mode">
                <svg
                    width="18px"
                    height="17px"
                    viewBox="0 0 18 17"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <g
                    id="控件"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    >
                    <g
                        id="icon/listmode"
                        transform="translate(-3.000000, -3.000000)"
                        fill="#A9A9AC"
                    >
                        <path
                        d="M5.5,17 C5.77614237,17 6,17.2238576 6,17.5 L6,19.5 C6,19.7761424 5.77614237,20 5.5,20 L3.5,20 C3.22385763,20 3,19.7761424 3,19.5 L3,17.5 C3,17.2238576 3.22385763,17 3.5,17 L5.5,17 Z M20.5,17 C20.7761424,17 21,17.2238576 21,17.5 L21,19.5 C21,19.7761424 20.7761424,20 20.5,20 L9.5,20 C9.22385763,20 9,19.7761424 9,19.5 L9,17.5 C9,17.2238576 9.22385763,17 9.5,17 L20.5,17 Z M5.5,10 C5.77614237,10 6,10.2238576 6,10.5 L6,12.5 C6,12.7761424 5.77614237,13 5.5,13 L3.5,13 C3.22385763,13 3,12.7761424 3,12.5 L3,10.5 C3,10.2238576 3.22385763,10 3.5,10 L5.5,10 Z M20.5,10 C20.7761424,10 21,10.2238576 21,10.5 L21,12.5 C21,12.7761424 20.7761424,13 20.5,13 L9.5,13 C9.22385763,13 9,12.7761424 9,12.5 L9,10.5 C9,10.2238576 9.22385763,10 9.5,10 L20.5,10 Z M5.5,3 C5.77614237,3 6,3.22385763 6,3.5 L6,5.5 C6,5.77614237 5.77614237,6 5.5,6 L3.5,6 C3.22385763,6 3,5.77614237 3,5.5 L3,3.5 C3,3.22385763 3.22385763,3 3.5,3 L5.5,3 Z M20.5,3 C20.7761424,3 21,3.22385763 21,3.5 L21,5.5 C21,5.77614237 20.7761424,6 20.5,6 L9.5,6 C9.22385763,6 9,5.77614237 9,5.5 L9,3.5 C9,3.22385763 9.22385763,3 9.5,3 L20.5,3 Z"
                        id="Combined-Shape"
                        ></path>
                    </g>
                    </g>
                </svg>
                </div>
            </div>`;
}

// Lấy dữ liệu tên phim 2
function generatePlayTitle(movie) {
  return `<a href="" class="intl-album-title">
                <span class="intl-album-title-word-wrap">
                <span>${movie.name}</span>
                </span>
                <svg
                width="25px"
                height="41px"
                viewBox="0 0 25 41"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g
                    id="轮播图元素-2"
                    transform="translate(-324.000000, -2225.000000)"
                    fill="#FFFFFF"
                    fill-rule="nonzero"
                    >
                    <g id="06-箭头" transform="translate(100.000000, 2102.000000)">
                        <g id="hover" transform="translate(200.000000, 78.000000)">
                        <path
                            d="M44.1666667,52 L44.1666667,56.8372093 C44.1667695,57.3894941 43.7190542,57.8372093 43.1667695,57.8372093 C43.1667352,57.8372093 43.1667009,57.8372093 43.1666667,57.8371065 L22,57.8349302 L22,57.8349302 L22,78.4883721 C22,79.0406568 21.5522847,79.4883721 21,79.4883721 L16,79.4883721 C15.4477153,79.4883721 15,79.0406568 15,78.4883721 L15,55.5581395 L15,55.5581395 C15,53.1551754 16.9037148,51.1865074 19.3183879,51.0125024 L19.6666667,51 L43.1666667,51 C43.7189514,51 44.1666667,51.4477153 44.1666667,52 Z"
                            id="箭头/右-"
                            transform="translate(29.583333, 65.244186) scale(-1, 1) rotate(-45.000000) translate(-29.583333, -65.244186) "
                        ></path>
                        </g>
                    </g>
                    </g>
                </g>
                </svg>
            </a>
            <span id="episode-title">${movie.episodes[0].name}</span>`;
}

// Lấy dữ liệu play score
function generatePlayScore(movie) {
  function formatNumber(num) {
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + num).length / 3);
    let shortNum = parseFloat(
      (suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(3)
    );
    if (shortNum % 1 !== 0) {
      shortNum = shortNum.toFixed(1);
    }
    return shortNum + suffixes[suffixNum];
  }

  const score = movie.score;
  const formattedNumber = formatNumber(movie.numberReviews);

  return `
      <div class="play-score">
        <div class="all-score-info">
          <span class="score-info-greenStar">
                <svg
                width="20px"
                height="20px"
                viewBox="0 0 28 27"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                >
                <g
                    id="V1.12.0_UI_4391_Watch-Page-Add-Rating"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                >
                    <g
                    id="4391-6_1920_info"
                    transform="translate(-948.000000, -906.000000)"
                    fill="#1CC749"
                    fill-rule="nonzero"
                    >
                    <g
                        id="Group-10-Copy-10"
                        transform="translate(906.000000, 880.000000)"
                    >
                        <g id="ic/star_green" transform="translate(40.000000, 24.000000)">
                        <path
                            d="M16.7983826,2.56356746 L19.7968803,11.2875241 L29.1657516,11.3941138 C29.9719564,11.4033379 30.3057022,12.4128653 29.6590696,12.8853446 L22.1424877,18.3829131 L24.9344802,27.1724634 C25.17436,27.9288402 24.3014061,28.55198 23.643301,28.0938493 L16.0005215,22.7674392 L8.35669898,28.0928244 C7.69963687,28.5509551 6.82563997,27.9267904 7.06551979,27.1714385 L9.85751226,18.3818882 L2.34093036,12.8843197 C1.69429781,12.4118404 2.02804364,11.402313 2.83424842,11.3930889 L12.2031197,11.2864992 L15.2016174,2.56254256 C15.4602704,1.81231509 16.5407725,1.81231509 16.7983826,2.56356746 Z"
                            id="Star"
                        ></path>
                        </g>
                    </g>
                    </g>
                </g>
                </svg>
            </span>
          <span class="score-info-number">${score}</span>
        </div>
        <div class="score-person-ratio-wrap">
          <div class="score-info-person-number">
            (<span>${formattedNumber} người đã đánh giá</span>)
          </div>
          <span class="dot">•</span>
          <div class="own-score-info">
            <span class="own-score-info-text">Tôi muốn đánh giá</span>
          </div>
        </div>
      </div>
    `;
}

// Lấy dữ liệu movie intro
function generateMovieIntro(movie) {
  const isTopRating = rating => rating >= 1 && rating <= 10;
  const isIQIYIProducer = producer => producer === 'IQIYI';
  const episodeText =
    movie.episodes.length === movie.totalEpisodes
      ? `${movie.totalEpisodes} tập`
      : `Cập nhật tới tập ${movie.episodes.length} / tổng cộng ${movie.totalEpisodes} tập`;

  const contentInfoMask = [];

  if (isTopRating(movie.rating)) {
    contentInfoMask.push(`
        <span class="focus-item-label-top">
          <span class="focus-item-label-rank">TOP ${movie.rating}</span>
          Top Phim Thịnh Hành
        </span>
        <div class="broken-line"></div>
      `);
  }

  if (isIQIYIProducer(movie.producer)) {
    contentInfoMask.push(`
        <span class="focus-item-label-exclusive">iQIYI sản xuất</span>
        <div class="broken-line"></div>
      `);
  }

  contentInfoMask.push(`
      <span>${movie.classification}</span>
      <div class="broken-line"></div>
      <span>${movie.yearManufacture}</span>
      <div class="broken-line"></div>
      <span class="update-set">${episodeText}</span>
    `);

  return contentInfoMask.join('');
}

// Lấy dữ liệu video
function generateVideoSource(movie) {
  const { videoUrl } = movie.episodes[0];

  return `
    <iframe
      id="video-player"
      width="1154px"
      height="648.55px"
      src="${videoUrl}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  `;
}

// Lấy dữ liệu list tập phim
function generatePlayListEpisodes(movie) {
  const episodesHTML = movie.episodes
    .map((episode, index) => {
      const listItemClass = index === 0 ? 'v-li-drama selected' : 'v-li-drama';
      const episodeNumber = episode.name.match(/\d+/)[0];

      return `
      <li class="${listItemClass}">
        <a href="" class="drama-item" data-video-url="${episode.videoUrl}" data-episode-name="${episode.name}">${episodeNumber}</a>
      </li>
    `;
    })
    .join('');

  return `
    <div class="intl-play-list-title">
    </div>
    <div class="intl-juji-list">
      <ul class="intl-episodes-list">
        ${episodesHTML}
      </ul>
    </div>
  `;
}

renderMovieDetails();
