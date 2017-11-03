const Blogs = () => import('../components/Blogs.vue')
const Blog = () => import('../components/Blog.vue')
const NewBlog = () => import('../components/New-Blog.vue')

// import NewBlog from '../components/New-Blog.vue'

export default [
  {
    path: '/blogs',
    name: 'blogs',
    component: Blogs
  },
  {
    path: '/blog/:id',
    name: 'blog',
    component: Blog
  },
  {
    path: '/blog-new',
    name: 'new-blog',
    component: NewBlog
  }
]
