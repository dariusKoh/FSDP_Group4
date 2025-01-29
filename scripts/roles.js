// roles.js
const roles = {
    admin: ['create-project', 'view-all-projects', 'delete-project'],
    user: ['create-project'],
  };
  
  const permissions = {
    'create-project': ['admin', 'user'],
    'view-all-projects': ['admin'],
    'delete-project': ['admin'],
  };
  
  module.exports = { roles, permissions };