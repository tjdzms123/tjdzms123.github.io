# [Minimal Mistakes Jekyll 테마](https://mmistakes.github.io/minimal-mistakes/)

[![LICENSE](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/mmistakes/minimal-mistakes/master/LICENSE)
[![Jekyll](https://img.shields.io/badge/jekyll-%3E%3D%203.7-blue.svg)](https://jekyllrb.com/)

Minimal Mistakes는 개인 사이트, 블로그, 포트폴리오 제작에 최적화된 유연한 2단 Jekyll 테마입니다. 이름에서 알 수 있듯, 스타일링은 의도적으로 미니멀하게 설계되어 있어 원하는 대로 확장하고 커스터마이징할 수 있습니다 :smile:.

:sparkles: [CHANGELOG](CHANGELOG.md)에서 새로운 변경 사항을 확인하세요.

**참고:** 이 테마는 [jekyll-include-cache](https://github.com/benbalter/jekyll-include-cache) 플러그인을 사용합니다. 반드시 `Gemfile`에 설치하고 `_config.yml`의 `plugins` 배열에 포함해야 합니다. 그렇지 않으면 빌드 시 `Unknown tag 'include_cached'` 오류가 발생합니다.

[![Minimal Mistakes 라이브 미리보기][2]][1]

[1]: https://mmistakes.github.io/minimal-mistakes/
[2]: screenshot.png "라이브 미리보기"

![레이아웃 예시](screenshot-layouts.png)

## 주요 기능

- "테마 gem" 형태로 번들링되어 설치/업그레이드가 쉽습니다.
- GitHub Pages와 호환됩니다.
- Jekyll 내장 Sass/SCSS 전처리기를 지원합니다.
- 9가지 색상 스킨을 제공합니다.
- 다양한 반응형 레이아웃 옵션 (단일, 아카이브 인덱스, 검색, 스플래시, 페이지네이션 홈)을 지원합니다.
- [Twitter Cards](https://dev.twitter.com/cards/overview) 및 [Open Graph](http://ogp.me/) 데이터를 통한 검색엔진 최적화(SEO)를 지원합니다.
- [헤더 이미지](https://mmistakes.github.io/minimal-mistakes/docs/layouts/#headers), [커스텀 사이드바](https://mmistakes.github.io/minimal-mistakes/docs/layouts/#sidebars), [목차](https://mmistakes.github.io/minimal-mistakes/docs/helpers/#table-of-contents), [갤러리](https://mmistakes.github.io/minimal-mistakes/docs/helpers/#gallery), 관련 게시물, [브레드크럼 링크](https://mmistakes.github.io/minimal-mistakes/docs/configuration/#breadcrumb-navigation-beta), [네비게이션 목록](https://mmistakes.github.io/minimal-mistakes/docs/helpers/#navigation-list) 등 다양한 선택적 기능을 제공합니다.
- 댓글 기능 지원 ([Disqus](https://disqus.com/), [Facebook](https://developers.facebook.com/docs/plugins/comments), Google+, [Discourse](https://www.discourse.org/), [Staticman](https://staticman.net/) 기반 정적 방식, [utterances](https://utteranc.es/), [giscus](https://giscus.app/)).
- [Google Analytics](https://www.google.com/analytics/) 지원.
- [Swetrix](https://swetrix.com/) GDPR 준수 분석 도구 지원.
- 영어(기본), 아랍어, 브라질 포르투갈어, 불가리아어, 카탈루냐어, 중국어, 체코어, 덴마크어, 네덜란드어, 핀란드어, 프랑스어, 독일어, 그리스어, 히브리어, 힌디어, 헝가리어, 인도네시아어, 아일랜드어, 이탈리아어, 일본어, 스와힐리어, **한국어**, 말라얄람어, 미얀마어, 네팔어, 노르웨이어, 페르시아어, 폴란드어, 펀자브어, 루마니아어, 러시아어, 슬로바키아어, 스페인어, 스웨덴어, 태국어, 터키어, 우크라이나어, 베트남어로 UI 현지화 지원.

## 스킨 (색상 변형)

기본 스킨 외에 11가지 스킨을 제공합니다.

| `air`                                                                                                                                                                                 | `contrast`                                                                                                                                                                                           | `dark`                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![air skin](https://mmistakes.github.io/minimal-mistakes/assets/images/air-skin-archive.png)](https://mmistakes.github.io/minimal-mistakes/assets/images/air-skin-archive-large.png) | [![contrast skin](https://mmistakes.github.io/minimal-mistakes/assets/images/contrast-skin-archive.png)](https://mmistakes.github.io/minimal-mistakes/assets/images/contrast-skin-archive-large.png) | [![dark skin](https://mmistakes.github.io/minimal-mistakes/assets/images/dark-skin-archive.png)](https://mmistakes.github.io/minimal-mistakes/assets/images/dark-skin-archive-large.png) |

| `dirt`                                                                                                                                                                                   | `mint`                                                                                                                                                                                   | `sunrise`                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![dirt skin](https://mmistakes.github.io/minimal-mistakes/assets/images/dirt-skin-archive.png)](https://mmistakes.github.io/minimal-mistakes/assets/images/dirt-skin-archive-large.png) | [![mint skin](https://mmistakes.github.io/minimal-mistakes/assets/images/mint-skin-archive.png)](https://mmistakes.github.io/minimal-mistakes/assets/images/mint-skin-archive-large.png) | [![sunrise skin](https://mmistakes.github.io/minimal-mistakes/assets/images/sunrise-skin-archive.png)](https://mmistakes.github.io/minimal-mistakes/assets/images/sunrise-skin-archive-large.png) |

| `aqua`                                                                                                                                                                                   | `neon`                                                                                                                                                                                   | `plum`                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![aqua skin](https://mmistakes.github.io/minimal-mistakes/assets/images/aqua-skin-archive.png)](https://mmistakes.github.io/minimal-mistakes/assets/images/aqua-skin-archive-large.png) | [![neon skin](https://mmistakes.github.io/minimal-mistakes/assets/images/neon-skin-archive.png)](https://mmistakes.github.io/minimal-mistakes/assets/images/neon-skin-archive-large.png) | [![plum skin](https://mmistakes.github.io/minimal-mistakes/assets/images/plum-skin-archive.png)](https://mmistakes.github.io/minimal-mistakes/assets/images/plum-skin-archive-large.png) |

| `catppuccin_latte`                                                                | `catppuccin_mocha`                                                                |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| ![catppuccin_latte skin](./assets/images/catppuccin_latte-skin-archive-large.png) | ![catppuccin_mocha skin](./assets/images/catppuccin_mocha-skin-archive-large.png) |

## 데모 페이지

| 이름                                           | 설명                                                  |
| ---------------------------------------------- | ----------------------------------------------------- |
| [헤더 이미지가 있는 게시물][header-image-post] | 큰 헤더 이미지가 포함된 게시물.                       |
| [HTML 태그 및 포맷 게시물][html-tags-post]     | 테마의 다양한 마크업 스타일링 예시.                   |
| [구문 강조 게시물][syntax-post]                | 코드 하이라이팅이 적용된 게시물.                      |
| [갤러리가 있는 게시물][gallery-post]           | `<figure>` 요소로 감싼 여러 이미지를 보여주는 게시물. |
| [샘플 컬렉션 페이지][sample-collection]        | 컬렉션에서 가져온 단일 페이지.                        |
| [카테고리 아카이브][categories-archive]        | 카테고리별로 그룹화된 게시물.                         |
| [태그 아카이브][tags-archive]                  | 태그별로 그룹화된 게시물.                             |

추가 샘플 게시물은 데모 사이트의 [게시물 아카이브][year-archive]에서 확인할 수 있습니다. 소스 파일은 [`/docs`](docs) 디렉토리에 있습니다.

[header-image-post]: https://mmistakes.github.io/minimal-mistakes/layout-header-image-text-readability/
[gallery-post]: https://mmistakes.github.io/minimal-mistakes/post%20formats/post-gallery/
[html-tags-post]: https://mmistakes.github.io/minimal-mistakes/markup/markup-html-tags-and-formatting/
[syntax-post]: https://mmistakes.github.io/minimal-mistakes/markup-syntax-highlighting/
[sample-collection]: https://mmistakes.github.io/minimal-mistakes/recipes/chocolate-chip-cookies/
[categories-archive]: https://mmistakes.github.io/minimal-mistakes/categories/
[tags-archive]: https://mmistakes.github.io/minimal-mistakes/tags/
[year-archive]: https://mmistakes.github.io/minimal-mistakes/year-archive/

## 설치

설치 방법은 세 가지입니다: [gem 기반 테마](https://jekyllrb.com/docs/themes/#understanding-gem-based-themes), [원격 테마](https://blog.github.com/2017-11-29-use-any-theme-with-github-pages/) (GitHub Pages 호환), 또는 테마 파일 직접 복사/포크.

### Gem 기반 방법

Gem 기반 테마는 `assets`, `_layouts`, `_includes`, `_sass` 디렉토리가 테마의 gem 안에 저장되어 직접 보이지 않습니다. 그러나 Jekyll 빌드 과정에서 모든 필요한 디렉토리가 읽히고 처리됩니다.

테마 파일을 직접 관리할 필요가 없어 설치와 업데이트가 쉽습니다. 설치 방법:

1. `Gemfile`에 다음을 추가합니다:

   ```ruby
   gem "minimal-mistakes-jekyll"
   ```

2. 다음 [Bundler](http://bundler.io/) 명령어로 번들된 gem을 가져오고 업데이트합니다:

   ```bash
   bundle
   ```

3. 프로젝트의 Jekyll `_config.yml` 파일에서 `theme`을 설정합니다:

   ```yaml
   theme: minimal-mistakes-jekyll
   ```

테마를 업데이트하려면 `bundle update`를 실행하세요.

### 원격 테마 방법

원격 테마는 Gem 기반 테마와 유사하지만 `Gemfile` 변경이나 허용 목록 등록이 필요 없어 GitHub Pages에서 호스팅하는 사이트에 적합합니다.

설치 방법:

1. `Gemfile` 내용을 아래로 생성/교체합니다:

   ```ruby
   source "https://rubygems.org"

   gem "github-pages", group: :jekyll_plugins
   gem "jekyll-include-cache", group: :jekyll_plugins
   ```

2. `_config.yml`의 `plugins` 배열에 `jekyll-include-cache`를 추가합니다.

3. 다음 [Bundler](https://bundler.io/) 명령어로 번들된 gem을 가져오고 업데이트합니다:

   ```bash
   bundle
   ```

4. `_config.yml` 파일에 `remote_theme: "mmistakes/minimal-mistakes@4.28.0"`을 추가합니다. 기존의 `theme:` 또는 `remote_theme:` 항목은 제거합니다.

<!--
  개발 노트: 버전 번호는 현재 다음 파일들에 하드코딩되어 있습니다:

    - package.json
    - README.md (이 파일)
    - docs/_data/theme.yml
    - docs/_pages/home.md (Front Matter "excerpt"에)

  `package.json`이 공식 버전 번호를 가지며, 나머지는 `bundle exec rake version`으로 업데이트할 수 있습니다.

  다음 파일들도 재생성해야 합니다:

    - _includes/copyright.html, _includes/copyright.js, _sass/minimal-mistakes/_copyright.scss
      (`bundle exec rake clean` 후 `bundle exec rake copyright` 실행 - 모두 `package.json` 참조)
    - assets/js/main.min.js (`bundle exec rake js` 실행, `_includes/copyright.js` 참조)

  *팁*: 기본 Rake 태스크를 실행하면 위의 모든 파일이 한 번에 업데이트됩니다.

  또한 라이선스 연도는 다음 파일에 하드코딩되어 있으며 Rake 태스크에 포함되지 않습니다:

    - README.md (이 파일, 하단 근처)
    - LICENSE
-->

**예시가 필요하신가요?** [Minimal Mistakes 원격 테마 스타터](https://github.com/mmistakes/mm-github-pages-starter/generate)를 사용하면 GitHub Pages로 호스팅되는 사이트를 가장 빠르게 시작할 수 있습니다. 스타터에서 새 저장소를 생성하고 샘플 콘텐츠를 자신의 것으로 교체한 후 필요에 맞게 설정하세요.

## 사용법

테마 설정, 커스터마이징, 콘텐츠 추가/마이그레이션 등 자세한 방법은 [테마 문서](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)를 참고하세요.

## 기여

문서에서 오타를 발견했거나 [버그 수정](https://github.com/mmistakes/minimal-mistakes/issues)에 관심이 있으신가요? [이슈를 제출](https://github.com/mmistakes/minimal-mistakes/issues/new)하거나 [풀 리퀘스트](https://help.github.com/articles/using-pull-requests/)를 보내주세요. 처음 풀 리퀘스트를 올리신다면 [GitHub Flow](https://guides.github.com/introduction/flow/)를 먼저 읽어보시면 도움이 됩니다.

테마 사용법이나 Jekyll 관련 질문은 [Jekyll Talk 포럼](https://talk.jekyllrb.com/)을 이용해 주세요.

### 풀 리퀘스트

풀 리퀘스트를 제출할 때:

1. 저장소를 클론합니다.
2. `master`에서 브랜치를 만들고 의미 있는 이름을 붙입니다 (예: `my-awesome-new-feature`).
3. GitHub에서 풀 리퀘스트를 열고 기능 또는 수정 내용을 설명합니다.

개선 사항, 오타 수정 등을 제출할 때 테마 문서와 데모 페이지는 [`/docs`](docs) 디렉토리에서 찾을 수 있습니다.

## 개발

이 테마를 개발하기 위한 환경을 설정하려면 `bundle install`을 실행하세요.

테마를 테스트하려면 `bundle exec rake preview`를 실행하고 브라우저에서 `http://localhost:4000/test/`를 열어보세요. `test/` 디렉토리의 콘텐츠를 사용해 Jekyll 서버가 시작됩니다. 테마와 테스트 사이트를 수정하면 자동으로 재생성되며, 브라우저를 새로고침하면 변경 사항을 확인할 수 있습니다.

## 크레딧

### 제작자

**Michael Rose**

- <https://mademistakes.com>
- <https://twitter.com/mmistakes>
- <https://github.com/mmistakes>

### 아이콘 + 데모 이미지:

- [The Noun Project](https://thenounproject.com) - Garrett Knoll, Arthur Shlain, [tracy tam](https://thenounproject.com/tracytam)
- [Font Awesome](http://fontawesome.io/)
- [Unsplash](https://unsplash.com/)

### 기타:

- [Jekyll](http://jekyllrb.com/)
- [jQuery](http://jquery.com/)
- [Susy](http://susy.oddbird.net/)
- [Breakpoint](http://breakpoint-sass.com/)
- [Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/)
- [FitVids.JS](http://fitvidsjs.com/)
- [GreedyNav.js](https://github.com/lukejacksonn/GreedyNav)
- [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
- [Gumshoe](https://github.com/cferdinandi/gumshoe)
- [jQuery throttle / debounce](http://benalman.com/projects/jquery-throttle-debounce-plugin/)
- [Lunr](http://lunrjs.com)
- [Clipboard.js](https://clipboardjs.com)

## 라이선스

MIT 라이선스 (MIT)

Copyright (c) 2013-2024 Michael Rose 및 기여자

이 소프트웨어 및 관련 문서 파일(이하 "소프트웨어")의 복사본을 취득하는 모든 사람에게 소프트웨어를 제한 없이 사용, 복사, 수정, 병합, 게시, 배포, 서브라이선스 부여 및 판매할 수 있는 권한이 무료로 부여됩니다. 단, 아래 조건을 충족해야 합니다:

위의 저작권 고지와 이 허가 고지는 소프트웨어의 모든 복사본 또는 중요한 부분에 포함되어야 합니다.

소프트웨어는 명시적이거나 묵시적인 어떠한 종류의 보증 없이 "있는 그대로" 제공됩니다. 상품성, 특정 목적 적합성 및 비침해에 대한 보증을 포함하되 이에 국한되지 않습니다. 어떠한 경우에도 저작자 또는 저작권 소유자는 소프트웨어 또는 소프트웨어의 사용 또는 기타 거래로 인해 발생하는 계약, 불법행위 또는 기타 행위에서 발생하는 청구, 손해 또는 기타 책임에 대해 책임을 지지 않습니다.

Minimal Mistakes는 [The Noun Project](https://thenounproject.com/)의 Garrett Knoll, Arthur Shlain, tracy tam이 제작한 아이콘을 포함합니다.
아이콘은 Creative Commons Attribution 3.0 United States (CC BY 3.0 US) 라이선스 하에 배포됩니다.

Minimal Mistakes는 [Font Awesome](http://fontawesome.io/)을 포함합니다.
Copyright (c) 2017 Dave Gandy.
Font Awesome은 [SIL OFL 1.1](http://scripts.sil.org/OFL) 및 [MIT 라이선스](http://opensource.org/licenses/MIT) 조건 하에 배포됩니다.

Minimal Mistakes는 [Unsplash](https://unsplash.com)의 사진을 포함합니다.

Minimal Mistakes는 [Susy](http://susy.oddbird.net/)를 포함합니다.
Copyright (c) 2017, Miriam Eric Suzanne.
Susy는 [BSD 3-clause "New" or "Revised" 라이선스](https://opensource.org/licenses/BSD-3-Clause) 조건 하에 배포됩니다.

Minimal Mistakes는 [Breakpoint](http://breakpoint-sass.com/)를 포함합니다.
Breakpoint는 [MIT/GPL 라이선스](http://opensource.org/licenses/MIT) 조건 하에 배포됩니다.

Minimal Mistakes는 [FitVids.js](https://github.com/davatron5000/FitVids.js/)를 포함합니다.
Copyright (c) 2013 Dave Rubert and Chris Coyier.
FitVids는 [WTFPL 라이선스](http://www.wtfpl.net/) 조건 하에 배포됩니다.

Minimal Mistakes는 [Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/)을 포함합니다.
Copyright (c) 2014-2016 Dmitry Semenov, http://dimsemenov.com.
Magnific Popup은 MIT 라이선스 조건 하에 배포됩니다.

Minimal Mistakes는 [Smooth Scroll](http://github.com/cferdinandi/smooth-scroll)을 포함합니다.
Copyright (c) 2019 Chris Ferdinandi.
Smooth Scroll은 [MIT 라이선스](http://opensource.org/licenses/MIT) 조건 하에 배포됩니다.

Minimal Mistakes는 [Gumshoejs](http://github.com/cferdinandi/gumshoe)를 포함합니다.
Copyright (c) 2019 Chris Ferdinandi.
Gumshoejs는 [MIT 라이선스](http://opensource.org/licenses/MIT) 조건 하에 배포됩니다.

Minimal Mistakes는 [jQuery throttle / debounce](http://benalman.com/projects/jquery-throttle-debounce-plugin/)를 포함합니다.
Copyright (c) 2010 "Cowboy" Ben Alman.
jQuery throttle / debounce는 [MIT 라이선스](http://opensource.org/licenses/MIT) 조건 하에 배포됩니다.

Minimal Mistakes는 [GreedyNav.js](https://github.com/lukejacksonn/GreedyNav)를 포함합니다.
Copyright (c) 2015 Luke Jackson.
GreedyNav.js는 [MIT 라이선스](http://opensource.org/licenses/MIT) 조건 하에 배포됩니다.

Minimal Mistakes는 [Jekyll Group-By-Array](https://github.com/mushishi78/jekyll-group-by-array)를 포함합니다.
Copyright (c) 2015 Max White <mushishi78@gmail.com>.
Jekyll Group-By-Array는 [MIT 라이선스](http://opensource.org/licenses/MIT) 조건 하에 배포됩니다.

Minimal Mistakes는 [@allejo의 Pure Liquid Jekyll Table of Contents](https://allejo.io/blog/a-jekyll-toc-in-liquid-only/)를 포함합니다.
Copyright (c) 2017 Vladimir Jimenez.
Pure Liquid Jekyll Table of Contents는 [MIT 라이선스](http://opensource.org/licenses/MIT) 조건 하에 배포됩니다.

Minimal Mistakes는 [Lunr](http://lunrjs.com)를 포함합니다.
Copyright (c) 2018 Oliver Nightingale.
Lunr는 [MIT 라이선스](http://opensource.org/licenses/MIT) 조건 하에 배포됩니다.

Minimal Mistakes는 [clipboard.js](https://clipboardjs.com/)를 포함합니다.
Copyright (c) 2021 Zeno Rocha.
Clipboard.js는 [MIT 라이선스](https://opensource.org/licenses/MIT) 조건 하에 배포됩니다.

## 로컬 실행 커멘드

bundle exec jekyll serve
