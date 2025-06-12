import User from "../models/user.model.js";

export async function userData(req, res) {
  const { email, subscriptionType } = req.body;

  try {
    const user = new User({ email, subscriptionType });
    await user.save(); // Corrected to use the instance method
    res.status(200).send("Subscribed successfully!");
  } catch (error) {
    res.status(400).send(error.message);
  }
}