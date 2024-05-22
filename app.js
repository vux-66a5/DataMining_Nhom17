// Loading and Using Modules Required
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
const fs = require('fs');

// Initialize Express App
const app = express();

// Set View Engine and Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// Database Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "foodorderingwesitedb",
});
connection.connect();

/*****************************  User-End Portal ***************************/

// Routes for User Sign-up, Sign-in, Home Page, Cart, Checkout, Order Confirmation, My Orders, and Settings
app.get("/", renderIndexPage);
app.get("/signup", renderSignUpPage);
app.post("/signup", signUpUser);
app.get("/signin", renderSignInPage);
app.post("/signin", signInUser);
app.get("/homepage", renderHomePage);
app.get("/cart", renderCart);
app.post("/cart", updateCart);
app.post("/checkout", checkout);
app.get("/confirmation", renderConfirmationPage);
app.get("/myorders", renderMyOrdersPage);
app.get("/settings", renderSettingsPage);
app.post("/address", updateAddress);
app.post("/contact", updateContact);
app.post("/password", updatePassword);

/***************************************** Admin End Portal ********************************************/
// Routes for Admin Sign-in, Admin Homepage, Adding Food, Viewing and Dispatching Orders, Changing Price, and Logout
app.get("/admin_signin", renderAdminSignInPage);
app.post("/admin_signin", adminSignIn);
app.get("/adminHomepage", renderAdminHomepage);
app.get("/admin_addFood", renderAddFoodPage);
app.post("/admin_addFood", addFood);
app.get("/admin_view_dispatch_orders", renderViewDispatchOrdersPage);
app.post("/admin_view_dispatch_orders", dispatchOrders);
app.get("/admin_change_price", renderChangePricePage);
app.post("/admin_change_price", changePrice);
app.get("/admin_dashboard", renderDashboardPage);
app.get("/logout", logout);

/***************************** Route Handlers ***************************/

// Index Page
function renderIndexPage(req, res) {
  res.render("index");
}

// User Sign-up
function renderSignUpPage(req, res) {
  res.render("signup");
}

function signUpUser(req, res) {
  const { name, address, email, mobile, password } = req.body;
  connection.query(
    "INSERT INTO users (user_name, user_address, user_email, user_password, user_mobileno) VALUES (?, ?, ?, ?, ?)",
    [name, address, email, password, mobile],
    function (error, results) {
      if (error) {
        console.log(error);
      } else {
        res.render("signin");
      }
    }
  );
}

// User Sign-in

function renderSignInPage(req, res) {
  res.render("signin");
}

function signInUser(req, res) {
  const { email, password } = req.body;
  connection.query(
    "SELECT user_id, user_name, user_email, user_password FROM users WHERE user_email = ?",
    [email],
    function (error, results) {
      if (error || !results.length || results[0].user_password !== password) {
        res.render("signin");
      } else {
        const { user_id, user_name } = results[0];
        res.cookie("cookuid", user_id);
        res.cookie("cookuname", user_name);
        res.redirect("/homepage");
      }
    }
  );
}

// Render Home Page
function renderHomePage(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  connection.query(
    "SELECT user_id, user_name FROM users WHERE user_id = ? AND user_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        connection.query("SELECT * FROM menu", function (error, results) {
          if (!error) {
            res.render("homepage", {
              username: userName,
              userid: userId,
              items: results,
            });
          }
        });
      } else {
        res.render("signin");
      }
    }
  );
}

