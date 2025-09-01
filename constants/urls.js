export const WIX_ENDPOINTS = {
  baseURL: 'https://www.blog.matchspace-music.ch/',
  getAllPosts() {
    return `${this.baseURL}_functions/allPosts`;
  },
  getPostsByLangAndCat() {
    return `${this.baseURL}_functions/postsByLanguageAndCategory`;
  },
  getPostsByLang() {
    return `${this.baseURL}_functions/postsByLanguage`;
  },
  getPostsByTagName() {
    return `${this.baseURL}_functions/postsByTagName`;
  },
  getPostsByTagNames() {
    return `${this.baseURL}_functions/postsByTagNames`;
  }
};
