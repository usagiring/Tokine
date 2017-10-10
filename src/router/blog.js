import Blogs from '../components/Blogs.vue'
import Blog from '../components/Blog.vue'
import NewBlog from '../components/New-Blog.vue'

export default [
  {
    path: '/blog',
    name: 'blogs',
    component: Blogs
  },
  {
    path: '/blog/:title',
    name: 'blog',
    component: Blog
  },
  {
    path: '/blog/new',
    name: 'new-blog',
    component: NewBlog
  },
]
