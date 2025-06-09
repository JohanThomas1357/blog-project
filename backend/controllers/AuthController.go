package controllers

import (
	"blog-server-using-clean-architecture/usecases"
	"encoding/json"
	"blog-server-using-clean-architecture/internal/logger"
	"blog-server-using-clean-architecture/internal/packets"
	"net/http"
)

type AuthControllerInterface interface {
	Login(w http.ResponseWriter, r *http.Request)
}

type AuthController struct{
	AuthService usecases.UserServiceInterface
}

func (c *AuthController)Login(w http.ResponseWriter,r *http.Request){

	zap:= logger.GetLogger()
	var credential packets.AuthRequest

	if err:=json.NewDecoder(r.Body).Decode(&credential);err!=nil{
		// zap.Debugf("Invalid JSON")
		http.Error(w,"Invalid JSON",http.StatusBadRequest)
		return
	}

	// zap.Debugf("Successfully Done")
	response,err := c.AuthService.UserAuthCheck(credential.Email,credential.Password)

	if err!=nil{
		zap.Warnf("Something went wrong")
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Authorization","Bearer "+response.Token)
	w.Header().Set("Access-Control-Expose-Headers","Authorization")

	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response.User)
}

func NewAuthController(s usecases.UserServiceInterface)AuthControllerInterface{
	return &AuthController{AuthService: s}
}