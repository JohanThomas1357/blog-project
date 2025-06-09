package routes

import("github.com/go-chi/chi/v5"
"blog-server-using-clean-architecture/controllers"
"blog-server-using-clean-architecture/internal/middleware")

func UserRoutes(AuthController controllers.AuthControllerInterface,UserController controllers.UserControllerInterface)chi.Router{

	r:= chi.NewRouter()

	r.Post("/login",AuthController.Login)
	r.Post("/register",UserController.Register)

	
	r.Group(func(r chi.Router){
		r.Use(middleware.JWTAuth)
		r.Get("/{id}",UserController.GetUserByID)
		r.Get("/",UserController.GetAllUsers)
		r.Put("/{id}",UserController.UpdateUser)
		r.Delete("/{id}",UserController.DeleteUser)
	})
	return r
}

func PostRoutes(postController controllers.PostControllerInterface)chi.Router{
	r:= chi.NewRouter()


	
	r.Group(func(r chi.Router){
		r.Use(middleware.JWTAuth)
		r.Get("/",postController.GetAllPost)
		r.Get("/{id}",postController.GetPostByID)
		r.Post("/",postController.CreatePost)
		r.Put("/{id}",postController.UpdatePost)
		r.Delete("/{id}",postController.DeletePost)
	})


	return r
}