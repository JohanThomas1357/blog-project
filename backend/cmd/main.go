package main

import (
	"net/http"
	// "fmt"
	"blog-server-using-clean-architecture/controllers"
	"blog-server-using-clean-architecture/internal/routes"
	"blog-server-using-clean-architecture/repositories"
	"blog-server-using-clean-architecture/repositories/database"
	"blog-server-using-clean-architecture/usecases"
	"os"
	"blog-server-using-clean-architecture/internal/logger"
	"github.com/go-chi/cors"
	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)
func main(){
	//Access the environmental variables(loading and then accessing)
	//Database connection
	//Migration
	//Initialize the new router to recieve the routes
	//Implementing the Controllers
	//Implementing the Routes
	//start the server

	logger.InitLogger()

	zap:= logger.GetLogger()

	if err:= godotenv.Load();err!=nil{
		zap.Fatalf("Error in loading the environmental variables")
		return
	}

	//Database Connection and Migration
	db := database.Connect()

	database.Migrate(db)
	
	database.SeedDB(db)



	//Initializing the Router
	r:= chi.NewRouter()

	//Checking the route
	// r.Get("/",func(w http.ResponseWriter, r *http.Request){
	// 	fmt.Fprintf(w,"Hello World")
	// })

	// frontend_api := os.Getenv("FRONTEND_API")

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3001"}, // Allow frontend URL
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	//setting the Post Controller
	postRepo := &repositories.PostRepositoryDB{DB:db}
	postService := usecases.NewPostService(postRepo)
	postController := controllers.NewPostController(postService)

	//setting the user Controller
	userRepo := repositories.NewUserRepository(db)
	userService := usecases.NewUserService(userRepo)
	userController := controllers.NewUserController(userService)
	AuthController := controllers.NewAuthController(userService)

	//Setting the routes
	r.Mount("/posts",routes.PostRoutes(postController))
	r.Mount("/user",routes.UserRoutes(AuthController,userController))
	//Accessing the port
	port := os.Getenv("PORT")

	http.ListenAndServe(":"+port,r)
}