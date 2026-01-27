import "dotenv/config";
import connectDB from "../config/index.js";
import Class from "../modules/class/class.model.js";
import {
  Banner,
  Blog,
  Feedback,
  Health,
  Membership,
  TopYoga,
} from "../modules/content/content.models.js";
import User from "../modules/user/user.model.js";

// Simple random data generators
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedData = async () => {
  try {
    await connectDB();
    console.log("Database connected...");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Class.deleteMany({}),
      Banner.deleteMany({}),
      Blog.deleteMany({}),
      Feedback.deleteMany({}),
      Health.deleteMany({}),
      Membership.deleteMany({}),
      TopYoga.deleteMany({}),
    ]);
    console.log("Cleared existing data...");

    // 1. Seed Users
    const users = [];
    for (let i = 1; i <= 10; i++) {
      const role = i === 1 ? "admin" : i <= 4 ? "instructor" : "student";
      users.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: role,
        photoURL: `https://i.pravatar.cc/150?u=${i}`,
      });
    }
    const createdUsers = await User.insertMany(users);
    console.log(`Seeded ${createdUsers.length} users`);

    // 2. Seed Classes
    const classes = [];
    const categories = ["Hatha", "Vinyasa", "Kundalini", "Ashtanga", "Iyengar"];
    const instructors = createdUsers.filter((u) => u.role === "instructor");

    if (instructors.length > 0) {
      for (let i = 1; i <= 15; i++) {
        const instructor = randomElement(instructors);
        classes.push({
          name: `${randomElement(categories)} Yoga Class ${i}`,
          email: instructor.email,
          instructorName: instructor.name,
          image: `https://picsum.photos/seed/class${i}/400/300`,
          availableSite: randomInt(5, 20),
          enroll: randomInt(0, 50),
          price: randomInt(20, 100),
          status: randomElement(["pending", "approved", "denied"]),
          categoryName: randomElement(categories),
          description:
            "A rejuvenating yoga session to balance your mind and body.",
          feedback: [],
        });
      }
    }
    const createdClasses = await Class.insertMany(classes);
    console.log(`Seeded ${createdClasses.length} classes`);

    // 3. Seed Content
    await Banner.create({
      title: "Welcome to Serene Soul",
      description: "Find your inner peace with our expert instructors.",
      image: "https://picsum.photos/seed/banner1/1200/400",
      isActive: true,
    });

    await Blog.create({
      title: "Benefits of Morning Yoga",
      content: "Morning yoga boosts your metabolism and clears your mind...",
      image: "https://picsum.photos/seed/blog1/400/300",
      author: "Jane Doe",
      category: "Lifestyle",
      tags: ["Health", "Yoga", "Morning"],
    });

    console.log("Seeded content (Banners, Blogs, etc.)");

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
