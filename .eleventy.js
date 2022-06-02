module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addFilter('website', str => {
        return str.replace('a website', `<span>a website</span>`)
    })
    return {
        htmlTemplateEngine: "njk"
    }
}
