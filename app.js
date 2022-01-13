const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./modals/blog");

// express app
const app = express();

//mongodb connection
const connectDb = async () => {
  try {
    const mongo_Url = "mongodb://localhost:27017/node_tut";
    const conn = await mongoose.connect(mongo_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // listen for requests
    app.listen(3000);
    console.log(`MongoDb Connected : ${conn.connection.host}`);
  } catch (error) {
    console.error();
  }
};

connectDb();

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("new request made:");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("in the next middleware");
//   next();
// });

// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

//mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new creative blog",
//     snippet: "about my second blog",
//     body: "more about my new blog",
//   });

//   blog.save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get('/all-blogs',(req,res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get('/single-blog',(req,res) =>{
//   Blog.findById('61dc89bb6ff544eeaf6a802a')
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// })

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
  // just remove the dummy data and redirect the page to blogs where all the blogs can be found.
  // const blogs = [
  //   {
  //     title: "Yoshi finds eggs",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "Mario finds stars",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "How to defeat bowser",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  // ];
  // res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog route
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) //sorts the data fetched from the database in the decreasing order means latest at the top
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