// Render Cart Page
// function renderCart(req, res) {
//   const userId = req.cookies.cookuid;
//   const userName = req.cookies.cookuname;
//   const recommendedProducts = recommendProducts(updatedItemIds);
//   console.log(recommendedProducts);
//   connection.query(
//     "SELECT user_id, user_name FROM users WHERE user_id = ? AND user_name = ?",
//     [userId, userName],
//     function (error, results) {
//       if (!error && results.length) {
//         res.render("cart", {
//           username: userName,
//           userid: userId,
//           items: citemdetails,
//           item_count: item_in_cart,
//           recommendedProducts: recommendedProducts,
//         });
//       } else {
//         res.render("signin");
//       }
//     }
//   );
// }
function renderCart(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  const recommendedProducts = recommendProducts(updatedItemIds);

  console.log("recommendedProducts",recommendedProducts);
  connection.query(
    "SELECT user_id, user_name FROM users WHERE user_id = ? AND user_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        // Tạo một mảng chứa các promise của các truy vấn cơ sở dữ liệu để lấy thông tin sản phẩm
        const productQueries = recommendedProducts.map(product => {
          return new Promise((resolve, reject) => {
            connection.query(
              "SELECT * FROM menu WHERE item_id = ?",
              [product.productId],
              function (error, productInfo) {
                if (!error && productInfo.length) {
                  resolve(productInfo[0]);
                } else {
                  resolve(null);
                }
              }
            );
          });
        });

        // Sử dụng Promise.all để đợi tất cả các truy vấn cơ sở dữ liệu hoàn thành
        Promise.all(productQueries).then(productInfos => {
          res.render("cart", {
            username: userName,
            userid: userId,
            items: citemdetails,
            item_count: item_in_cart,
            recommendedProducts: recommendedProducts,
            productInfos: productInfos // Mảng chứa thông tin của các sản phẩm
          });
        });
      } else {
        res.render("signin");
      }
    }
  );
}

// Khai báo một mảng để lưu trữ ID của các sản phẩm đã được cập nhật
// Khai báo một mảng để lưu trữ ID của các sản phẩm đã được cập nhật
let updatedItemIds = [];

function updateCart(req, res) {
  const cartItems = req.body.cart;
  const uniqueItems = [...new Set(cartItems)];

  // Thêm các ID mới vào mảng updatedItemIds
  uniqueItems.forEach(item => {
    if (!updatedItemIds.includes(item)) {
      updatedItemIds.push(item);
    }
  });

  // Function to fetch details of items in the cart
  getItemDetails(uniqueItems, uniqueItems.length);

  // Console.log để hiển thị mảng updatedItemIds
  console.log("Updated Item IDs:", updatedItemIds);

  // Update cart logic if necessary
}


// // Tạo một hàm để đề xuất sản phẩm dựa trên các ID sản phẩm đã được cập nhật
// function recommendProducts(updatedItemIds) {
//   // Giả sử rằng bạn đã có dữ liệu của các luật kết hợp từ thuật toán Apriori
//   // Trong ví dụ này, dữ liệu được đại diện bằng một mảng các đối tượng, mỗi đối tượng có các trường itemSet và confidence
//   const associationRules = [
//     { itemSet: [1, 2], confidence: 0.8 },
//     { itemSet: [2, 3], confidence: 0.6 },
//     { itemSet: [20,21], confidence: 0.6}
//     // Thêm các luật kết hợp khác nếu cần thiết
//   ];
//
//   // Tạo một đối tượng để lưu trữ các sản phẩm được đề xuất và mức độ tin cậy của chúng
//   const recommendedProducts = {};
//
//   // Duyệt qua từng luật kết hợp
//   associationRules.forEach(rule => {
//     // Kiểm tra xem luật có chứa ít nhất một sản phẩm đã được cập nhật không
//     if (rule.itemSet.some(item => updatedItemIds.includes(item))) {
//       // Duyệt qua từng sản phẩm trong luật kết hợp
//       rule.itemSet.forEach(item => {
//         // Kiểm tra xem sản phẩm đã được cập nhật và không được đề xuất trước đó
//         if (!updatedItemIds.includes(item) && !recommendedProducts[item]) {
//           // Thêm sản phẩm vào danh sách đề xuất với mức độ tin cậy tương ứng
//           recommendedProducts[item] = rule.confidence;
//         }
//       });
//     }
//   });
//
//   // Sắp xếp các sản phẩm theo mức độ tin cậy giảm dần
//   const sortedRecommendedProducts = Object.entries(recommendedProducts)
//     .sort((a, b) => b[1] - a[1])
//     .map(([productId, confidence]) => ({
//       productId: parseInt(productId),
//       confidence: confidence
//     }));
//
//   return sortedRecommendedProducts;
// }

