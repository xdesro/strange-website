module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('fonts');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('*.css');
  eleventyConfig.addFilter('website', str => {
    return str.replace('a website', `<span>a website</span>`);
  });
  return {
    htmlTemplateEngine: 'njk',
  };
};
