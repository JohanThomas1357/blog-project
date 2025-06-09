package usecases

import (
	"blog-server-using-clean-architecture/internal/entities"
	"blog-server-using-clean-architecture/internal/logger"
	"blog-server-using-clean-architecture/internal/packets"
	"blog-server-using-clean-architecture/repositories"
)

type PostServiceInterface interface {
	GetPostByIDService(string)(*models.Post,error)
	GetAllPostService()(packets.PostResponse,error)
	CreatePostService(*models.Post,uint)(*models.Post,error)
	DeletePostService(string)(packets.PostResponse,error)
	UpdatePostService(*models.Post,string)(*models.Post,error)
}

type PostService struct {
	PostRepo repositories.PostRepository
}

//GetPostByID,GetAllPosts,CreatePost,DeletePost,UpdatePost

func (s *PostService) GetPostByIDService(id string) (*models.Post, error) {
	return s.PostRepo.GetPostByID(id)
}

func (s *PostService) GetAllPostService() (response packets.PostResponse, err error) {

	zap := logger.GetLogger()

	posts, err := s.PostRepo.GetAllPost()

	if err != nil {
		zap.Warnf("Something went wrong")
		return response,err
	}

	count := len(posts)

	if count == 0 {
		message := "No posts found"
		response.Message = &message //by making it as point message option will not come in response if it is empty
		return
	}
	
	response.Posts = posts //here slice is always a reference type
	return
}

func (s *PostService) CreatePostService(post *models.Post, id uint) (*models.Post, error) {
	post.UserID = id
	return s.PostRepo.CreatePost(post)
}


func (s *PostService) DeletePostService(id string)(response packets.PostResponse,err error){
	if err = s.PostRepo.DeletePost(id);err!=nil{
		return
	}
	message := "Deleted Successfully"
	response.Message = &message
	return 
}


func (s *PostService) UpdatePostService(post *models.Post, id string) (*models.Post, error) {
	return s.PostRepo.UpdatePost(post, id)
}


func NewPostService(repo repositories.PostRepository) PostServiceInterface{
	return &PostService{PostRepo:repo}
}