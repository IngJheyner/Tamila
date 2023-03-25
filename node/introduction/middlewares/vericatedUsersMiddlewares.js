module.exports = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }
  request.flash('css', 'warning');
  request.flash('message', [{msg: 'Debe estar logueado para acceder a esta sección'}]);
  return response.redirect('/users/login');
};