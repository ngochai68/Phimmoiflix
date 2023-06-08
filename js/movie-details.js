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
async function fetchGenresData() {
  return fetchData(`http://localhost:3000/genre`);
}

// Lấy dữ liệu khu vực
async function fetchAreasData() {
  return fetchData(`http://localhost:3000/area`);
}

// Render dữ liệu trang chi tiết
async function renderMovieDetails() {
  const movie = await fetchMovieById(movieId);

  const contentWrapper = document.querySelector(
    '.contentWrapper-movie-details .focus-info-wrapper'
  );
  const imgLinkBannerElement = document.querySelector(
    '.movie-details-box .focus-content .focus-wrapper'
  );
  const episolesListElement = document.querySelector(
    '.contentWrapper .contentWrapper-episode-lists .video-list-wrapper'
  );
  const tabPageWrapElement = document.querySelector(
    '.contentWrapper .contentWrapper-episode-lists .tab-pages-wrap-single'
  );

  const {
    movieTitleElement,
    infoMaskElement,
    infoTagElement,
    areaGenreElement,
    directorPerformerElement,
    describeElement,
  } = {
    movieTitleElement: contentWrapper.querySelector('.focus-info-title'),
    infoMaskElement: contentWrapper.querySelector('.focus-info-mark'),
    infoTagElement: contentWrapper.querySelector('.focus-info-tag'),
    areaGenreElement: contentWrapper.querySelector('.focus-info-tag-type'),
    directorPerformerElement: contentWrapper.querySelector('.focus-info-tag-o'),
    describeElement: contentWrapper.querySelector('.focus-info-desc'),
  };

  const [
    contentInfoMask,
    contentInfoTag,
    contentAreaGenre,
    contentDirectorPerformer,
    contentDescribe,
    contentImgLinkBanner,
    contentEpisodesList,
    contentEpisodesPages,
  ] = await Promise.all([
    generateContentInfoMask(movie),
    generateContentInfoTag(movie),
    generateContentAreaGenre(movie),
    generateContentDirectorPerformer(movie),
    generateContentDescribe(movie),
    generateContentImgLinkBanner(movie),
    generateContentEpisodesList(movie),
    generateContentEpisodesPages(movie),
  ]);

  movieTitleElement.innerHTML = movie.name;
  infoMaskElement.innerHTML = contentInfoMask;
  infoTagElement.innerHTML = contentInfoTag;
  areaGenreElement.innerHTML = contentAreaGenre;
  directorPerformerElement.innerHTML = contentDirectorPerformer;
  describeElement.innerHTML = contentDescribe;
  imgLinkBannerElement.innerHTML = contentImgLinkBanner;
  episolesListElement.innerHTML = contentEpisodesList;
  tabPageWrapElement.innerHTML = contentEpisodesPages;
}

// Lấy dữ liệu contentInfoMask
function generateContentInfoMask(movie) {
  const isTopRating = rating => rating >= 1 && rating <= 10;
  const isIQIYIProducer = producer => producer === 'IQIYI';

  let contentInfoMask = '';

  if (isTopRating(movie.rating)) {
    contentInfoMask = `<span class="focus-item-label-top">
                            <span class="focus-item-label-rank">TOP ${movie.rating}</span>
                            Top Phim Thịnh Hành
                          </span>`;
  }

  if (isIQIYIProducer(movie.producer)) {
    contentInfoMask += '<span class="focus-item-label-original">iQIYI sản xuất</span>';
  }

  return contentInfoMask;
}

// Lấy dữ liệu contentInfoTag
function generateContentInfoTag(movie) {
  const { score, classification, yearManufacture, episodes, totalEpisodes } = movie;
  const episodeText =
    episodes.length === totalEpisodes
      ? `${totalEpisodes} tập`
      : `Cập nhật tới tập ${episodes.length} / tổng cộng ${totalEpisodes} tập`;

  const contentInfoTag = `<div class="pcScore">
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
                                          <span class="score-info-number">${score}</span>
                                      </div>
                                  </div>
                              </div>
                              <div class="broken-line"></div>
                          </div>
                          <span>${classification}</span>
                          <div class="broken-line"></div>
                          <span>${yearManufacture}</span>
                          <div class="broken-line"></div>
                          <span>${episodeText}</span>`;

  return contentInfoTag;
}

// Lấy dữ liệu contentAreaGenre
async function generateContentAreaGenre(movie) {
  const [areas, genres] = await Promise.all([fetchAreasData(), fetchGenresData()]);

  const area = areas.find(area => area.id === movie.areaId);

  const movieGenres = await Promise.all(
    movie.genreIds.map(async genreId => {
      const genre = genres.find(genre => genre.id === genreId);
      return `<span class="type-style">${genre.name}</span>`;
    })
  );

  return `<span class="type-style">${area.name}</span>${movieGenres.join('')}`;
}

// Lấy dữ liệu contentDirectorPerformer
function generateContentDirectorPerformer(movie) {
  const performersHTML = movie.performer
    .map(performer => `<a href="">${performer}</a>`)
    .join('<i>, </i>');

  const renderedHTML = `
      <div class="tag-inline">
        <div>
          <span class="key">
            <h3>Đạo diễn</h3>:
          </span>
          <span>
            <a href="">${movie.director}</a>
          </span>
        </div>
      </div>
      <div class="tag-inline">
        <div>
          <span class="key">
            <h3>Diễn viên chính</h3>:
          </span>
          ${performersHTML}
        </div>
      </div>
    `;

  return renderedHTML;
}

