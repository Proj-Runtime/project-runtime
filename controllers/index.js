/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

exports.home = function(req, res, next) {
    res.render('index', { title: 'Home' });
};
