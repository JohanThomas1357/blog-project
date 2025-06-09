package packets

import models "blog-server-using-clean-architecture/internal/entities"

type PostResponse struct {
	Message *string `json:"message"`
	Posts   []*models.Post `json:"posts,omitempty"`
}

type UserResponse struct {
	Message string `json:"message"`
}