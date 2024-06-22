import { Router } from "express";
import { body, header } from "express-validator";
import controller, { validate, fetchUserByEmailOrID } from "./controller.js";
import DB from "./dbConnection.js";
// import multer from "multer";
// Initialize router
const routes = Router({ strict: true });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "public/images");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// Token Validation Rule
const tokenValidation = (isRefresh = false) => {
  // Define token type based on the flag
  let refreshText = isRefresh ? "Refresh" : "Authorization";

  return [
    // Validate the presence and format of the token
    header("Authorization", `Please provide your ${refreshText} token`)
      .exists()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        // Check if token starts with 'Bearer' and has content
        if (!value.startsWith("Bearer") || !value.split(" ")[1]) {
          throw new Error(`Invalid ${refreshText} token`);
        }
        // Store token in request headers based on its type
        if (isRefresh) {
          req.headers.refresh_token = value.split(" ")[1];
          return true;
        }
        req.headers.access_token = value.split(" ")[1];
        return true;
      }),
  ];
};
// routes.post(
//   "/upload",
//   upload.single("image"),
//   validate,
//   // tokenValidation,
//   (req, res) => {
//     res.status(201).json({
//       data: req?.file?.filename || req.body.image,
//     });
//   }
// );

// Route for user registration
routes.post(
  "/signup",
  [
    // Validation for user name
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name must not be empty.")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .escape(),
    // Validation for email and check if it's already registered
    body("email", "Invalid email address.")
      .trim()
      .isEmail()
      .custom(async (email) => {
        const isExist = await fetchUserByEmailOrID(email);
        if (isExist.length)
          throw new Error("A user already exists with this e-mail address");
        return true;
      }),
    // Validation for password length
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
  ],
  validate, // Middleware to handle validation errors
  controller.signup // Controller function for signup
);

// Route for user login
routes.post(
  "/login",
  [
    // Validation for email and check if it's registered
    body("email", "Invalid email address.")
      .trim()
      .isEmail()
      .custom(async (email, { req }) => {
        const isExist = await fetchUserByEmailOrID(email);
        if (isExist.length === 0)
          throw new Error("Your email is not registered.");
        req.body.user = isExist[0];
        return true;
      }),
    // Validation for password length
    body("password", "Incorrect Password").trim().isLength({ min: 4 }),
  ],
  validate, // Middleware to handle validation errors
  controller.login // Controller function for login
);

// Route to get user data by providing the access token
// routes.get("/profile", tokenValidation(), validate, controller.getUser);

// Route to get new access and refresh token by providing the refresh token
routes.get(
  "/refresh",
  tokenValidation(true), // Validate refresh token
  validate, // Middleware to handle validation errors
  controller.refreshToken // Controller function for refreshing token
);

routes.get("/team", tokenValidation(), async (req, res) => {
  try {
    const [teamUsers] = await DB.execute(
      "SELECT id,fullname, position, image FROM team"
    );
    res.status(201).json({
      teamUsers: teamUsers,
    });
  } catch (err) {
    next(err);
  }
});

routes.post(
  "/new-team-member",
  [
    // Validation for user name
    body("fullname").not().isEmpty().withMessage("Full name must not be empty"),

    // Validation for password length
    body("position").not().isEmpty().withMessage("Position must not be empty"),
  ],
  // tokenValidation(),
  validate, // Middleware to handle validation errors
  (req, res) => {
    try {
      const { fullname, position, url } = req.body;
      DB.execute(
        "INSERT INTO `team` (`fullname`,`position`,`image`) VALUES (?,?,?)",
        [fullname, position, url]
      );
      res.status(201).json({
        message: "Product has been created successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }
);
routes.put(
  "/edit-team-member",
  [
    // Validation for user name
    body("fullname").not().isEmpty().withMessage("Full name must not be empty"),

    // Validation for password length
    body("position").not().isEmpty().withMessage("Position must not be empty"),
  ],
  // tokenValidation(),
  validate, // Middleware to handle validation errors
  (req, res) => {
    try {
      const { fullname, position, url, id } = req.body;

      DB.execute(
        "UPDATE `team` SET `fullname` = ?, `position` = ?, `image` = ? WHERE `id` = ?",
        [fullname, position, url, id]
      );
      res.status(201).json({
        message: "Updated successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }
);

routes.delete("/delete-team-member/:id", (req, res) => {
  try {
    const id = req.params.id;
    DB.execute("DELETE FROM `team` WHERE `id` = ?", [id]);
    res.status(201).json({
      message: "Team member deleted successfully",
    });
  } catch {
    console.log(err);
  }
});

export default routes;
