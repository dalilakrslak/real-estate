const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24", "root", "password", {
   host: "localhost",
   dialect: "mysql"
});

const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.korisnik = require(__dirname+'/korisnik.js') (sequelize);
db.upit = require(__dirname+'/upit.js') (sequelize);
db.nekretnina = require(__dirname+'/nekretnina.js') (sequelize);

db.korisnik.hasMany(db.upit,{as:'upitKorisnik'});
db.nekretnina.hasMany(db.upit,{as:'upitNekretnina'});

module.exports=db;