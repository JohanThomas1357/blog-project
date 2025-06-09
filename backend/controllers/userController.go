package controllers

import (
	"blog-server-using-clean-architecture/internal/entities"
	"blog-server-using-clean-architecture/internal/packets"
	"blog-server-using-clean-architecture/usecases"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type UserControllerInterface interface{
	Register(w http.ResponseWriter,r *http.Request)
	GetAllUsers(w http.ResponseWriter,r *http.Request)
	GetUserByID(w http.ResponseWriter,r *http.Request)
	UpdateUser(w http.ResponseWriter,r *http.Request)
	DeleteUser(w http.ResponseWriter,r *http.Request)
}

type UserController struct{
	UserService usecases.UserServiceInterface
}

func (c *UserController)Register(w http.ResponseWriter,r *http.Request){
	var user *models.User

	if err:= json.NewDecoder(r.Body).Decode(&user);err!=nil{
		http.Error(w,"Invalid JSON",http.StatusBadRequest)
		return
	}

	if err:=c.UserService.RegisterService(user);err!=nil{
		http.Error(w,"User is not created",http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func (c *UserController)GetAllUsers(w http.ResponseWriter,r *http.Request){
	users,err := c.UserService.GetAllUsers()

	if err!=nil{
		http.Error(w,"Cannot fetch users data",http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func (c *UserController)GetUserByID(w http.ResponseWriter,r *http.Request){

	id := chi.URLParam(r,"id")

	user,err := c.UserService.GetUserByID(id)

	if err!=nil{
		http.Error(w,"User not found",http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func (c *UserController)UpdateUser(w http.ResponseWriter,r *http.Request){
	var user *models.User

	id:= chi.URLParam(r,"id")

	if err := json.NewDecoder(r.Body).Decode(&user);err!=nil{
		http.Error(w,"Invalid JSON",http.StatusBadRequest)
	}

	user,err := c.UserService.UpdateUser(id,user)

	if err!=nil{
		http.Error(w,"Error updating user data",http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func (c *UserController)DeleteUser(w http.ResponseWriter,r *http.Request){
	id:= chi.URLParam(r,"id")

	if err := c.UserService.DeleteUser(id);err!=nil{
		http.Error(w,"Invalid Request",http.StatusBadRequest)
		return
	}
	
	response := packets.UserResponse{
		Message: "Deleted user account",
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func NewUserController(s usecases.UserServiceInterface)UserControllerInterface{
	return &UserController{UserService:s}
}