module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy('meta');
  eleventyConfig.addPassthroughCopy('opengraph');
  eleventyConfig.addPassthroughCopy('fonts');
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy({'atproto-did': '.well-known/atproto-did'});
  eleventyConfig.addPassthroughCopy({'atproto-standard-site': '.well-known/site.standard.publication'});

  eleventyConfig.addFilter('website', str => {
    const replaced = str
      .replaceAll('a website', `<span>a website</span>`)
      .replaceAll(' website ', ` <span>website</span> `)
      .replaceAll(' website,', ` <span>website</span>,`)
      .replaceAll(' websites ', ` <span>websites</span>`)
      .replaceAll(' websites,', ` <span>websites</span>,`)
      .replaceAll(' site ', ` <span>site</span> `)
      .replaceAll('computers', `<span>computers</span>`);
    return replaced;
  });
  eleventyConfig.addFilter('toUTCString', str => {
    return new Date(str).toUTCString();
  })
  eleventyConfig.addFilter('encodeURIComponent', str => {
    return encodeURIComponent(str);
  });
  return {
    htmlTemplateEngine: 'njk',
  };
};