// Lấy dữ liệu contentDescribe
function generateContentDescribe(movie) {
  const describeHTML = `
                              <span class="key">
                                  <h3>Miêu tả</h3>
                                  :
                              </span>
                              <span>
                                  ${movie.describe}                                                                                                                                        trên iQiyi quốc tế(iq.com) từ ngày 15/4.
                              </span>
                              <div class="intl-album-des-btn">
                                  <div class="intl-album-des-cover"></div>
                                  <div class="intl-album-more-btn">
                                      Hiển thị thêm
                                      <div class="intl-album-more-arrow">
                                          <svg width="12px" height="12px" viewbox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                              <g id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                  <g id="1024/tab01" transform="translate(-532.000000, -407.000000)" fill-rule="nonzero">
                                                      <g id="上部分" transform="translate(64.000000, 0.000000)">
                                                          <g id="05-地区/配音/人员/简介" transform="translate(0.000000, 266.000000)">
                                                              <g id="more" transform="translate(0.000000, 72.000000)">
                                                                  <g id="编组" transform="translate(468.500000, 68.000000)">
                                                                      <path d="M9.65685425,3.15685425 L9.65685425,4.07685425 C9.65690688,4.35299662 9.43304925,4.57685425 9.15690688,4.57685425 C9.15688933,4.57685425 9.15687179,4.57685425 9.15685425,4.57680162 L3.57685425,4.57621425 L3.57685425,4.57621425 L3.57685425,10.1568542 C3.57685425,10.4329966 3.35299662,10.6568542 3.07685425,10.6568542 L2.15685425,10.6568542 C1.88071187,10.6568542 1.65685425,10.4329966 1.65685425,10.1568542 L1.65685425,3.93685425 L1.65685425,3.93685425 C1.65685425,3.2620627 2.17901604,2.70922857 2.84132635,2.66036512 L9.15685432,2.65711181 C9.43299652,2.65671207 9.65696943,2.88045435 9.65711168,3.15659669 C9.65711173,3.15668254 9.65711175,3.15676839 9.65685425,3.15685425 Z" id="路径" fill-opacity="0.702969638" fill="#000000" transform="translate(5.656854, 6.656854) scale(-1, 1) rotate(-135.000000) translate(-5.656854, -6.656854) "></path>
                                                                      <path d="M9.65685425,2.15685425 L9.65685425,3.07685425 C9.65690688,3.35299662 9.43304925,3.57685425 9.15690688,3.57685425 C9.15688933,3.57685425 9.15687179,3.57685425 9.15685425,3.57680162 L3.57685425,3.57621425 L3.57685425,3.57621425 L3.57685425,9.15685425 C3.57685425,9.43299662 3.35299662,9.65685425 3.07685425,9.65685425 L2.15685425,9.65685425 C1.88071187,9.65685425 1.65685425,9.43299662 1.65685425,9.15685425 L1.65685425,2.93685425 L1.65685425,2.93685425 C1.65685425,2.2620627 2.17901604,1.70922857 2.84132635,1.66036512 L9.15685432,1.65711181 C9.43299652,1.65671207 9.65696943,1.88045435 9.65711168,2.15659669 C9.65711173,2.15668254 9.65711175,2.15676839 9.65685425,2.15685425 Z" id="路径备份" fill="#1CC749" transform="translate(5.656854, 5.656854) scale(-1, 1) rotate(-135.000000) translate(-5.656854, -5.656854) "></path>
                                                                  </g>
                                                              </g>
                                                          </g>
                                                      </g>
                                                  </g>
                                              </g>
                                          </svg>
                                      </div>
                                  </div>
                              </div>`;
  return describeHTML;
}

// Lấy dữ liệu contentImgBanner
function generateContentImgLinkBanner(movie) {
  return `<a href="" class="focus-img-link">
                <img src="${movie.img2Url}" alt=""/>
            </a>
            <div class="left-layer"></div>
            <div class="bottom-layer"></div>`;
}

// Lấy dữ liệu contentEpisodesList
function generateContentEpisodesList(movie) {
  const episodesListHtml = movie.episodes
    .map(movieEpisode => {
      return `
            <div class="horizontal">
                <div class="plist-img-wrap">
                    <div>
                        <a href="">
                            <div class="pic-box">
                                <span>
                                    <img src="${movieEpisode.img1Url}" alt=""/>
                                </span>
                                <div class="update-info-layer">
                                    <div class="update-info-mask"></div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <a href="">
                        <div class="text-box">
                            <p class="title">${movie.name} ${movieEpisode.name}</p>
                        </div>
                    </a>
                </div>
            </div>
        `;
    })
    .join('');

  return episodesListHtml;
}

// Lấy dữ liệu contentEpisodesPages
function generateContentEpisodesPages(movie) {
  const episodeNumbers = movie.episodes.map(episode => parseInt(episode.name.match(/\d+/)[0]));
  const minEpisodeNumber = Math.min(...episodeNumbers);
  const maxEpisodeNumber = Math.max(...episodeNumbers);

  return `<div class="episodes-pages-tab-single">
              <div class="pages-tab-content">Chọn tập ${minEpisodeNumber}-${maxEpisodeNumber}</div>
          </div>`;
}



renderMovieDetails();
