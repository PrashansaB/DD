const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://prashansabharti19:190602%40Pb@cluster0.iodbqku.mongodb.net/DeliciousDispatch?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log(`Connected to MongoDB at ${mongoose.connection.host}`);

    const fetchedData = await mongoose.connection.db
      .collection("Food_category")
      .find({})
      .toArray();

    // Initialize foodCategory inside the scope of fetched_data
    const foodCategory = await mongoose.connection.db
      .collection("Sample")
      .find({})
      .toArray();

    global.food_cat = foodCategory;
    global.food_items = fetchedData;
    console.log(food_cat, food_items);

    console.log("Data fetched successfully!!!!!.");
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
module.exports = mongoDB;
