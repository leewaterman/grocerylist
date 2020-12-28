var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },

  // Components
  {
    path: '/checkbox/',
    componentUrl: './pages/checkbox.html',
  },
  {
    path: '/data-table/',
    componentUrl: './pages/data-table.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
