package database

import(
	"gorm.io/gorm"
	"os"
	"blog-server-using-clean-architecture/internal/logger"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"blog-server-using-clean-architecture/internal/entities"
	"golang.org/x/crypto/bcrypt"
)

//Specifying the error using error.New("Any error")

func Connect()(*gorm.DB){
	zap:= logger.GetLogger()
	//Accessing the environmental variabls for dsn
	if err:= godotenv.Load();err!=nil{
		zap.Warnf("Error in accessing the environmental variables")
		return nil
	}

	dsn := os.Getenv("DSN")

	database,err := gorm.Open(postgres.Open(dsn),&gorm.Config{})

	if err!=nil{
		zap.Warnf("Error in connecting the database")
		return nil
	}

	zap.Debug("Successfully connected to the database")

	return database

}

func Migrate(db *gorm.DB){
	zap:= logger.GetLogger()
	if err:=db.AutoMigrate(&models.User{},&models.Post{});err!=nil{
		zap.Warnf("Error in migrating the database")
		return
	}

	zap.Debug("Successfully migrated to the database")
}

func SeedDB(DB *gorm.DB) {
    zap := logger.GetLogger()

    // Check if users table already has data
    var userCount int64
    DB.Model(&models.User{}).Count(&userCount)

    if userCount < 2 {
        zap.Debug("Seeding database with users and posts...")

        // Seed Users
        users := []models.User{
            {
                Name:         "user",
                Email:        "user@gmail.com",
                Password:     "admin@1234",
                Phone_Number: "1234567890",
                Bio:          "Software Engineer and tech enthusiast.",
            },
            {
                Name:         "John Doe",
                Email:        "john@example.com",
                Password:     "admin@1234",
                Phone_Number: "1234567890",
                Bio:          "Software Engineer and tech enthusiast.",
            },
            {
                Name:         "Jane Smith",
                Email:        "jane@example.com",
                Password:     "admin@1234",
                Phone_Number: "9876543210",
                Bio:          "Loves blogging about AI and ML.",
            },
            {
                Name:         "Alice Johnson",
                Email:        "alice@example.com",
                Password:     "admin@1234",
                Phone_Number: "4561237890",
                Bio:          "Passionate about web development and open-source.",
            },
            {
                Name:         "Bob Williams",
                Email:        "bob@example.com",
                Password:     "admin@1234",
                Phone_Number: "7894561230",
                Bio:          "A backend developer who enjoys working with databases.",
            },
            {
                Name:         "Emma Brown",
                Email:        "emma@example.com",
                Password:     "admin@1234",
                Phone_Number: "3217894560",
                Bio:          "Tech writer and cybersecurity enthusiast.",
            },
        }

        for i := range users {
            hashedPassword, err := bcrypt.GenerateFromPassword([]byte(users[i].Password), bcrypt.DefaultCost)
            if err != nil {
                zap.Warnf("Error hashing password for user %s", users[i].Email)
                continue
            }
            users[i].Password = string(hashedPassword) // Store hashed password
            if err := DB.Create(&users[i]).Error; err != nil {
                zap.Warnf("Error creating user %s: %v", users[i].Email, err)
            }
        }

        // Fetch all users to get their IDs
        var seededUsers []models.User
        DB.Find(&seededUsers)

        // Seed Posts
        posts := []models.Post{
            {Title: "Introduction to Go", Description: "A beginner-friendly guide to Go.", UserID: seededUsers[0].ID},
            {Title: "Understanding REST APIs", Description: "Building and consuming RESTful APIs.", UserID: seededUsers[0].ID},
            {Title: "Machine Learning Basics", Description: "Intro to ML and real-world applications.", UserID: seededUsers[1].ID},
            {Title: "Deep Learning vs ML", Description: "Comparing deep learning with traditional ML.", UserID: seededUsers[1].ID},
            {Title: "Building Scalable Web Apps", Description: "Best practices for scalable apps.", UserID: seededUsers[2].ID},
            {Title: "JavaScript vs TypeScript", Description: "Comparison for frontend dev.", UserID: seededUsers[2].ID},
            {Title: "Optimizing Database Queries", Description: "How to improve SQL performance.", UserID: seededUsers[3].ID},
            {Title: "Understanding NoSQL", Description: "When and why to use NoSQL databases.", UserID: seededUsers[3].ID},
            {Title: "Cybersecurity Fundamentals", Description: "Essential principles for developers.", UserID: seededUsers[4].ID},
            {Title: "Secure Authentication Best Practices", Description: "Implementing secure auth mechanisms.", UserID: seededUsers[4].ID},
        }

        for _, post := range posts {
            if err := DB.Create(&post).Error; err != nil {
                zap.Warnf("Error creating post: %v", err)
            }
        }

        zap.Debug("Database seeded successfully.")
    } else {
        zap.Debug("Database already seeded.")
    }
}