// Sử dụng hàm recommendProducts để đề xuất sản phẩm dựa trên mảng updatedItemIds
function recommendProducts(updatedItemIds) {
    // Đọc dữ liệu từ file rules.json
    const data = fs.readFileSync('data/mcdonald/rules.json');

    // Chuyển đổi dữ liệu JSON sang đối tượng JavaScript
    const rules = JSON.parse(data);

    const recommendedProducts = {};

    // Duyệt qua từng luật kết hợp
    rules.forEach(rule => {
      const antecedents = rule.antecedents.map(Number);
      const consequents = rule.consequents.map(Number);

      // Kiểm tra xem antecedents có chứa ít nhất một sản phẩm đã được cập nhật không
      if (antecedents.some(item => updatedItemIds.includes(item))) {
        // Kiểm tra consequents
        consequents.forEach(item => {
          if (!updatedItemIds.includes(item) && !recommendedProducts[item]) {
            // Thêm sản phẩm vào danh sách đề xuất với mức độ tin cậy tương ứng
            recommendedProducts[item] = rule.confidence;
          }
        });
      }
    });

    // Sắp xếp các sản phẩm theo mức độ tin cậy giảm dần
    const sortedRecommendedProducts = Object.entries(recommendedProducts)
      .sort((a, b) => b[1] - a[1])
      .map(([productId, confidence]) => ({
        productId: parseInt(productId),
        confidence: confidence
      }));

    return sortedRecommendedProducts;
}


// Function to fetch details of items in the cart
let citems = [];
let citemdetails = [];
let item_in_cart = 0;
function getItemDetails(citems, size) {
  citems.forEach((item) => {
    connection.query(
      "SELECT * FROM menu WHERE item_id = ?",
      [item],
      function (error, results_item) {
        if (!error && results_item.length) {
          citemdetails.push(results_item[0]);
        }
      }
    );
  });
  item_in_cart = size;
}


// Checkout
function checkout(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  connection.query(
    "SELECT user_id, user_name FROM users WHERE user_id = ? AND user_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        const { itemid, quantity, subprice } = req.body;
        const userid = userId;
        const currDate = new Date();

        if (
          Array.isArray(itemid) &&
          Array.isArray(quantity) &&
          Array.isArray(subprice)
        ) {
          itemid.forEach((item, index) => {
            if (quantity[index] != 0) {
              connection.query(
                "INSERT INTO orders (order_id, user_id, item_id, quantity, price, order_time) VALUES (?, ?, ?, ?, ?, ?)",
                [
                  uuidv4(),
                  userid,
                  item,
                  quantity[index],
                  subprice[index] * quantity[index],
                  currDate,
                ],
                function (error, results, fields) {
                  if (error) {
                    console.log(error);
                    res.sendStatus(500);
                  }
                }
              );
            }
          });
        } else {
          if (quantity != 0) {
            connection.query(
              "INSERT INTO orders (order_id, user_id, item_id, quantity, price, order_time) VALUES (?, ?, ?, ?, ?, ?)",
              [
                uuidv4(),
                userid,
                itemid,
                quantity,
                subprice * quantity,
                currDate,
              ],
              function (error, results, fields) {
                if (error) {
                  console.log(error);
                  res.sendStatus(500);
                }
              }
            );
          }
        }

        citems = [];
        citemdetails = [];
        item_in_cart = 0;
        updatedItemIds = [];
        getItemDetails(citems, 0);
        res.render("confirmation", { username: userName, userid: userId });
      } else {
        res.render("signin");
      }
    }
  );
}

// Render Confirmation Page
function renderConfirmationPage(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  connection.query(
    "SELECT user_id, user_name FROM users WHERE user_id = ? AND user_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        res.render("confirmation", { username: userName, userid: userId });
      } else {
        res.render("signin");
      }
    }
  );
}

// Render My Orders Page
function renderMyOrdersPage(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  connection.query(
    "SELECT user_id, user_name, user_address, user_email, user_mobileno FROM users WHERE user_id = ? AND user_name = ?",
    [userId, userName],
    function (error, resultUser) {
      if (!error && resultUser.length) {
        connection.query(
          "SELECT order_dispatch.order_id, order_dispatch.user_id, order_dispatch.quantity, order_dispatch.price, order_dispatch.done_time, menu.item_id, menu.item_name, menu.item_img FROM order_dispatch, menu WHERE order_dispatch.user_id = ? AND menu.item_id = order_dispatch.item_id ORDER BY order_dispatch.done_time DESC",
          [userId],
          function (error, results) {
            if (!error) {
              res.render("myorders", {
                userDetails: resultUser,
                items: results,
                item_count: item_in_cart,
              });
            }
          }
        );
      } else {
        res.render("signin");
      }
    }
  );
}

