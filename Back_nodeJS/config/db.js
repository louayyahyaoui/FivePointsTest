const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://louay:louay123@vote.h2e83.mongodb.net/Vote?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeded");
    } else {
      console.log("Error in DB conncection: " + err);
    }
  }
);


