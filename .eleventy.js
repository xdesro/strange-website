module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy('meta');
  eleventyConfig.addPassthroughCopy('opengraph');
  eleventyConfig.addPassthroughCopy('fonts');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('css');

  eleventyConfig.addFilter('website', str => {
    const replaced = str
      .replaceAll('a website', `<span>a website</span>`)
      .replaceAll(' website ', ` <span>website</span> `)
      .replaceAll(' website,', ` <span>website</span>,`);
    return replaced;
  });
  eleventyConfig.addFilter('toISOString', str => {
    return new Date(str).toISOString();
  })
  eleventyConfig.addFilter('encodeURIComponent', str => {
    return encodeURIComponent(str);
  });
  return {
    htmlTemplateEngine: 'njk',
  };
};