// Render Settings Page
function renderSettingsPage(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  connection.query(
    "SELECT user_id, user_name FROM users WHERE user_id = ? AND user_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        res.render("settings", {
          username: userName,
          userid: userId,
          item_count: item_in_cart,
        });
      }
    }
  );
}
// Update Address
function updateAddress(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  const address = req.body.address;
  connection.query(
    "SELECT user_id, user_name FROM users WHERE user_id = ? AND user_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        connection.query(
          "UPDATE users SET user_address = ? WHERE user_id = ?",
          [address, userId],
          function (error, results) {
            if (!error) {
              res.render("settings", {
                username: userName,
                userid: userId,
                item_count: item_in_cart,
              });
            }
          }
        );
      } else {
        res.render("signin");
      }
    }
  );
}

// Update Contact
function updateContact(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  const mobileno = req.body.mobileno;
  connection.query(
    "SELECT user_id, user_name FROM users WHERE user_id = ? AND user_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        connection.query(
          "UPDATE users SET user_mobileno = ? WHERE user_id = ?",
          [mobileno, userId],
          function (error, results) {
            if (!error) {
              res.render("settings", {
                username: userName,
                userid: userId,
                item_count: item_in_cart,
              });
            }
          }
        );
      } else {
        res.render("signin");
      }
    }
  );
}

// Update Password
function updatePassword(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  const oldPassword = req.body.old_password;
  const newPassword = req.body.new_password;
  connection.query(
    "SELECT user_id, user_name FROM users WHERE user_id = ? AND user_name = ? AND user_password = ?",
    [userId, userName, oldPassword],
    function (error, results) {
      if (!error && results.length) {
        connection.query(
          "UPDATE users SET user_password = ? WHERE user_id = ?",
          [newPassword, userId],
          function (error, results) {
            if (!error) {
              res.render("settings", {
                username: userName,
                userid: userId,
                item_count: item_in_cart,
              });
            }
          }
        );
      } else {
        res.render("signin");
      }
    }
  );
}

// Admin Homepage

function renderAdminHomepage(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  connection.query(
    "SELECT admin_id, admin_name FROM admin WHERE admin_email = ? and admin_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        res.render("adminHomepage", {
          username: userName,
          userid: userId,
          items: results,
        });
      } else {
        res.render("admin_signin");
      }
    }
  );
}

// Admin Sign-in

function renderAdminSignInPage(req, res) {
  res.render("admin_signin");
}

function adminSignIn(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  connection.query(
    "SELECT admin_id, admin_name FROM admin WHERE admin_email = ? AND admin_password = ?",
    [email, password],
    function (error, results) {
      if (error || !results.length) {
        res.render("/admin_signin");
      } else {
        const { admin_id, admin_name } = results[0];
        res.cookie("cookuid", admin_id);
        res.cookie("cookuname", admin_name);
        res.render("adminHomepage");
      }
    }
  );
}

// Render Add Food Page
function renderAddFoodPage(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  connection.query(
    "SELECT admin_id, admin_name FROM admin WHERE admin_id = ? and admin_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        res.render("admin_addFood", {
          username: userName,
          userid: userId,
          items: results,
        });
      } else {
        res.render("admin_signin");
      }
    }
  );
}

// Add Food
function addFood(req, res) {
  const {
    FoodName,
    FoodCategory,
    FoodPrice
  } = req.body;
  if (!req.files) {
    return res.status(400).send("Image was not uploaded");
  }
  const fimage = req.files.FoodImg;
  const fimage_name = fimage.name;
  if (fimage.mimetype == "image/jpeg" || fimage.mimetype == "image/png") {
    fimage.mv("public/images/dish/" + fimage_name, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      connection.query(
        "INSERT INTO menu (item_name, item_category, item_price, item_img) VALUES (?, ?, ?, ?)",
        [
          FoodName,
          FoodCategory,
          FoodPrice,
          fimage_name
        ],
        function (error, results) {
          if (error) {
            console.log(error);
          } else {
            res.redirect("/admin_addFood");
          }
        }
      );
    });
  } else {
    res.render("admin_addFood");
  }
}

// Render Admin View and Dispatch Orders Page
function renderViewDispatchOrdersPage(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
connection.query(
  "SELECT o.order_id, o.user_id, m.item_name, o.quantity, o.price, o.order_time FROM orders o JOIN menu m ON o.item_id = m.item_id ORDER BY o.order_time",
  function (error, results2) {
    if (!error) {
      res.render("admin_view_dispatch_orders", {
        username: userName,
        userid: userId,
        orders: results2,
      });
    } else {
      console.error("Error fetching orders:", error);
      res.render("admin_signin");
    }
  }
);
}

// Dispatch Orders
function dispatchOrders(req, res) {
  totalOrder = req.body.order_id_s;
  const unique = [...new Set(totalOrder)];
  unique.forEach((orderId) => {
    connection.query(
      "SELECT * FROM orders WHERE order_id = ?",
      [orderId],
      function (error, resultsItem) {
        if (!error && resultsItem.length) {
          const currDate = new Date();
          connection.query(
            "INSERT INTO order_dispatch (order_id, user_id, item_id, quantity, price, done_time) VALUES (?, ?, ?, ?, ?, ?)",
            [
              resultsItem[0].order_id,
              resultsItem[0].user_id,
              resultsItem[0].item_id,
              resultsItem[0].quantity,
              resultsItem[0].price,
              currDate,
            ],
            function (error, results) {
              if (!error) {
                connection.query(
                  "DELETE FROM orders WHERE order_id = ?",
                  [resultsItem[0].order_id],
                  function (error, results2) {
                    if (error) {
                      res.status(500).send("Something went wrong");
                    }
                  }
                );
              } else {
                res.status(500).send("Something went wrong");
              }
            }
          );
        } else {
          res.status(500).send("Something went wrong");
        }
      }
    );
  });
  connection.query(
    "SELECT * FROM orders ORDER BY order_time",
    function (error, results2_dis) {
      res.render("admin_view_dispatch_orders", {
        username: req.cookies.cookuname,
        orders: results2_dis,
      });
    }
  );
}

// Render Admin Change Price Page
// Render Admin Change Price Page
function renderChangePricePage(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  connection.query(
    "SELECT admin_id, admin_name FROM admin WHERE admin_id = ? and admin_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        connection.query("SELECT * FROM menu", function (error, results) {
          if (!error) {
            res.render("admin_change_price", {
              username: userName,
              items: results,
            });
          }
        });
      } else {
        res.render("signin");
      }
    }
  );
}

// Change Price
function changePrice(req, res) {
  const item_name = req.body.item_name;
  const new_food_price = req.body.NewFoodPrice;
  connection.query(
    "SELECT item_name FROM menu WHERE item_name = ?",
    [item_name],
    function (error, results1) {
      if (!error && results1.length) {
        connection.query(
          "UPDATE menu SET item_price = ? WHERE item_name = ?",
          [new_food_price, item_name],
          function (error, results2) {
            if (!error) {
              res.render("adminHomepage");
            } else {
              res.status(500).send("Something went wrong");
            }
          }
        );
      } else {
        res.status(500).send("Something went wrong");
      }
    }
  );
}

function renderDashboardPage(req, res) {
  const userId = req.cookies.cookuid;
  const userName = req.cookies.cookuname;
  connection.query(
    "SELECT admin_id, admin_name FROM admin WHERE admin_id = ? and admin_name = ?",
    [userId, userName],
    function (error, results) {
      if (!error && results.length) {
        connection.query(
          "SELECT SUM(quantity * price) AS total_revenue FROM order_dispatch",
          function (error2, results2) {
            if (!error2) {
              connection.query(
                "SELECT menu.item_name, SUM(order_dispatch.quantity) AS total_quantity, RANK() OVER (ORDER BY SUM(order_dispatch.quantity) DESC) AS rank FROM order_dispatch JOIN menu ON order_dispatch.item_id = menu.item_id GROUP BY menu.item_name ORDER BY total_quantity DESC;",
                function (error3, results3) {
                  if (!error3) {
                    res.render("admin_dashboard", {
                      username: userName,
                      not_items: results2[0].total_revenue,
                      rank: results3
                    });
                  }
                }
              )

            }
        });
      } else {
        res.render("signin");
      }
    }
  );
}

// Logout
function logout(req, res) {
  res.clearCookie();
  return res.redirect("/signin");
}

module.exports = app;
