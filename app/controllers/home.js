
/*!
 * Module dependencies.
 */



exports.index = function (req, res) {
  res.render('home', {
    title: 'Node Express Mongoose Boilerplate'
  })
}

exports.comeback = function (req, res) {
	res.render('index');
}
