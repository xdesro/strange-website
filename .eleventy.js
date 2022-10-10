module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy('meta');
  eleventyConfig.addPassthroughCopy('opengraph');
  eleventyConfig.addPassthroughCopy('fonts');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('css');

  eleventyConfig.addFilter('website', str => {
    const replaced = str
      .replace('a website', `<span>a website</span>`)
      .replace(' website ', ` <span>website</span> `);
    return replaced;
  });
  eleventyConfig.addFilter('encodeURIComponent', str => {
    return encodeURIComponent(str);
  });
  return {
    htmlTemplateEngine: 'njk',
  };
};
