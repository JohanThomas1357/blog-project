package packets

import models "blog-server-using-clean-architecture/internal/entities"

type AuthRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthResponse struct {
	User  *models.User `json:"user"`
	Token string `json:"token"`
}