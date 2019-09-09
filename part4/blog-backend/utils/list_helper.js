// Fullstack Open 2019 - Part 4
// Alfonso Gutierrez

const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce( (sum, current) => sum + current.likes, 0 ) 
}

const favoriteBlog = (blogs) => {
    const arr = blogs.map(item => item.likes)

    return blogs.find( item => item.likes === Math.max(...arr) )
}

const mostBlogs = (blogs) => {
    const authorsNumBlogs = _.countBy(blogs,'author')
    const blogsMaxCount = _(authorsNumBlogs).values().max()
    const authorMaxFilter = _.max( Object.keys(authorsNumBlogs), o => obj[0] )

    return { 'author': authorMaxFilter, 'blogs': blogsMaxCount }
}

const mostLikes = (blogs) => {
    const arr = blogs.map( item => [item.author, item.likes] )

    const obj = arr.map(item => {
        return { 'author': item[0], 'likes': item[1] }
    })

    const withMostLikes = _.chain(obj)
        .groupBy('author')
        .map((item, authors) => {
            return { 'author': authors, 'likes': _.sumBy(item, 'likes') }
        })
        .orderBy('likes', 'desc')
        .head()
        .value()
        
    return withMostLikes
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }