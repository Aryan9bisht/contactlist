const express = require('express');
const path = require('path');
const port = 8008;
const db = require('./config/mongoose');

const Contact = require('./models/contact');
const app = express();
app.set('view engine', 'ejs'); //sets value of view engines
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
//middleware1

// app.use(function(req, res, next) {
//         console.log("mid1 called");
//         next();
//     })
//     //mid2
// app.use(function(req, res, next) {
//     console.log("mid2 called");
//     next();
// })


var contactList = [{
        name: "Aryan",
        phone: "99999999",
    },
    {
        name: "bisht",
        phone: "111111111"
    },
    {
        name: "ninja",
        phone: "989898989"
    }
]
app.get('/', function(req, res) {
    Contact.find({}, function(err, contacts) {
        if (err) {
            console.log('error in fetching contacts from db');
            return;
        }

        return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        });


    });
});
app.get('/practice', function(req, res) {
    return res.render('practice', { title: "My  ejs practice" });
});

// app.post('/create-contact', function(req, res) {

//         // contactList.push({
//         //     name: req.body.name,
//         //     phone: req.body.phone
//         // });
//         Contact.create({
//             name: req.body.name,
//             phone: req.body.phone
//         }, function(err, newContact) {
//             if (err) {
//                 console.log('error in creating contact');
//                 return;
//             }
//             console.log('********', newContact);
//             return res.redirect('back');
//         })
//         return res.redirect('back');
//         // contactList.push(req.body);
//         // return res.redirect('/');
//         // contactList.pu({
//         //             name: req.body.name,
//         //             phone: req.body.phone,
//         //         },
//         //         function(err, contactList) {
//         //             if (err) {
//         //                 console.log("error in creating contact");
//         //                 return;
//         //             }
//     })
app.post('/create-contact', function(req, res) {
        Contact.create({
                name: req.body.name,
                phone: req.body.phone
            }, function(err, newContact) {
                if (err) {
                    console.log('Error in creating a contact!')
                    return;
                }
                console.log('******', newContact);
                return res.redirect('back');
            })
            // return res.redirect('back');
    })
    // app.post("/create-contact", function(req, res) {
    //     // contactList.push({
    //     //   name: req.body.name,
    //     //   phone: req.body.phone,
    //     // });
    //     // console.log(req.body);
    //     // contactList.push(req.body);

//     contactList.push({
//             name: req.body.name,
//             phone: req.body.phone,
//         },
//         function(err, contact_list) {
//             if (err) {
//                 console.log("error in creating contact");
//                 return;
//             }
//             console.log("**********", contact_list);
//             return res.redirect("back");
//         }
//     );
//     // return res.redirect("back");
// });


app.get('/delete-contact', function(req, res) {
    console.log(req.params);
    let id = req.query.id;
    Contact.findOneAndDelete(id, function(err) {
        if (err) {
            console.log("error in deleting the object");
            return;
        }
    })
    return res.redirect('back');
});
app.listen(port, function(err) {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})