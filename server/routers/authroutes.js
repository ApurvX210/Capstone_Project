const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const createToken = (_id) => {
	return jwt.sign({ _id }, 'Team210', { expiresIn: '1h' });
}
router.get("/login/success", (req, res) => {
	console.log("hello")
	if (req.user) {
		const token = createToken(req.user._id);
		const username = req.user.username;
		res.status(200).json({ username, token ,username});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:3000",
		failureRedirect: "/login/failed",
	})
);

// router.get("/logout", (req, res) => {
// 	req.logout();
// 	res.redirect("http://localhost:3000/login");
// });
router.get("/logout", (req, res) => {
	req.logout(req.user, err => {
	  if(err) return next(err);
	  res.redirect("http://localhost:3000/login");
	});
  });

module.exports = router;
// ,
//     function(req, res) {
//         try {
//             const token=createToken(req.user._id);
//             const username=user.username;
//             res.status(200).json({username,token});
//             res.redirect('/');
//         } catch (error) {
//             res.status(400).json({error: error.message});
//         }
//     }