const Blogs = () => import('../components/blog/Blogs.vue')
const Blog = () => import('../components/blog/Blog.vue')
const NewBlog = () => import('../components/blog/New-Blog.vue')

export default [
  {
    path: '/blogs',
    name: 'blogs',
    component: Blogs
  },
  {
    path: '/blogs/:id',
    name: 'blog',
    component: Blog
  },
  {
    path: '/blog-new',
    name: 'new-blog',
    component: NewBlog
  }
]
